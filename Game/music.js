export class Music {
  constructor(game) {
    this.game = game;
    this.music = document.getElementById("startmusic");
    this.endmusic = document.getElementById("endmusic");
    this.crushmusic = document.getElementById("crushmusic");
  }
  startmusic() {
    this.music.loop = true;
    this.music.play();
  }
  crushingmusic() {
    this.crushmusic.currentTime = 0;
    this.crushmusic.play();
  }
  endingmusic() {
    console.log("endmusic");
    this.music.pause();
    this.endmusic.play();
  }
}
