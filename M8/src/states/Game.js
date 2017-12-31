var Veggies = Veggies || {};

Veggies.GameState = {

  init: function(currentLevel) {
    //keep track of the current level
    this.currentLevel = currentLevel ? currentLevel : 'level1';
    this.HOUSE_X = 60
    this.SUN_FREQUENCY = 5
    this.SUN_VELOCITY = 50
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

    this.numSums = 100

    this.createGui()

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

    this.sunGenerationTimer = this.game.time.create(false)
    this.sunGenerationTimer.start()
    this.scheduleSunGeneration()

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
  },
  createGui: function() {
    var sun = this.add.sprite(10, this.game.height - 20, 'sun')
    sun.anchor.setTo(0.5)
    sun.scale.setTo(0.5)

    var style = {font: '14 Arial', fill: '#fff'}
    this.sunLabel = this.add.text(22, this.game.height - 28, '', style)
    this.updateStats()
  },
  updateStats: function() {
    this.sunLabel.text = this.numSums
  },
  increaseSun: function(amount) {
    this.numSums += amount
    this.updateStats()
  },
  scheduleSunGeneration: function() {
    this.sunGenerationTimer.add(Phaser.Timer.SECOND * this.SUN_FREQUENCY, function(){
      this.generateRandomSun()
      this.scheduleSunGeneration()
    }, this)
  },
  generateRandomSun: function() {

    var y = -20
    var x = 40 + 420 * Math.random()

    var sun = this.createSun(x, y)

    sun.body.velocity.y = this.SUN_VELOCITY
  },
  createSun: function(x, y) {
    var newElement = this.suns.getFirstDead()

    if(!newElement) {
      newElement = new Veggies.Sun(this, x, y)
      this.suns.add(newElement)
    } else {
      newElement.reset(x, y)
    }

    return newElement
  }
};
