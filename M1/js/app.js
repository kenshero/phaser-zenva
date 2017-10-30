//this game will have only 1 state
var GameState = {
  //load the game assets before the game starts
  preload: function() {
    this.game.load.image('background', 'assets/images/background.png');
    this.game.load.image('arrow', 'assets/images/arrow.png');
    // this.game.load.image('chicken', 'assets/images/chicken.png');
    // this.game.load.image('horse', 'assets/images/horse.png');
    // this.game.load.image('pig', 'assets/images/pig.png');
    // this.game.load.image('sheep', 'assets/images/sheep.png');
    this.load.spritesheet('chicken', 'assets/images/chicken_spritesheet.png', 131, 200, 3)
    this.load.spritesheet('horse', 'assets/images/horse_spritesheet.png', 212, 200, 3)
    this.load.spritesheet('pig', 'assets/images/pig_spritesheet.png', 297, 200, 3)
    this.load.spritesheet('sheep', 'assets/images/sheep_spritesheet.png', 244, 200, 3)

  },
  //executed after everything is loaded
  create: function() {

    //scaling options
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    //have the game centered horizontally
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    //create a sprite for the background
    this.background = this.game.add.sprite(0, 0, 'background')

    //group for animals
    var animalData = [
      {key: 'chicken', text: 'CHICKEN'},
      {key: 'horse', text: 'HORSE'},
      {key: 'pig', text: 'PIG'},
      {key: 'sheep', text: 'SHEEP'}
    ];

    this.animals = this.game.add.group();

    var self = this;

    animalData.forEach(function(element){
      animal = self.animals.create(-1000, self.game.world.centerY, element.key, 0);

      animal.customParams = {text: element.text}
      animal.anchor.setTo(0.5)

      animal.animations.add('animate', [0, 1, 2, 1, 0, 1], 3, false)

      animal.inputEnabled = true
      animal.input.pixelPerfectClick = true
      animal.events.onInputDown.add(self.animateAnimal, self)

    });

    this.currentAnimal = this.animals.next();
    this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);

    this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow')
    this.rightArrow.anchor.setTo(0.5)
    this.rightArrow.customParams = {direction: 0}
    this.rightArrow.inputEnabled = true
    this.rightArrow.input.pixelPerfectClick = true
    this.rightArrow.events.onInputDown.add(this.switchAnimal, this)

    this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow')
    this.leftArrow.anchor.setTo(0.5)
    this.leftArrow.scale.x = -1
    this.leftArrow.customParams = {direction: 1}
    this.leftArrow.inputEnabled = true
    this.leftArrow.input.pixelPerfectClick = true
    this.leftArrow.events.onInputDown.add(this.switchAnimal, this)
  },
  update: function(){

  },
  switchAnimal: function(sprite, event){
    if(this.isMoving) {
      return false
    }
    this.isMoving = true
    var newAnimal, endX
    if(sprite.customParams.direction > 0 ) {
      newAnimal =  this.animals.next()
      newAnimal.x = -newAnimal.width / 2
      endX = 640 + this.currentAnimal.width / 2
    } else {
      newAnimal =  this.animals.previous()
      newAnimal.x = 640 + newAnimal.width / 2
      endX = -this.currentAnimal.width / 2
    }
    var newAnimalMovement = game.add.tween(newAnimal)
    newAnimalMovement.to({ x: this.game.world.centerX }, 1000)
    newAnimalMovement.onComplete.add(function(){
      this.isMoving = false
    }, this)
    newAnimalMovement.start()

    var currentAnimalMovement = game.add.tween(this.currentAnimal)
    currentAnimalMovement.to({x: endX}, 1000)
    currentAnimalMovement.start()

    this.currentAnimal = newAnimal
  },
  animateAnimal: function(sprite, event){
    sprite.play('animate')
  }
}

var game = new Phaser.Game(640, 360, Phaser.AUTO)

game.state.add('GameState', GameState);
game.state.start('GameState');