var AngebotSprite = {
  create: function(x, y, kondition) {
    var angebot = game.add.sprite(x, y, 'angebot_bg');

    var bezeichner = game.add.text(250, 20, kondition.bezeichner, {
      font: 'bold 16pt Tahoma',
      fill: '#2345CD'
    }); 
    bezeichner.anchor.setTo(0.5, 0.5);
    angebot.addChild(bezeichner);
  
    var machbarkeit = game.add.sprite(30, 20, 'led_' + hypoport.game.Machbarkeit[kondition.machbarkeit]);
    machbarkeit.anchor.setTo(0.5, 0.5);
    angebot.addChild(machbarkeit);

    var betrag = game.add.text(250, 52, kondition.betrag + " €", {
      font: '12pt Arial',
      fill: '#000'
    });
    betrag.anchor.setTo(0.5, 0.5)
    angebot.addChild(betrag);

    var zins = game.add.text(120, 77, "Zins: " + kondition.zinsString(), {
      font: '12pt Tahoma',
      fill: '#000'
    });
    zins.anchor.setTo(0.5, 0.5)
    angebot.addChild(zins);

    var zinsBindung = game.add.text(370, 77, kondition.bindung + " Jahre", {
      font: '12pt Tahoma',
      fill: '#000'
    });
    zinsBindung.anchor.setTo(0.5, 0.5)
    angebot.addChild(zinsBindung);

    return angebot;
  },

  addPhysics: function(angebot) {
    game.physics.arcade.enable(angebot);
    angebot.body.bounce.y = 0.1;
    angebot.body.gravity.y = 600;
    angebot.body.collideWorldBounds = true;
  },

  addFadeOut: function(angebot) {
    angebot.inputEnabled = true;
    angebot.input.useHandCursor = true;
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