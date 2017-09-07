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
    }

    getUpdateTime() {
        return this.updateTime;
    }

    updateTimer() {
        this.currentTime += this.updateTime;
        let progress = (this.currentTime / this.totalTime) * 100;
        $('#progressBar').width(progress + "%");
        if(this.currentTime >= this.totalTime) {
            console.log("Timeout!");
        }
    }

    setupNextQuestion() {
        //Set up question
        let question = questionText[this.currentQuestion];
        let qNumber = this.currentQuestion + 1;
        $('#questionNumber').html(qNumber);
        $('#questionText').html(question.question);

        //Set up answers
        let baseText = "answer";
        for(let i=0; i<this.numAnswers; ++i) {
            $('#' + baseText + i).html(question.answers[i]);
        }
    }
}

$(document).ready( ()=> {
    let qManager = new QuestionManager();
    qManager.setupNextQuestion();
    setInterval( () => {
        qManager.updateTimer();
    }, qManager.getUpdateTime());
});