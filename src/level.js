import { InputType, Maths, Speaker } from './constants.js';

class Question{
    constructor(number, speaker, question, answer){
        this.number = number;
        this.question = question;
        this.answer = answer;
    }
}

export class Level{
    constructor(levelNum, maths, inputType){
        this.level = levelNum;
        this.maths = maths;
        this.inputType = InputType.KEYBOARD;

        this.wrongMSG = 'Try again!';
        this.rightMSG = 'You got it!';

        this.MAX_QUESTIONS = 5;
        this.questions = [];

        this.activeSpeaker = Speaker.GIRL;
        this.activeMessageIndex = 0;
    }

    addQuestion(numberID, speaker, question, answer){
        if(this.questions.length < this.MAX_QUESTIONS){
            this.questions.push(numberID, speaker, question, answer);
        }
    }

    getQuestions(){
        return this.questions;
    }

    getActiveSpeaker(){
        return this.activeSpeaker;
    }

    update(deltaTime){
        switch(this.inputType){
            case InputType.KEYBOARD:
            break;
            case InputType.DRAG_DROP:
            break;
        }
    }
}