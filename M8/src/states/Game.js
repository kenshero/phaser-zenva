var Veggies = Veggies || {};

Veggies.GameState = {

  init: function(currentLevel) {
    //keep track of the current level
    this.currentLevel = currentLevel ? currentLevel : 'level1';
    this.HOUSE_X = 60
    this.SUN_FREQUENCY = 5
    this.SUN_VELOCITY = 50
    this.ZOMBIE_Y_POSITIONS = [49, 99, 149, 199, 249]
    //no gravity in a top-down game
    this.game.physics.arcade.gravity.y = 0
  },
  create: function() {
    this.background = this.add.sprite(0, 0, 'background');
    this.createLandPatches()

    //group for game objects
    this.bullets = this.add.group()
    this.plants = this.add.group()
    this.zombies = this.add.group()
    this.suns = this.add.group()

    this.numSuns = 1000

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

    this.sun = new Veggies.Sun(this, 200, 100)
    this.suns.add(this.sun)

    this.sunGenerationTimer = this.game.time.create(false)
    this.sunGenerationTimer.start()
    this.scheduleSunGeneration()

    //hiting sound
    this.hitSound = this.add.audio('hit')

    this.loadLevel()

  },
  update: function() {
    this.game.physics.arcade.collide(this.plants, this.zombies, this.attackPlant, null, this)
    this.game.physics.arcade.collide(this.bullets, this.zombies, this.hitZombie, null, this)

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
  createPlant: function(x, y, data, patch) {
    var newElement = this.plants.getFirstDead()

    if(!newElement) {
      newElement = new Veggies.Plant(this, x, y, data, patch)
      this.plants.add(newElement)
    } else {
      newElement.reset(x, y, data, patch)
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

    this.buttonData = JSON.parse(this.game.cache.getText('buttonData'))

    this.buttons = this.add.group()

    var button
    this.buttonData.forEach(function(element, index){
      button = new Phaser.Button(this.game, 80 + index * 40, this.game.height - 35, element.btnAsset, this.clickButton, this)
      this.buttons.add(button)

      button.plantData = element
    }, this)

    this.plantLabel = this.add.text(300, this.game.height - 28, '', style)
  },
  updateStats: function() {
    this.sunLabel.text = this.numSuns
  },
  increaseSun: function(amount) {
    this.numSuns += amount
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
  },
  hitZombie: function(bullet, zombie) {
    bullet.kill()
    this.hitSound.play()
    zombie.damage(1)
  },
  clickButton: function(button) {
    if(!button.selected) {
      this.clearSelection()
      this.plantLabel.text = 'Cost: ' + button.plantData.cost

      if(this.numSuns >= button.plantData.cost) {
        button.selected = true
        button.alpha = 0.5

        this.currentSelection = button.plantData
      } else {
        this.plantLabel.text += " - Too expensive!"
      }

    } else {
      this.clearSelection()
    }
    console.log(button);
  },
  clearSelection: function() {
    this.buttons.forEach(function(button){
      button.alpha = 1
      button.selected = false
    }, this)
  },
  createLandPatches: function() {
    this.patches = this.add.group()

    var rectangle = this.add.bitmapData(40, 50)
    rectangle.ctx.fillStyle = '#000'
    rectangle.ctx.fillRect(0, 0, 40, 50)

    var j, patch
    var dark = false

    for(var i = 0; i < 10; i++) {
      for(j = 0; j < 5; j++) {
        patch = new Phaser.Sprite(this.game, 64 + i * 40, 24 + j * 50, rectangle)
        this.patches.add(patch)

        alpha = dark ? 0.2 : 0.1
        dark = !dark
        patch.alpha = alpha

        patch.inputEnabled = true
        patch.events.onInputDown.add(this.plantPlant, this)
      }
    }
  },
  plantPlant: function(patch) {
    if(!patch.isBusy && this.currentSelection) {
      patch.isBusy = true

      var plant = this.createPlant(patch.x + patch.width/2, patch.y + patch.height/2 , this.currentSelection, patch)

      this.increaseSun(-this.currentSelection.cost)
      this.clearSelection()
    }
  },
  loadLevel: function() {
    this.levelData = JSON.parse(this.game.cache.getText(this.currentLevel))

    this.currentEnemyIndex = 0

    this.killedEnemies = 0
    this.numEnemies = this.levelData.zombies.length

    this.scheduleNextEnemy()
  },
  scheduleNextEnemy: function() {
    var nextEnemy = this.levelData.zombies[this.currentEnemyIndex]
    if(nextEnemy) {
      var nextTime = 1000 * (nextEnemy.time - (this.currentEnemyIndex == 0 ? 0 : this.levelData.zombies[this.currentEnemyIndex -1].time))

      console.log("nextTime : ", nextTime);
      this.nextEnemyTimer = this.game.time.events.add(nextTime, function(){
        var y = this.ZOMBIE_Y_POSITIONS[Math.floor(Math.random() * this.ZOMBIE_Y_POSITIONS.length)]

        this.createZombie(this.game.world.width + 40, y, nextEnemy)
        console.log("create");
        this.currentEnemyIndex++
        this.scheduleNextEnemy()

      }, this)
    }

  }
};
