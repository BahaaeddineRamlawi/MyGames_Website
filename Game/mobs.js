export class Mob {
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.marked = false;
  }
  update(deltaTime) {
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    if (this.x + this.truewidth < 0) this.marked = true;
  }
  draw(context) {
    context.strokeStyle = "black";
    if (this.game.hitbox)
      context.strokeRect(this.x, this.y, this.truewidth, this.trueheight);
    context.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.truewidth,
      this.trueheight
    );
  }
}

export class FlyingMob extends Mob {
  constructor(game) {
    super();
    this.game = game;
    this.width = 273;
    this.height = 282;
    this.truewidth = 47;
    this.trueheight = 50;
    this.x = this.game.width;
    this.y = Math.random() * this.height * 0.5 + 25;
    this.speedX = Math.random() * 1 + 0.8;
    this.speedY = 0;
    this.maxFrame = 12;
    this.image = fly_mob;
    this.angle = 0;
    this.va = Math.random() * 0.05 + 0.025;
  }
  update(deltaTime) {
    super.update(deltaTime);
    this.angle += this.va;
    this.y += Math.sin(this.angle);
  }
  getType() {
    return "FlyingMob";
  }
}

export class GroundMob extends Mob {
  constructor(game) {
    super();
    this.game = game;
    if (Math.random() <= 0.7) {
      this.width = 946;
      this.height = 821;
      this.truewidth = 91.79;
      this.trueheight = 80;
      this.maxFrame = 12;
      this.image = grd_mob;
      this.kind = "GroundMob1";
    } else {
      this.width = 1214;
      this.height = 787;
      this.truewidth = 120;
      this.trueheight = 77.79;
      this.maxFrame = 20;
      this.image = boss_w;
      this.kind = "GroundMob2";
    }
    this.x = this.game.width;
    this.y = this.game.height - this.trueheight - this.game.groundspace;
    this.speedX = 0.8;
    this.speedY = 0;
  }
  getType() {
    return this.kind;
  }
}
