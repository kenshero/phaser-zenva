var Veggies = Veggies || {};

Veggies.GameState = {

  init: function(currentLevel) {
    //keep track of the current level
    this.currentLevel = currentLevel ? currentLevel : 'level1';
    this.HOUSE_X = 60
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

    var zombieData = {
      asset: 'zombie',
      health: 10,
      animationFrames: [0, 1, 2, 1],
      attack: 0.1,
      velocity: -10
    }

    this.zombie = new Veggies.Zombie(this, 300, 100, zombieData)
    this.zombies.add(this.zombie)

    var plantData = {
      plantAsset: 'plant',
      health: 10,
      isShooter: true,
      animationFrames: [1, 2, 1, 0],
    }

    this.plant = new Veggies.Plant(this, 100, 100, plantData)
    this.plants.add(this.plant)

    this.sun = new Veggies.Sun(this, 200, 100)
    this.suns.add(this.sun)

  },
  update: function() {
    this.game.physics.arcade.collide(this.plants, this.zombies, this.attackPlant, null, this)

    this.zombies.forEachAlive(function(zombie){
      zombie.body.velocity.x = zombie.defaultVelocity

      if(zombie.x <= this.HOUSE_X) {
        this.gameOver()
      }

    }, this)
  },
  gameOver: function() {
    this.game.state.start('Game');
  },
  attackPlant: function(plant, zombie) {
    plant.damage(zombie.attack)
    console.log('zombile attack');
  },
  createZombie: function(x, y, data) {
    var newElement = this.zombies.getFirstDead()

    if(!newElement) {
      newElement = new Veggies.Zombie(this, x, y, data)
      this.zombies.add(newElement)
    } else {
      newElement.reset(x, y, data)
    }

    return newElement
  },
  createPlant: function(x, y, data) {
    var newElement = this.plants.getFirstDead()

    if(!newElement) {
      newElement = new Veggies.Zombie(this, x, y, data)
      this.plants.add(newElement)
    } else {
      newElement.reset(x, y, data)
    }

    return newElement
  }
};
