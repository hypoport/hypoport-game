module hypoport.game {
    export class GameLogic {
        static MAX_ITERATIONS:number = 30;
        public stack:Angebot[] = [];
        generator:AngebotGenerator = new AngebotGenerator;
        angebotAdded = [];
        angebotRemoved = [];
        gameFinished = [];
        updated = [];
        counter:number = 0;
        gameLoop;

        public constructor() {
        }

        public startEventLoop() {
            clearInterval(this.gameLoop);
            this.gameLoop = setInterval(() => {
                if (this.stack.length > 4) {
                    this.doRemoveAt(4);
                }
                if (this.counter < GameLogic.MAX_ITERATIONS) {
                    ++this.counter;
                    var angebot = this.generator.createRandomAngebot();
                    this.stack.push(angebot);
                    this.angebotAdded.forEach((handler)=> {
                        handler.call(this, angebot, this.stack.length - 1);
                    });
                }
                else {
                    window.clearInterval(this.gameLoop);
                    this.gameLoop = undefined;
                    this.gameFinished.forEach((handler) => {
                        handler.call(this);
                    })
                }
                this.updated.forEach((handler) => {
                    handler.call(this);
                })
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

        public onUpdated(handler) {
            this.updated.push(handler);
        }

        public doRemove(angebot:Angebot) {
            this.doRemoveAt(this.indexOf.call(this, angebot));
        }

        public doRemoveAt(index:number) {
            var angebot = this.stack[index];
            this.stack.splice(index, 1);
            this.angebotRemoved.forEach((handler) => {
                handler.call(this, angebot, index);
            });
            this.updated.forEach((handler) => {
                handler.call(this);
            })
        }

        public indexOf(angebot) {
            return this.stack.indexOf(angebot);
        }

        public get running():boolean {
            return !!this.gameLoop;
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