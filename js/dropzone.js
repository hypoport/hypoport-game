var DropZone = {
  createDropZone: function(x, y) {
    var dropZone = game.add.sprite(x, y, 'dropzone_bg');
    dropZone.body.checkCollision.up = false;
	dropZone.body.checkCollision.down = true;
    dropZone.body.immovable = true;
	game.physics.enable(dropZone, Phaser.Physics.ARCADE);

    return dropZone;
  }
}
