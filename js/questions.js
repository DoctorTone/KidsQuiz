/**
 * Created by DrTone on 11/04/2017.
 */

class QuestionManager {
    constructor() {
        this.currentQuestion = 0;
        this.numAnswers = 3;
        this.updateTime = 100;
        this.currentTime = 0;
        this.totalTime = 30 * 1000;
        this.questionWaitTime = 3 * 1000;
        this.timerRunning = true;
    }

    getUpdateTime() {
        return this.updateTime;
    }

    updateTimer() {
        if(!this.timerRunning) return;

        this.currentTime += this.updateTime;
        let progress = (this.currentTime / this.totalTime) * 100;
        $('#progressBar').width(progress + "%");
        if(this.currentTime >= this.totalTime) {
            console.log("Timeout!");
        }
    }

    clearTimer() {
        this.timerRunning = false;
        this.currentTime = 0;
        $('#progressBar').width("0%");
    }

    clearAnswers() {
        for(let i=0; i<this.numAnswers; ++i) {
            $('#answerCorrect' + i).hide();
            $('#answerWrong' + i).hide();
            $('#clickResponse' + i).hide();
        }
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
        }, this.questionWaitTime);
    }

    stopGame(answer) {
        let elem = $('#clickResponse' + answer);
        elem.attr("src", "images/oopsRedButton.png");
        elem.show();
        this.clearTimer();
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
            this.showCorrectResponse(answer);
        } else {
            this.stopGame(answer);
        }
    }
}

$(document).ready( ()=> {
    let qManager = new QuestionManager();
    qManager.setupNextQuestion();
    setInterval( () => {
        qManager.updateTimer();
    }, qManager.getUpdateTime());

    $('[id^="clickAnswer"]').on("click", function() {
        qManager.checkAnswer(this.id);
    });
});