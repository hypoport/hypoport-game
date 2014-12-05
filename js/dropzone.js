var DropZone = {
  create: function(x, y) {
    var dropZone = game.add.sprite(x, y, 'dropzone_bg');

    return dropZone;
  },
  
  addPhysics: function(dropZone) {
    game.physics.aracde.enable(dropZone);
    dropZone.body.immovable = true;
  },

  onOverlap: function(angebot, dropZone){
     //console.log("");
  },
  
}
