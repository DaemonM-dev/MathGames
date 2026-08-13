class Message{
    constructor(msg, pos, fontSize, font, color){
        this.msg = msg;
        this.font = font;
        this.color = color;
        this.pos = {...pos};
        this.fontSize = fontSize;
        this.cachedPos = {...pos};
        this.initialPos = {...pos};
        this.initialFontSize = fontSize;
    }

    updateScale(scale){
        this.fontSize = this.initialFontSize * Math.min(scale.x, scale.y);
        this.pos = {
            x: this.cachedPos.x * scale.x,
            y: this.cachedPos.y * scale.y
        };
    }

    draw(ctx){
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.font = `${this.fontSize}px ${this.font}`;  // This should now work
        ctx.fillText(this.msg, this.pos.x, this.pos.y)
    }
}

export class TextHandler{
    constructor(scale){
        this.messages = [];
        this.initMessages(scale);
    }

    updateMessageScale(scale){
        this.messages.forEach(msg => {msg.updateScale(scale)});
    }

    drawAllMessages(ctx){
        this.messages.forEach(msg => {msg.draw(ctx)});
    }

    addMsg(msg, pos, fontSize, font, color){
        this.messages.push(new Message(msg, pos, fontSize, font, color));
        console.log("Added message: ", this.messages[this.messages.length - 1]);
    }

    initMessages(scale){
        let scaledX = 1400 * scale.x;
        let scaledY = 75 * scale.y;
        let font = "Arial";
        let fontSize = 60 * Math.max(scale.x, scale.y);
        let pos = {x: scaledX, y: scaledY};
        this.addMsg("What will you buy?", pos, fontSize, font, "black");

        scaledX = 1580 * scale.x;
        scaledY = 190 * scale.y;
        font = "Times New Roman";
        fontSize = 40 * Math.max(scale.x, scale.y);
        pos = {x: scaledX, y: scaledY};
        this.addMsg("22.85", pos, fontSize, font, "black");
    }
}
