class Layer {
  constructor(game, width, height, speedMod, image) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedMod = speedMod;
    this.image = image;
    this.x = 0;
    this.y = 0;
  }
  update() {
    if (this.x < -this.width) this.x = 0;
    else this.x -= this.game.speed * this.speedMod;
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

export class Background {
  constructor(game) {
    this.game = game;
    this.width = 1499.45;
    this.height = 500;
    this.layer1pic = layer1;
    this.layer2pic = layer2;
    this.layer3pic = layer3;
    this.layer4pic = layer4;
    this.layer1 = new Layer(
      this.game,
      this.width,
      this.height,
      0,
      this.layer1pic
    );
    this.layer2 = new Layer(
      this.game,
      this.width,
      this.height,
      0.5,
      this.layer2pic
    );
    this.layer3 = new Layer(
      this.game,
      this.width,
      this.height,
      0.9,
      this.layer3pic
    );
    this.layer4 = new Layer(
      this.game,
      this.width,
      this.height,
      1.2,
      this.layer4pic
    );
    this.backgroundlayers = [
      this.layer1,
      this.layer2,
      this.layer3,
      this.layer4,
    ];
  }
  update() {
    this.backgroundlayers.forEach((layer) => {
      layer.update();
    });
  }
  draw(context) {
    this.backgroundlayers.forEach((layer) => {
      layer.draw(context);
    });
  }
}
