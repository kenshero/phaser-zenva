var Veggies = Veggies || {};

Veggies.GameState = {

  init: function(currentLevel) {
    //keep track of the current level
    this.currentLevel = currentLevel ? currentLevel : 'level1';

    //no gravity in a top-down game
    this.game.physics.arcade.gravity.y = 0
  },
  create: function() {
    this.background = this.add.sprite(0, 0, 'background');

    //group for game objects
    this.bullets = this.add.group()
    this.plants = this.add.group()
    this.zombies = this.add.group()
    this.suns = this.add.group()

    var plantData = {
      plantAsset: 'plant',
      health: 10,
    }

    this.plant = new Veggies.Plant(this, 100, 100, plantData)
    this.plants.add(this.plant)

  },
  update: function() {

  },
  gameOver: function() {
    this.game.state.start('Game');
  }
};
