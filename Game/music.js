export class Music {
  constructor(game) {
    this.game = game;
    this.music = document.getElementById("startmusic");
    this.endmusic = document.getElementById("endmusic");
    this.crushmusic = document.getElementById("crushmusic");
    this.dizmusic = document.getElementById("dizzymusic");
  }
  startmusic() {
    this.music.loop = true;
    this.music.play();
  }
  crushingmusic() {
    this.crushmusic.currentTime = 0;
    this.crushmusic.play();
  }
  dizzymusic() {
    this.dizmusic.currentTime = 0;
    this.crushmusic.pause();
    this.dizmusic.play();
  }
  endingmusic() {
    console.log("endmusic");
    this.dizmusic.pause();
    this.music.pause();
    this.endmusic.play();
  }
}
