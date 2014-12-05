module hypoport.game {
    export class GameLogic {
        static MAX_ITERATIONS:number = 30;
        public stack:Angebot[] = [];
        generator:AngebotGenerator = new AngebotGenerator;
        angebotAdded = [];
        angebotRemoved = [];
        gameFinished = [];
        counter:number = 0;

        gameLoop;

        public constructor() {
        }

        public startEventLoop() {
            clearInterval(this.gameLoop);
            this.gameLoop = setInterval(() => {
                if (this.counter < GameLogic.MAX_ITERATIONS) {
                    ++this.counter;
                    if (this.stack.length > 4) {
                        this.doRemoveAt(4);
                    }
                    var angebot = this.generator.createRandomAngebot();
                    this.stack.push(angebot);
                    this.angebotAdded.forEach((handler)=> {
                        handler.call(this, angebot, this.stack.length - 1);
                    });
                    this.forceRemove = true;
                }
                else {
                    window.clearInterval(this.gameLoop);
                    this.gameFinished.forEach((handler) => {
                        handler.call(this);
                    })
                }
            }, 2000);
        }

        public onAngebotAdded(handler) {
            this.angebotAdded.push(handler);
        }

        public onAngebotRemoved(handler) {
            this.angebotRemoved.push(handler);
        }

        public onGameFinished(handler) {
            this.gameFinished.push(handler);
        }

        public doRemove(angebot:Angebot) {
            this.doRemoveAt(this.indexOf.call(this, angebot));
        }

        public doRemoveAt(index:number) {
            var angebot = this.stack[4];
            this.stack.splice(4, 1);
            this.angebotRemoved.forEach((handler) => {
                handler.call(this, angebot, this.stack.length - 1);
            });
        }

        public indexOf(angebot) {
            return this.stack.indexOf(angebot);
        }

        public get score():number {
            var score:number = 0;
            this.stack.slice(0, 4).forEach(function (angebot) {
                score += angebot.score;
            });
            return score;
        }
    }
}