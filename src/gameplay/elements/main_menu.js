import { Language } from '../../enums/language.js'
import { Button } from './button.js'

export class MainMenu{
    constructor(){
        this.scale = 1.0;
        this.bg = null;

        this.easyButton = null;
        this.hardButton = null;
        this.inEnglish = null;
        this.inIrish = null;

        this.languageSelected = false;
        this.language = Language.NONE;
    }

    changeScale(scale){
        this.scale = scale;

        if(this.easyButton){this.easyButton.changeScale(this.scale);}
        if(this.hardButton){this.hardButton.changeScale(this.scale);}
        if(this.inEnglish){this.inEnglish.changeScale(this.scale);}
        if(this.inIrish){this.inIrish.changeScale(this.scale);}
    }

    init(assets){
        this.bg = assets.getAsset('startMenu');

        this.easyButton = new Button();
        this.hardButton = new Button();

        this.inEnglish = new Button();
        this.inIrish = new Button();

        // Shape
        let SIZE = {x:435, y: 120};
        let POS = {x:1220, y:380};
        let RADIUS = 15;
        let LINEWIDTH = 2;
        let FONTSIZE = 40;
        let TEXT = "Regular";

        // Colors
        let DEF = {infill: '#f3b255', outline: '#f3b255'};
        let HOVER = {infill: '#d3a25e', outline: '#d3a25e'};
        let PRESS = {infill: '#f3b255', outline: '#f3b255'};
        let FONT = 'black';

        this.easyButton.setShape(SIZE, POS, RADIUS, LINEWIDTH, FONTSIZE, TEXT);
        this.easyButton.setColors(DEF, HOVER, PRESS, FONT);

        POS = {x:1220, y:530};
        TEXT = "Challenge";

        this.hardButton.setShape(SIZE, POS, RADIUS, LINEWIDTH, FONTSIZE, TEXT);
        this.hardButton.setColors(DEF, HOVER, PRESS, FONT);


        POS = {x:1220, y:380};
        TEXT = "English";
        this.inEnglish.setShape(SIZE, POS, RADIUS, LINEWIDTH, FONTSIZE, TEXT);
        this.inEnglish.setColors(DEF, HOVER, PRESS, FONT);

        POS = {x:1220, y:530};
        TEXT = "as Gaeilge";
        this.inIrish.setShape(SIZE, POS, RADIUS, LINEWIDTH, FONTSIZE, TEXT);
        this.inIrish.setColors(DEF, HOVER, PRESS, FONT);

    }

    update(command, mousePos){
        if(this.languageSelected){
            this.easyButton.update(command, mousePos);
            this.hardButton.update(command, mousePos);
        } else {
            this.inEnglish.update(command, mousePos);
            this.inIrish.update(command, mousePos);
        }
    }

    draw(ctx){
        ctx.drawImage(this.bg, 0, 0, ctx.canvas.width, ctx.canvas.height);
        if(this.languageSelected){
            this.easyButton.draw(ctx);
            this.hardButton.draw(ctx);
        } else {
            this.inEnglish.draw(ctx);
            this.inIrish.draw(ctx);
        }
    }

    setLanguage(language){
        if(language != this.language && language != Language.NONE){
            this.language = language;
            switch (this.language){
                case Language.ENGLISH: 
                    this.easyButton.text = "Regular";
                    this.hardButton.text = "Challenge";
                    break;
                case Language.IRISH: 
                    this.easyButton.text = "Rialta";
                    this.hardButton.text = "Dúshlán";
                    break;
            }
            console.log("Language Selected");
            this.languageSelected = true;
        }
    }
}