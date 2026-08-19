import { Maths } from '../constants.js'

class Question{
    constructor(numberID, speaker, question, answer){
        this.numberID = numberID;
        this.speaker = speaker;
        this.question = question;
        this.answer = answer;
    }
}

export class Level{
    constructor(levelNum, maths, inputType){
        this.level = levelNum;
        this.maths = maths;
        this.inputType = inputType;

        this.MAX_QUESTIONS = 5;

        this.wrongMSG = 'Try again!';
        this.rightMSG = 'You got it!';

        this.questions = [];
    }

    addQuestion(numberID, speaker, question, answer){
        if(this.questions.length < this.MAX_QUESTIONS){
            this.questions.push(numberID, speaker, question, answer);
        }
    }

    getQuestions(){
        return this.questions;
    }
}