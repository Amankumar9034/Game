export class InputHandler {
    constructor(game) {
        this.game = game;
        this.keys = [];
        this.touchX = '';
        this.touchY = '';
        this.touchThresholdX= 30;
        this.touchThresholdY= 30;
        this.touchHoldTime = 0;
        this.touchHoldThreshold = 200;

        // keyboard controls
        window.addEventListener('keydown', e => {
            if ((e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === ' ')
                && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }else if (e.key === 'Enter' && this.game.gameOver) this.game.restartGame();
        });
        window.addEventListener('keyup', e => {
            if (e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === ' ') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });

        // mouse controls
        window.addEventListener('touchstart', e => {
            this.touchX = e.changedTouches[0].pageX;
            this.touchY = e.changedTouches[0].pageY;
            this.touchHoldTime = setTimeout(()=>{
                this.keys.push('touch hold');
            },this.touchHoldThreshold);
            
        });

        window.addEventListener('touchmove', e => {
            const swipeDistanceX = e.changedTouches[0].pageX - this.touchX;
            if(swipeDistanceX < -this.touchThresholdX && this.keys.indexOf('swipe left') === -1){
                this.keys.push('swipe left');
                if(this.game.gameOver) this.game.restartGame();
            }
            else if(swipeDistanceX > this.touchThresholdX && this.keys.indexOf('swipe right') === -1){
                this.keys.push('swipe right');
                if(this.game.gameOver) this.game.restartGame();
            }
            const swipeDistanceY = e.changedTouches[0].pageY - this.touchY;
            if(swipeDistanceY < -this.touchThresholdY && this.keys.indexOf('swipe up') === -1){ 
                this.keys.push('swipe up');
                if(this.game.gameOver) this.game.restartGame();
            }
            else if(swipeDistanceY > this.touchThresholdY && this.keys.indexOf('swipe down') === -1){
                this.keys.push('swipe down');
                if(this.game.gameOver) this.game.restartGame();
            }
            clearTimeout(this.touchHoldTime);
        });
        console.log((this.keys));
        window.addEventListener('touchend', e => {
            this.keys.splice(this.keys.indexOf('swipe up'), 1);
            this.keys.splice(this.keys.indexOf('swipe down'), 1);
            this.keys.splice(this.keys.indexOf('swipe left'), 1);
            this.keys.splice(this.keys.indexOf('swipe right'), 1);
            this.keys.splice(this.keys.indexOf('touch hold'), 1);
            clearTimeout(this.touchHoldTime);
        });
    }
}