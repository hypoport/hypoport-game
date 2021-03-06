module hypoport.game {
    export enum Machbarkeit {
        gruen,
        gelb,
        rot
    }

    export var Bezeichner:string[] = [
        "Castle Finance", "Hausbank", "Mobilefin"
    ];

    export class Angebot {
        public zins:number;
        public bindung:number;
        public betrag:number;
        public bezeichner:string;
        public machbarkeit:Machbarkeit;

        public zinsString() {
            var zs = Math.round(this.zins * 100).toString();
            return zs.slice(0, -2) + "," + zs.slice(-2);
        }

        get score():number {
            var machbarFaktor:number;
            if (this.machbarkeit === Machbarkeit.gelb) {machbarFaktor = .75;}
            else if (this.machbarkeit === Machbarkeit.rot) {machbarFaktor = .6;}
            else {machbarFaktor = 1;}

            return Math.floor(this.bindung / (10 * this.zins) * this.betrag * machbarFaktor);
        }
    }

    export class AngebotGenerator {
        static ZINS_BASE = 200;
        static ZINS_VARIANCE = 200;
        static BINDUNG_BASE = 15;
        static  BINDUNG_VARIANCE = 5;
        static BETRAG_BASE = 100;
        static  BETRAG_VARIANCE = 40;

        public createRandomAngebot():Angebot {
            var angebot = new Angebot();
            angebot.machbarkeit = (<any>Machbarkeit)[Machbarkeit[Math.floor(3 * (Math.random()))]];
            angebot.zins = AngebotGenerator.createRandomInteger(AngebotGenerator.ZINS_BASE, AngebotGenerator.ZINS_VARIANCE) / 100;
            angebot.bindung = AngebotGenerator.createRandomInteger(AngebotGenerator.BINDUNG_BASE, AngebotGenerator.BINDUNG_VARIANCE);
            angebot.betrag = AngebotGenerator.createRandomInteger(AngebotGenerator.BETRAG_BASE, AngebotGenerator.BETRAG_VARIANCE) * 1000;
            angebot.bezeichner = Bezeichner[Math.floor(Math.random() * Bezeichner.length)];
            return  angebot;
        }

        static createRandomInteger(base:number, variance:number):number {
            return base + Math.floor((Math.random() - .5) * variance);
        }
    }
}