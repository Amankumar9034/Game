export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Creepster';
        this.livesImage = document.getElementById('lives');
    }
    draw(context) {
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'white';
        context.shadowBlur = 0;
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        //score
        context.fillText('Score: ' + this.game.score, 20, 50);
        // timer 
        context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
        context.fillText('Time: ' + ((this.game.maxTime - this.game.time) * 0.001).toFixed(1), 22, 73);
        //win
        context.textAlign = 'Right';
        context.fillStyle = this.game.fontColor;
        context.fillText('Score 100 for win ',this.game.width - 150, 20);
        // lives
        for (let i = 0; i < this.game.lives; i++) {
            context.drawImage(this.livesImage, 25 * i + 20, 80, 25, 25);
        }

        // gameover
        if (this.game.gameOver) {
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            if (this.game.score > 100) {
                context.fillText('Boo-yah ', this.game.width / 2, this.game.height / 2 - 20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText('Aagye Swad, fr se khel le n', this.game.width / 2, this.game.height / 2 + 20);
                context.fillText('Press Enter to PLAY AGAIN', this.game.width / 2, this.game.height / 2 + 50);
            } else {
                context.fillText('Love at first bite', this.game.width / 2, this.game.height / 2 - 20);
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText('Aagye Swad, fr se khel le n', this.game.width / 2, this.game.height / 2 + 20);
                context.fillText('Press Enter to PLAY AGAIN', this.game.width / 2, this.game.height / 2 + 50);
            }
        }
        context.restore();
    }
}