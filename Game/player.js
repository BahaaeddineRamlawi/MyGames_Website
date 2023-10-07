import { Standing, Moving, Jumping, Falling, Running, MovingBack, Punching, Upunching, Hit, Crushing, Dying } from "./state.js";
import { MobsCollision } from "./mobscollision.js";

export class Player {
    constructor(game){
        this.game = game;
        this.width = 1500;
        this.height = 1001;
        this.truewidth = 134.86;
        this.trueheight = 90;
        this.x = 0;
        this.y = this.game.height - this.trueheight - this.game.groundspace;
        this.image = pic_1;
        this.originalspeed = 2;
        this.speed = this.originalspeed;
        this.vertspeed = 0;
        this.counter = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.hovering = false;
        this.crush = false;
        this.originalmaxjump = 25;
        this.maxjump = this.originalmaxjump;
        this.xbefore = 0;
        this.xafter = 0;
        this.ybefore = 0;
        this.yafter = 0;
        this.dead = false;
        this.states = [new Standing(this.game), new Moving(this.game),
            new Jumping(this.game), new Falling(this.game), new Running(this.game),
            new MovingBack(this.game), new Punching(this.game), new Upunching(this.game),
            new Hit(this.game), new Crushing(this.game), new Dying(this.game)];
    }
    update(input, deltaTime){
        this.checkCollision();
        this.currentstate.HandleInput(input);
        this.x += 0;
        if (input.includes('ArrowRight') || input.includes('d')) this.x += this.speed;
        else if (input.includes('ArrowLeft') || input.includes('a')) this.x -= this.speed;
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.truewidth) this.x = this.game.width - this.truewidth;
        this.y +=  this.vertspeed/2;
        if (!this.checkonGround()){
            if(this.hovering) this.vertspeed += 0.25;
            else if(this.crush) this.vertspeed += 3;
            else this.vertspeed += 0.5;
        } else {
            this.hovering = false;
            this.crush = false;
            this.vertspeed = 0;
            this.y = this.game.height - this.trueheight - this.game.groundspace;
        }
        if(this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if(this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else{
            this.frameTimer +=deltaTime;
        }
    }
    draw(context){
        context.strokeStyle = 'black';
        if(this.game.hitbox) context.strokeRect(this.x + this.xbefore, this.y + this.ybefore, this.truewidth - this.xafter, this.trueheight - this.yafter)
        context.drawImage(this.image, this.frameX * this.width, this.frameY, this.width, this.height, this.x, this.y,
             this.truewidth, this.trueheight);
    }
    checkonGround(){
        return this.y >= this.game.height - this.trueheight - this.game.groundspace;
    }

    setState(state,speed){
        this.currentstate = this.states[state];
        this.game.speed = this.game.backgroundspeed * speed;
        this.currentstate.in();
    }
    checkCollision(){
        this.game.enemies.forEach(mob => {
            if(mob.x < this.x + this.truewidth - (this.xafter - this.xbefore)  &&
                mob.x + mob.truewidth > this.x + (this.xbefore) &&
                mob.y < this.y + this.trueheight - (this.yafter - this.ybefore) &&
                mob.y + mob.trueheight > this.y + (this.ybefore)){
                    mob.marked = true;
                    this.game.collisions.push(new MobsCollision(this.game, mob.x + mob.truewidth * 0.5, mob.y + mob.trueheight * 0.5));
                    if(this.currentstate.state == 'CRUSHING' && mob.getType() == 'GroundMob1') this.game.score+=4;
                    else if(this.currentstate.state == 'CRUSHING' && mob.getType() == 'GroundMob2') this.game.score+=5;
                    else if(this.currentstate.state == 'PUNCHING' && mob.getType() == 'GroundMob1') this.game.score+=2;
                    else if(this.currentstate.state == 'PUNCHING' && mob.getType() == 'GroundMob2') this.game.score+=3;
                    else if(this.currentstate.state == 'UPUNCHING' && mob.getType() == 'FlyingMob') this.game.score++;
                    else if(this.currentstate.state == 'UPUNCHING' && mob.getType() == 'GroundMob1');
                    else if(this.currentstate.state == 'UPUNCHING' && mob.getType() == 'GroundMob2');
                    else{
                        if(!(this.currentstate.state == 'HIT')){
                            this.game.hearts[this.game.hearts.length -1].markedheart = true;
                            this.game.numhearts--;
                            if(this.game.numhearts == 0) this.dead = true;
                        }
                        this.setState(8,0);
                    }
            }
        });
    }
    makeallcollision(){
        this.game.enemies.forEach(mob => {
            this.game.collisions.push(new MobsCollision(this, mob.x + mob.truewidth * 0.5, mob.y + mob.trueheight * 0.5));
        });
    }
}