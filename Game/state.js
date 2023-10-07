import { Dust, Rings, FlyingRings, CrushDust } from "./particles.js";

const states = {
    Standing: 0, 
    Moving: 1,
    Jumping: 2,
    Falling: 3,
    Running: 4,
    MovingBack: 5,
    Punching: 6,
    Upunching: 7,
    Hit: 8,
    Crushing: 9,
    Dying: 10,
}

class State {
    constructor(state,game){
        this.state = state;
        this.game = game;
        this.finaltime;
    }
}

export class Standing extends State {
    constructor(game){
        super('STANDING', game);
    }
    in(){
        this.game.player.xbefore = 20;
        this.game.player.xafter = 40;
        this.game.player.ybefore = 20;
        this.game.player.yafter = 20;
        this.game.player.maxjump = this.game.player.originalmaxjump;
        this.game.player.speed = this.game.player.originalspeed;
        this.game.player.fps = 20;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 20;
        this.game.player.image = pic_1;
    }
    HandleInput(input){
        if (input.includes('ArrowRight') || input.includes('d')){
            this.game.player.setState(states.Moving,1);
        } else if(input.includes('ArrowUp') || input.includes('w')){
            this.game.player.setState(states.Jumping,1);
        } else if(input.includes('ArrowLeft') || input.includes('a')){
            this.game.player.setState(states.MovingBack,0.2);
        } else if(input.includes('Enter')){
            this.game.player.setState(states.Punching,0.1);
        } else if((input.includes('ArrowRight') || input.includes('d')) && input.includes(' ')){
            this.game.player.setState(states.Running,2);
        }
    }
}

export class Moving extends State {
    constructor(game){
        super('MOVING',game);
    }
    in(){
        this.game.player.xbefore = 20;
        this.game.player.xafter = 50;
        this.game.player.ybefore = 20;
        this.game.player.yafter = 20;
        this.game.player.maxjump = this.game.player.originalmaxjump;
        this.game.player.speed = this.game.player.originalspeed;
        this.game.player.fps = 20;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 12;
        this.game.player.image = pic_3;

    }
    HandleInput(input){
        if(input.includes('ArrowUp') || input.includes('w')){
            this.game.player.setState(states.Jumping,1);
        } else if(!(input.includes('ArrowDown') || input.includes('s') ||
        input.includes('ArrowUp') || input.includes('w') || 
        input.includes('ArrowLeft') || input.includes('a') || 
        input.includes('ArrowRight') || input.includes('d'))){
            this.game.player.setState(states.Standing,0);
        } else if((input.includes('ArrowLeft') || input.includes('a')) && !(input.includes('ArrowRight') || input.includes('d'))){
            this.game.player.setState(states.MovingBack,0.2);
        } else if(input.includes(' ')){
            this.game.player.setState(states.Running,2);
        } else if(input.includes('Enter')){
            this.game.player.setState(states.Punching,0.1);
        }
    }
}

export class Jumping extends State {
    constructor(game){
        super('JUMPING',game);
    }
    in(){
        this.game.player.xbefore = 30;
        this.game.player.xafter = 60;
        this.game.player.ybefore = 0;
        this.game.player.yafter = 10;
        this.game.player.speed = this.game.player.originalspeed;
        this.game.player.fps = 20;
        if(this.game.player.checkonGround()) this.game.player.vertspeed -=this.game.player.maxjump;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 10;
        this.game.player.image = pic_4;   
    }
    HandleInput(input){
        if(this.game.player.vertspeed >= 2){
            this.game.player.setState(states.Falling,1.25);
        } else if(input.includes('Enter')){
            this.game.player.setState(states.Upunching,0.1);
        } else if(input.includes('ArrowDown') || input.includes('s')){
            this.game.player.setState(states.Crushing,0.2);
        } 
    }
}

export class Falling extends State {
    constructor(game){
        super('FALLING',game);
    }
    in(){
        this.game.player.xbefore = 30;
        this.game.player.xafter = 60;
        this.game.player.ybefore = 0;
        this.game.player.yafter = 10;
        this.game.player.speed = this.game.player.originalspeed;
        this.game.player.fps = 20;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 10;
        this.game.player.image = pic_5;
    }
    HandleInput(input){
        if(this.game.player.checkonGround()){
            this.game.player.setState(states.Standing,0);
        } else if(input.includes('ArrowDown') || input.includes('s')){
            this.game.player.setState(states.Crushing,0.2);
        } 
    }
}

export class Running extends State {
    constructor(game){
        super('RUNNING',game);
    }
    in(){
        this.game.player.xbefore = 20;
        this.game.player.xafter = 50;
        this.game.player.ybefore = 20;
        this.game.player.yafter = 20;
        this.game.player.maxjump = 27;
        this.game.player.speed = this.game.player.originalspeed + 2;
        this.game.player.fps = 30;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 10;
        this.game.player.image = pic_3;
    }
    HandleInput(input){
        this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.truewidth * 0.6, this.game.player.y + this.game.player.trueheight))
        if(input.includes('ArrowUp') || input.includes('w')){
            this.game.player.setState(states.Jumping,1.5);
        } else if(!(input.includes('ArrowDown') || input.includes('s') ||
        input.includes('ArrowUp') || input.includes('w') || 
        input.includes('ArrowLeft') || input.includes('a') || 
        input.includes('ArrowRight') || input.includes('d'))){
            this.game.player.setState(states.Standing,0);
        } else if(!(input.includes(' '))){
            this.game.player.setState(states.Moving,1);
        } else if(input.includes('Enter')){
            this.game.player.setState(states.Punching,0.1);
        } else if((input.includes('ArrowUp') || input.includes('w')) && (input.includes('Enter'))){
            this.game.player.setState(states.Upunching,1);
        }
    }
}

export class MovingBack extends State {
    constructor(game){
        super('MOVINGBACK',game);
    }
    in(){
        this.game.player.xbefore = 25;
        this.game.player.xafter = 50;
        this.game.player.ybefore = 20;
        this.game.player.yafter = 20;
        this.game.player.maxjump = 23;
        this.game.player.speed = this.game.player.originalspeed;
        this.game.player.fps = 18;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 12;
        this.game.player.image = pic_3;

    }
    HandleInput(input){
        if(input.includes('ArrowUp') || input.includes('w')){
            this.game.player.setState(states.Jumping,0.7);
        } else if(!(input.includes('ArrowDown') || input.includes('s') ||
        input.includes('ArrowUp') || input.includes('w') || 
        input.includes('ArrowLeft') || input.includes('a') || 
        input.includes('ArrowRight') || input.includes('d'))){
            this.game.player.setState(states.Standing,0);
        } else if((input.includes('ArrowRight') || input.includes('d')) && !(input.includes('ArrowLeft') || input.includes('a'))){
            this.game.player.setState(states.Moving,1);
        } else if((input.includes('ArrowDown') || input.includes('s')) && !(input.includes('ArrowRight') || input.includes('d') || 
            input.includes('ArrowLeft') || input.includes('a'))){
            this.game.player.setState(states.Standing,0);
        } else if(input.includes('Enter')){
            this.game.player.setState(states.Punching,0.1);
        }
    }
}


export class Punching extends State {
    constructor(game){
        super('PUNCHING',game);
    }
    in(){
        this.counter = 0;
        this.game.player.xbefore = 20;
        this.game.player.xafter = 25;
        this.game.player.ybefore = 20;
        this.game.player.yafter = 20;
        this.game.player.maxjump = this.game.player.originalmaxjump;
        this.game.player.speed = this.game.player.originalspeed;
        this.game.player.fps = 40;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 20;
        this.game.player.image = pic_11;
    }
    HandleInput(input){
        this.counter++;
        this.game.player.xbefore = 20;
        this.game.player.xafter = 25;
        if(this.counter >= 30 && this.counter <= 85){
            this.game.particles.unshift(new Rings(this.game, this.game.player.x + this.game.player.truewidth - (this.game.player.xafter - this.game.player.xbefore), this.game.player.y + this.game.player.trueheight * 0.5))
            this.game.player.xbefore = 20;
            this.game.player.xafter = -50;
        } else if(this.counter == 98) this.counter = 0;
        if(!(input.includes('ArrowDown') || input.includes('s') ||
        input.includes('ArrowUp') || input.includes('w') || 
        input.includes('ArrowLeft') || input.includes('a') || 
        input.includes('ArrowRight') || input.includes('d') ||
        input.includes('Enter'))){
            this.game.player.setState(states.Standing,0);
        } else if(input.includes('ArrowUp') || input.includes('w')){
            this.game.player.setState(states.Jumping,1);
        } else if((input.includes('ArrowRight') || input.includes('d')) && !(input.includes('Enter'))){
            this.game.player.setState(states.Moving,1);
        } else if((input.includes('ArrowLeft') || input.includes('a')) && !(input.includes('Enter'))){
            this.game.player.setState(states.MovingBack,1);
        }
    }
}

export class Upunching extends State {
    constructor(game){
        super('UPUNCHING',game);
    }
    in(){
        this.counter = 0;
        this.game.player.xbefore = 20;
        this.game.player.xafter = 25;
        this.game.player.ybefore = 20;
        this.game.player.yafter = 20;
        this.game.player.maxjump = this.game.player.originalmaxjump;
        this.game.player.speed = this.game.player.originalspeed;
        this.game.player.fps = 40;
        if(this.game.player.checkonGround()) this.game.player.vertspeed -=this.game.player.maxjump;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 15;
        this.game.player.image = pic_10;
    }
    HandleInput(input){
        this.counter++;
        this.game.player.xbefore = 20;
        this.game.player.xafter = 25;
        this.game.player.ybefore = 20;
        this.game.player.yafter = 20;
        if(this.counter >= 30 && this.counter <= 85){
            this.game.particles.unshift(new FlyingRings(this.game, this.game.player.x + this.game.player.truewidth - (this.game.player.xafter - this.game.player.xbefore), this.game.player.y + this.game.player.trueheight * 0.5))
            this.game.player.xbefore = 20;
            this.game.player.xafter = -70;
            this.game.player.ybefore = 10;
            this.game.player.yafter = 0;
        } else if(this.counter == 98) this.counter = 0;
        if(this.game.player.vertspeed >= 2){
            this.game.player.hovering = true;
        } else if(this.game.player.checkonGround()){
            this.game.player.setState(states.Standing,0);
        } else if(!(input.includes('ArrowDown') || input.includes('s') ||
        input.includes('ArrowUp') || input.includes('w') || 
        input.includes('ArrowLeft') || input.includes('a') || 
        input.includes('ArrowRight') || input.includes('d') ||
        input.includes('Enter'))){
            this.game.player.setState(states.Standing,0);
        } else if(!(input.includes('Enter'))){
            this.game.player.setState(states.Falling,1);
        }
    }
}

export class Hit extends State {
    constructor(game){
        super('HIT',game);
    }
    in(){
        this.game.player.xbefore = 20;
        this.game.player.xafter = 50;
        this.game.player.ybefore = 20;
        this.game.player.yafter = 20;
        this.game.player.maxjump = this.game.player.originalmaxjump;
        this.game.player.speed = 0;
        this.game.player.fps = 20;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 20;
        this.game.player.image = pic_7;
    }
    HandleInput(input){
        if(this.game.player.dead) this.game.player.setState(states.Dying,0);
        if(this.game.player.frameX >= 20 && this.game.player.checkonGround()){
            this.game.player.setState(states.Moving,1);
        } else if(this.game.player.frameX >= 20 && !this.game.player.checkonGround()){
            this.game.player.setState(states.Falling,1);
        }
    }
}

export class Crushing extends State {
    constructor(game){
        super('CRUSHING',game);
    }
    in(){
        this.game.player.crush = true;
        this.game.player.xbefore = 30;
        this.game.player.xafter = 60;
        this.game.player.ybefore = 0;
        this.game.player.yafter = 10;
        this.game.player.speed = this.game.player.originalspeed;
        this.game.player.fps = 30;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 10;
        this.game.player.image = pic_5;
    }
    HandleInput(input){
        if(this.game.player.checkonGround()){
            for(let i = 0;i < 5; ++i){
                this.game.player.xbefore = -10;
                this.game.player.xafter = -20;
                this.game.particles.unshift(new CrushDust(this.game, this.game.player.x + this.game.player.truewidth * 0.5, this.game.player.y + this.game.player.trueheight));
            }
            this.game.player.setState(states.Standing,0);
        }
    }
}

export class Dying extends State {
    constructor(game){
        super('DYING',game);
    }
    in(){
        this.finaltime = this.game.time;
        this.xbefore = 0;
        this.xafter = 0;
        this.ybefore = 0;
        this.yafter = 0;
        this.game.player.speed = 0;
        this.game.player.fps = 15;
        this.game.player.frameX = 0;
        this.game.player.maxFrame = 18;
        this.game.player.image = pic_8;
    }
    HandleInput(input){
        this.game.enemies.forEach( mob => {
            this.game.enemies.splice(this.game.enemies.indexOf(mob),1);
        });
        this.game.time = this.finaltime;
        if(this.game.player.frameX == 10 && this.game.player.image == pic_8){
            this.game.player.image = pic_6_1;
            this.game.player.frameX = 0;
        }
        if(this.game.player.frameX == 17 && this.game.player.image == pic_6_1){
            this.game.player.image = pic_6_2;
            this.game.player.frameX = 0;
        }
        if(this.game.player.frameX == 12 && this.game.player.image == pic_6_2){
            this.game.gameOver = true;
        }
    }
}