var GameState = {
  preload: function(){
    this.load.image('background', 'assets/images/background.png')
    this.load.image('chicken', 'assets/images/chicken.png')
    this.load.image('horse', 'assets/images/horse.png')
    this.load.image('pig', 'assets/images/pig.png')
    this.load.image('sheep', 'assets/images/sheep.png')
    this.load.image('arrow', 'assets/images/arrow.png')
  },
  create: function(){
    this.background = this.game.add.sprite(0, 0, 'background')

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    var animalData = [
      {key: 'chicken', text: 'CHICKEN'},
      {key: 'horse', text: 'HORSE'},
      {key: 'pig', text: 'PIG'},
      {key: 'sheep', text: 'SHEEP'}
    ];

    this.animals = this.game.add.group();

    var self = this;

    animalData.forEach(function(element){
      self.animals.create(200, self.game.world.centerY, element.key);
    });

    this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow')
    this.rightArrow.anchor.setTo(0.5)
    this.rightArrow.customParams = {direction: 1}

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
    console.log("move Animal");
  },
  animateAnimal: function(sprite, event){
    console.log("animate Animal");
  }
}

var game = new Phaser.Game(640, 360, Phaser.AUTO)

game.state.add('GameState', GameState);
game.state.start('GameState');