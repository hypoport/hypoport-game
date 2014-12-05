var angebote = [{
  zins: 1.3,
  zinsBindung: 10,
  betrag: 100000,
  machbarkeit: 1
}, {
  zins: 2.3,
  zinsBindung: 15,
  betrag: 200000,
  machbarkeit: 2
}, {
  zins: 3.3,
  zinsBindung: 15,
  betrag: 200000,
  machbarkeit: 2
}]

var Angebote = {
  createAngebot: function(x, y, text) {
    var angebot = game.add.sprite(x, y, 'angebot_bg');
    var text = game.add.text(15, 15, text);
    angebot.addChild(text);
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
    angebot.events.onInputDown.add(Angebote.fadeOut, this);
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