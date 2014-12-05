var konditionen = [{
  typ: "Annuitätendarlehen",
  zins: 1.3,
  zinsBindung: 10,
  betrag: 100000,
  machbarkeit: 1
}, {
  typ: "Ratenkredit",
  zins: 2.3,
  zinsBindung: 15,
  betrag: 200000,
  machbarkeit: 2
}, {
  typ: "KfW 124",
  zins: 3.3,
  zinsBindung: 15,
  betrag: 200000,
  machbarkeit: 2
}]

var AngebotSprite = {
  create: function(x, y, kondition) {
    var angebot = game.add.sprite(x, y, 'angebot_bg');

    var typ = game.add.text(10, 2, kondition.typ, {
      font: '10pt Tahoma',
      fill: '#2345CD'
    });
    angebot.addChild(typ);

    var zins  = game.add.text(10, 25, "Zins:" + kondition.zins, {
      font: 'bold 12pt Tahoma',
      fill: '#000'
    });
    angebot.addChild(zins);

    var zinsBindung  = game.add.text(50, 25, kondition.zinsBindung + " Jahre", {
      font: '12pt Tahoma',
      fill: '#000'
    });
    angebot.addChild(zinsBindung);

    var betrag  = game.add.text(250, 25, kondition.betrag + " €", {
      font: '20pt Arial',
      fill: '#000'
    });
    angebot.addChild(betrag);
    
    return angebot;
  },

  addPhysicsToAngebot: function(angebot) {
    game.physics.arcade.enable(angebot);
    angebot.body.bounce.y = 0.7
    angebot.body.gravity.y = 600;
    angebot.body.collideWorldBounds = true;
  },

  addFadeOut: function(angebot) {
    angebot.inputEnabled = true;
    angebot.input.useHandCursor = true; //if you want a hand cursor
    angebot.events.onInputDown.add(AngebotSprite.fadeOut, this);
  },
  
  fadeOut: function(angebot, event) {
    angebot.body.collideWorldBounds = false;
    angebot.checkWorldBounds = true;
    angebot.body.gravity.y = 0;
    angebot.body.velocity.x = 5000;
    angebot.events.onOutOfBounds.add(function(sprite) {
      sprite.kill();
    }, this)
  }
}