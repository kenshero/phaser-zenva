var Achicken = Achicken || {};

Achicken.GameState = {

  init: function(currentLevel) {
    //constants
    this.MAX_DISTANCE_SHOOT = 190;
    this.MAX_SPEED_SHOOT = 1100;
    this.SHOOT_FACTOR = 12;
    this.KILL_DIFF = 25;

    //keep track of the current level
    this.currentLevel = currentLevel ? currentLevel : 'level1';

    //gravity
    this.game.physics.p2.gravity.y = 1000;

    this.blocksCollisionGroup = this.game.physics.p2.createCollisionGroup()
    this.enemiesCollisionGroup = this.game.physics.p2.createCollisionGroup()
    this.chickenCollisionGroup = this.game.physics.p2.createCollisionGroup()
  },
  create: function() {

    this.sky = this.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'sky')
    this.game.world.sendToBack(this.sky)

    this.enemies = this.add.group()
    this.enemies.enableBody = true
    this.enemies.physicsBodyType = Phaser.Physics.P2JS


    this.blocks = this.add.group()
    this.blocks.enableBody = true
    this.blocks.physicsBodyType = Phaser.Physics.P2JS

    this.floor = this.add.tileSprite(this.game.world.width/2, this.game.world.height - 24, this.game.world.width, 48, 'floor')
    this.blocks.add(this.floor)

    this.floor.body.setCollisionGroup(this.blocksCollisionGroup)
    this.floor.body.collides([this.blocksCollisionGroup, this.enemiesCollisionGroup, this.chickenCollisionGroup])
    this.floor.body.static = true

    this.loadLevel()
  },

  hitEnemy: function(bodyB, shapeA, shapeB, equation) {
    console.log(this);
    var velocityDiff = Phaser.Point.distance(
      new Phaser.Point(equation[0].bodyA.velocity[0], equation[0].bodyA.velocity[1]),
      new Phaser.Point(equation[0].bodyB.velocity[0], equation[0].bodyB.velocity[1])
    )
    if(velocityDiff > Achicken.GameState.KILL_DIFF) {
      this.kill()
    }
  },
  update: function() {

  },
  gameOver: function() {
    this.game.state.start('Game', true, false, this.currentLevel)
  },
  loadLevel: function() {
    this.levelData = JSON.parse(this.game.cache.getText(this.currentLevel))

    this.levelData.blocks.forEach(function(block) {
      this.createBlock(block)
    }, this)

    this.levelData.enemies.forEach(function(enemy) {
      this.createEnemy(enemy)
    }, this)
  },
  createBlock: function(data) {
    var block = new Phaser.Sprite(this.game, data.x, data.y, data.asset)
    this.blocks.add(block)

    block.body.mass = data.mass

    block.body.setCollisionGroup(this.blocksCollisionGroup)

    block.body.collides([this.blocksCollisionGroup, this.enemiesCollisionGroup, this.chickenCollisionGroup])

    return block
  },
  createEnemy: function(data) {
    var enemy = new Phaser.Sprite(this.game, data.x, data.y, data.asset)
    this.enemies.add(enemy)

    enemy.body.setCollisionGroup(this.enemiesCollisionGroup)

    enemy.body.collides([this.blocksCollisionGroup, this.enemiesCollisionGroup, this.chickenCollisionGroup])
    enemy.body.onBeginContact.add(this.hitEnemy, enemy)

    return enemy
  }

};
