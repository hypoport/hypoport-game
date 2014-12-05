module hypoport.game {
    export enum Machbarkeit {
        gruen,
        gelb,
        rot
    }

    export class Angebot {
        public zins:number;
        public bindung:number;
        public betrag:number;
        public machbarkeit:Machbarkeit;
    }

    export class AngebotGenerator {
        static ZINS_BASE = 200;
        static ZINS_VARIANCE = 200;
        static BINDUNG_BASE = 15;
        static  BINDUNG_VARIANCE = 15;
        static BETRAG_BASE = 100000;
        static  BETRAG_VARIANCE = 40000;

        public createRandomAngebot():Angebot {
            var angebot = new Angebot();
            angebot.machbarkeit = (<any>Machbarkeit)[Machbarkeit[Math.floor(3 * (Math.random()))]];
            angebot.zins = AngebotGenerator.createRandomInteger(AngebotGenerator.ZINS_BASE, AngebotGenerator.ZINS_VARIANCE) / 100;
            angebot.bindung = AngebotGenerator.createRandomInteger(AngebotGenerator.BINDUNG_BASE, AngebotGenerator.BINDUNG_VARIANCE);
            angebot.betrag = AngebotGenerator.createRandomInteger(AngebotGenerator.BETRAG_BASE, AngebotGenerator.BETRAG_VARIANCE);
            return  angebot;
        }

        static createRandomInteger(base:number, variance:number):number {
            return base + Math.floor((Math.random() - .5) * variance);
        }
    }
}