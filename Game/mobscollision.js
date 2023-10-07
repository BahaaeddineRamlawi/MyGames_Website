export class MobsCollision{
    constructor(game, x, y){
        this.game = game;
        this.image = boom;
        this.spritewidth = 100;
        this.spriteheight = 90;
        this.sizemod = Math.random() + 0.5;
        this.width = this.spritewidth * this.sizemod;
        this.height = this.spriteheight * this.sizemod;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;
        this.frameX = 0;
        this.maxframe = 4;
        this.markedforcollision = false;
        this.fps = 15;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
    }
    draw(context){
        context.drawImage(this.image,this.frameX * this.spritewidth, 0, this.spritewidth, this.spriteheight, this.x, this.y, this.width, this.height);
    }
    update(deltaTime){
        this.x -= this.game.speed;
        if(this.frameTimer > this.frameInterval){
            this.frameX++;
            this.frameTimer = 0;
        } else{
            this.frameTimer +=deltaTime;
        }

        if(this.frameX > this.maxframe) this.markedforcollision = true;
    }
}