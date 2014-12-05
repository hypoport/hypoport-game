var passedDropZoneBarrier = [];

var DropZone = {
  create: function(x, y) {
    var dropZone = game.add.sprite(x, y, 'dropzone_bg');

    return dropZone;
  },
  
  addPhysics: function(dropZone) {
    game.physics.arcade.enable(dropZone);
    dropZone.body.immovable = true;
    //dropZone.body.collideWorldBounds = true;
    //dropZone.body.checkCollision.up = false;
  },

  onOverlap: function(angebot, dropZone){
    var passed = passedDropZoneBarrier.length;
      
    console.log(angebot);
    console.log(dropZone);
    
    if (passed<=4){
      passedDropZoneBarrier[passed] = angebot;
    } else {
     angebot.body.checkCollision.down = false;
     angebot.body.checkCollision.up = true;
    }
    
  },
  
//   onKillAngebot: function(angebot){
//     for(int i=0; i < passedDropZoneBarrier.length; i++){
//         if(passedDropZoneBarrier[i]==angebot){
//             //passedDropZoneBarrier[i].delete
//         }
//     }  
//   },
  
}
