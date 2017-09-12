/**
 * Created by DrTone on 11/04/2017.
 */

let trot;
let soundManager;

class QuestionManager {
    constructor() {
        this.currentQuestion = 0;
        this.numAnswers = 3;
        this.numQuestions = 10;
        this.updateTime = 100;
        this.currentTime = 0;
        this.totalTime = 30 * 1000;
        this.questionWaitTime = 3 * 1000;
        this.timerRunning = true;
        this.timerMargin = this.updateTime * 5;
        this.readyWaitTime = 1.5 * 1000;
        this.restartWaitTime = 1.5 * 1000;
        this.correctAnswers = 0;
    }

    start() {
        this.setupNextQuestion();
        this.quizTimer = setInterval( () => {
            this.updateTimer();
        }, this.updateTime);
    }

    getUpdateTime() {
        return this.updateTime;
    }

    updateTimer() {
        if(!this.timerRunning) return;

        this.currentTime += this.updateTime;
        let progress = (this.currentTime / this.totalTime) * 100;
        $('#progressBar').width(progress + "%");
        if(this.currentTime > (this.totalTime + this.timerMargin)) {
            this.timeOut();
            this.stopGame();
        }
    }

    timeOut() {
        this.timerRunning = false;
        $('#timeOut').show();
    }

    clearTimer() {
        this.timerRunning = false;
        trot.stop();
        this.currentTime = 0;
        $('#progressBar').width("0%");
    }

    clearAnswers() {
        for(let i=0; i<this.numAnswers; ++i) {
            $('#answerCorrect' + i).hide();
            $('#answerWrong' + i).hide();
            $('#clickResponse' + i).attr("src", "images/holder.png");
        }
        $('#getReady').hide();
    }

    setupNextQuestion() {
        //Set up question
        let question = questionText[this.currentQuestion];
        let qNumber = this.currentQuestion + 1;
        $('#questionNumber').html(qNumber);
        $('#questionText').html(question.question);

        //Set up answers
        let baseText = "answerText";
        for(let i=0; i<this.numAnswers; ++i) {
            $('#' + baseText + i).html(question.answers[i]);
        }
    }

    nextQuestion() {
        ++this.currentQuestion;
        this.timerRunning = true;
        trot.play();
        this.clearAnswers();
        this.setupNextQuestion();
    }

    showCorrectResponse(answer) {
        let elem = $('#clickResponse' + answer);
        elem.attr("src", "images/greatGreenButton.png");
        elem.show();
        this.clearTimer();
        setTimeout( () => {
            this.nextQuestion();
        }, this.readyWaitTime);
    }

    getReady() {
        $('#getReady').show();
        setTimeout( () => {
            this.nextQuestion();
         }, this.questionWaitTime);
    }

    stopGame(answer) {
        if(answer !== undefined) {
            let elem = $('#clickResponse' + answer);
            elem.attr("src", "images/oopsRedButton.png");
            elem.show();
            this.clearTimer();
        }

        setTimeout( () => {
            this.displayAnswers();
        }, this.restartWaitTime);
    }

    displayAnswers() {
        $('#quiz').hide();
        $('#numAnswers').html(this.correctAnswers);
        let elem = $('#plural');
        elem.show();
        if(this.correctAnswers === 1) {
            elem.hide()
        }
        $('#summary').show();
    }

    checkAnswer(answerID) {
        //Get answer number
        let answer = answerID.match(/\d/g);
        answer = answer.join("");
        answer = parseInt(answer, 10);
        let correctAnswer = questionText[this.currentQuestion].answer;
        let correct = answer === correctAnswer;
        correct ? $('#answerCorrect' + answer).show() : $('#answerWrong' + answer).show();
        if(correct) {
            ++this.correctAnswers;
            if(this.correctAnswers === this.numQuestions) {
                this.endGame();
                return;
            }
            this.showCorrectResponse(answer);
            soundManager.playSound("horse-correct");
        } else {
            soundManager.playSound("horse-wrong");
            this.stopGame(answer);
        }
    }

    endGame() {
        trot.stop();
        $('#quiz').hide();
        $('#finished').show();
    }

    restart() {
        this.clearAnswers();
        clearInterval(this.quizTimer);
    }
}

$(document).ready( ()=> {
    let qManager = new QuestionManager();
    qManager.start();

    trot = new Howl(
        {
            src: ["./sounds/horseTrot.wav"],
            autoplay: true,
            loop: true
        }
    );

    soundManager = new SoundManager();
    soundManager.loadSounds(["horse-correct", "horse-wrong"]);

    $('[id^="clickAnswer"]').on("click", function() {
        qManager.checkAnswer(this.id);
    });

    $('#tryAgain').on("click", () => {
        qManager.restart();
        window.location.href = "quiz.html";
    });
});