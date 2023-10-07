import { Player } from './player.js';
import { InputMove } from './input.js';
import { Background } from './background.js';
import { FlyingMob, GroundMob } from './mobs.js';
import { Txt } from './txt.js';
import { Hearts } from './hearts.js';


window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 500;
    let differencetime = 0;

    class Game{
        constructor(width,height){
            this.width = width;
            this.height = height;
            this.speed = 0;
            this.score = 0;
            this.groundspace = 27;
            this.backgroundspeed = 1.5;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputMove(this);
            this.Txt = new Txt(this);
            this.enemies = [];
            this.particles = [];
            this.collisions = [];
            this.hearts = [new Hearts(this,0), new Hearts(this,25), new Hearts(this,50), new Hearts(this,75), new Hearts(this,100)]
            this.enemyTimer = 0;
            this.enemyInterval = 1000 + Math.random() * 750;
            this.hitbox = false;
            this.maxParticles = 50;
            this.time = 0;
            this.differencetime = differencetime;
            this.numhearts = 5;
            this.gameOver = false;
            this.player.currentstate = this.player.states[0];
            this.player.currentstate.in();
        }
        update(deltaTime){
            if(this.gameOver){
                this.player.makeallcollision();
                this.enemies.forEach( mob => {
                    this.enemies.splice(this.enemies.indexOf(mob),1);
                });
            }else{
                this.time += deltaTime;
                this.differencetime = differencetime;
                this.background.update();
                this.player.update(this.input.keys, deltaTime);
                if(this.enemyTimer > this.enemyInterval){
                    this.addMobs();
                    this.enemyTimer = 0;
                } else{
                    this.enemyTimer +=deltaTime;
                }
                this.enemies.forEach( mob => {
                    mob.update(deltaTime);
                    if(mob.marked) this.enemies.splice(this.enemies.indexOf(mob),1);
                });
                this.particles.forEach( (particle, index) => {
                    particle.update();
                    if(particle.marked) this.particles.splice(index, 1);
                });
                if (this.particles.length > this.maxParticles){
                    this.particles.length = this.maxParticles;
                };
                this.collisions.forEach((collision, index) => {
                    collision.update(deltaTime);
                    if(collision.markedforcollision) this.collisions.splice(index, 1);
                });
                this.hearts.forEach((heart, index) =>{
                    heart.update();
                    if(heart.markedheart) this.hearts.splice(index, 1);
                });
            }
        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach( mob => {
                mob.draw(context);
            });
            this.particles.forEach( particle => {
                particle.draw(context);
            });
            this.collisions.forEach( collision => {
                collision.draw(context);
            });

            this.hearts.forEach(heart =>{
                heart.draw(context);
            });
            this.Txt.draw(context);
        }
        addMobs(){
            if(Math.random() >= 0.50) this.enemies.push(new GroundMob(this));
            this.enemies.push(new FlyingMob(this));
        }
    }
    
    const game = new Game(canvas.width,canvas.height);

    function startGame() {
        canvas.removeEventListener('click', startGame);
        this.time = 0;
        animate(0);
      }

    let lastTime = 0;
    let truevalue = false;

    function animate(timeStamp){
        if(timeStamp > 0 && !truevalue){
            differencetime = timeStamp;
            truevalue = true;
        }
        const deltaTime = timeStamp - lastTime ;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime)
        game.draw(ctx);
        if(!game.gameOver)requestAnimationFrame(animate);
    }

    ctx.drawImage(canvasbackground, 0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#fff';
    ctx.textAlign = "center"
    ctx.font = '26px Arial'
    ctx.fillText('Click to Start', canvas.width/2, canvas.height / 2);
    ctx.font = '20px Arial'
    ctx.fillText('Use the arrow keys to move', canvas.width/2, (canvas.height / 2) + 50);
    canvas.addEventListener('click', startGame);
});