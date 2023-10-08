export class Hearts {
  constructor(game, num) {
    this.game = game;
    this.width = 24;
    this.height = 24;
    this.x = 20;
    this.y = 90;
    this.markedheart = false;
    this.num = num;
    this.image = ht;
  }
  update() {}
  draw(context) {
    context.drawImage(
      this.image,
      this.x + this.num,
      this.y,
      this.width,
      this.height
    );
  }
}
