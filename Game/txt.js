export class Txt {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "Helvetica";
    this.fontColor = "black";
  }

  draw(context) {
    context.font = this.fontSize + "px " + this.fontFamily;
    context.textAlign = "left";
    context.fillStyle = this.fontColor;
    context.fillText("Score: " + this.game.score, 20, 50);
    context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
    context.fillText(
      "Time: " +
        ((this.game.time - this.game.differencetime) * 0.001).toFixed(1),
      20,
      80
    );
    if (this.game.gameOver) {
      context.textAlign = "center";
      context.font = this.fontSize * 2 + "px " + this.fontFamily;
      context.fillText(
        "Game Over",
        this.game.width * 0.5,
        this.game.height * 0.5
      );
      this.myinput();
    }
  }

  goToPage2(dataToSend) {
    var encodedData = encodeURIComponent(dataToSend);
    window.location.href = "highscore.html?data=" + encodedData;
  }

  myinput() {
    if (confirm("Save This Run")) {
      var name = prompt("Game Over\nEnter Your Name:");

      if (name == null || name == "") {
        alert("You did not enter anything.");
        myinput();
      } else {
        let t = `${name}=${this.game.score}=${(
          (this.game.time - this.game.differencetime) *
          0.001
        ).toFixed(1)}`;
        this.goToPage2(t);
      }
    }
  }
}
