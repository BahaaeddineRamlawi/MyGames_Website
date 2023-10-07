export class InputMove {
    constructor(game){
        this.game = game;
        this.keys = []
        window.addEventListener('keydown', e => {
            e.preventDefault();
            if ((e.key === 'ArrowUp' || e.key === 'ArrowDown' ||
             e.key === 'ArrowRight' || e.key === 'ArrowLeft' ||
             e.key === 'a' || e.key === 's' || e.key === 'd' ||
             e.key === 'w' || e.key === 'Enter' || e.key === ' '
             ) && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            }
            if (e.key === 'h') this.game.hitbox = !this.game.hitbox;
        });
        window.addEventListener('keyup', e => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown' ||
             e.key === 'ArrowRight' || e.key === 'ArrowLeft' ||
             e.key === 'a' || e.key === 's' || e.key === 'd' ||
             e.key === 'w' || e.key === 'Enter' || e.key === ' ' ){
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
}