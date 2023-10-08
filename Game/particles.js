class Particle {
  constructor(game) {
    this.game = game;
    this.marked = false;
  }
  update() {
    this.x -= this.speedX + this.game.speed;
    this.y -= this.speedY;
    this.size *= this.mult;
    if (this.size < this.minsize) this.marked = true;
  }
}

class ReverseParticle {
  constructor(game) {
    this.game = game;
    this.marked = false;
  }
  update() {
    this.x += this.speedX + this.game.speed;
    this.y += this.speedY + this.game.speed;
    this.size *= 1.2;
    if (this.size > this.maxsize) this.game.particles = [];
  }
}

export class Dust extends Particle {
  constructor(game, x, y) {
    super(game);
    this.minsize = 0.5;
    this.mult = 0.95;
    this.size = Math.random() * 10 + 10;
    this.x = x;
    this.y = y;
    this.speedX = Math.random();
    this.speedY = Math.random();
    this.color = "rgba(0,0,0,0.2)";
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  }
}

export class CrushDust extends Particle {
  constructor(game, x, y) {
    super(game);
    this.minsize = 10;
    this.mult = 0.99;
    this.size = Math.random() * 10 + 20;
    this.x = x;
    this.y = y;
    this.speedX = Math.random();
    this.speedY = Math.random();
    this.color = "rgba(45,50,80,0.4)";
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.arc(this.x - 10, this.y + 1, this.size, 0, Math.PI * 2);
    context.arc(this.x + 10, this.y + 1, this.size, 0, Math.PI * 2);
    context.arc(this.x - 25, this.y + 1, this.size, 0, Math.PI * 2);
    context.arc(this.x + 25, this.y + 1, this.size, 0, Math.PI * 2);
    context.arc(this.x - 35, this.y - 5, this.size, 0, Math.PI * 2);
    context.arc(this.x + 35, this.y - 5, this.size, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  }
}

export class Rings extends ReverseParticle {
  constructor(game, x, y) {
    super(game);
    this.size = 10;
    this.speedX = 10;
    this.speedY = 0;
    this.x = x - this.speedX - this.size;
    this.y = y + 5;
    this.maxsize = 30;
    this.bordercolor = "red";
    this.color = "rgba(255,0,0,0.2)";
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.size, -Math.PI / 4, Math.PI / 4);
    context.strokeStyle = this.bordercolor;
    context.fillStyle = this.color;
    context.fill();
    context.stroke();
  }
}

export class FlyingRings extends ReverseParticle {
  constructor(game, x, y) {
    super(game);
    this.size = 30;
    this.speedX = 10;
    this.speedY = 5;
    this.x = x - this.speedX - this.size;
    this.y = y + 30;
    this.maxsize = 100;
    this.bordercolor = "red";
    this.color = "rgba(255,0,0,0.2)";
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.size, -Math.PI / 3, Math.PI / 3);
    context.strokeStyle = this.bordercolor;
    context.fillStyle = this.color;
    context.fill();
    context.stroke();
  }
}
