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
        this.bg_english = assets.getMenuAsset('startMenu_english');
        this.bg_irish   = assets.getMenuAsset('startMenu_irish');

        this.easyButton = new Button(assets);
        this.hardButton = new Button(assets);

        this.inEnglish  = new Button(assets);
        this.inIrish    = new Button(assets);

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
        if(!this.languageSelected){
            this.inEnglish.update(command, mousePos);
            this.inIrish.update(command, mousePos);
        } else {
            this.easyButton.update(command, mousePos);
            this.hardButton.update(command, mousePos);
        }
    }

    draw(ctx)
    {
        switch(this.language)
        {
            case Language.NONE:
            case Language.ENGLISH:
                ctx.drawImage(this.bg_english, 0, 0, ctx.canvas.width, ctx.canvas.height);
            break;
            case Language.IRISH:
                ctx.drawImage(this.bg_irish, 0, 0, ctx.canvas.width, ctx.canvas.height);
            break;
        }

        if(this.languageSelected){
            if(this.easyButton)
            {
                this.easyButton.draw(ctx);
            }
            if(this.hardButton)
            {
                this.hardButton.draw(ctx);
            }
        } else {
            if(this.inEnglish)
            {
                this.inEnglish.draw(ctx);
            }
            if(this.inIrish)
            {
                this.inIrish.draw(ctx);
            }
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
