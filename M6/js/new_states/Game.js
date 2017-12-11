var MrHop = MrHop || {}

MrHop.GameState = {
  init: function() {
    this.floorPool = this.add.group()
    this.platformPool = this.add.group()

    this.coinsPool = this.add.group()
    this.coinsPool.enableBody = true

    this.game.physics.arcade.gravity.y = 1000

    this.maxJumpDistance = 120

    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.myCoins = 0

    this.levelSpeed = 200
  },
  create: function() {
    this.player = this.add.sprite(50, 50, 'player')
    this.player.anchor.setTo(0.5)
    this.player.animations.add('running', [0, 1, 2, 3, 2, 1], 15, true)
    this.game.physics.arcade.enable(this.player)

    this.player.body.setSize(38, 60, 0, 0)
    this.player.play('running')

    this.currentPlatform = new MrHop.Platform(this.game, this.floorPool, 12, 0, 200, -this.levelSpeed, this.coinsPool)
    this.platformPool.add(this.currentPlatform)

    this.loadLevel()
  },
  update: function() {

    this.platformPool.forEachAlive(function(platform, index){
      this.game.physics.arcade.collide(this.player, platform)

      // check kill
      if(platform.length && platform.children[platform.length-1].right < 0) {
        platform.kill()
      }
    }, this)

    if(this.player.body.touching.down){
      this.player.body.velocity.x = this.levelSpeed
    } else {
      this.player.body.velocity.x = 0
    }

    if(this.cursors.up.isDown || this.game.input.activePointer.isDown) {
      this.playerJump()
    } else if(this.cursors.up.isUp || this.game.input.activePointer.isUp) {
      this.isJumping = false
    }
    if(this.currentPlatform.length && this.currentPlatform.children[this.currentPlatform.length - 1].right < this.game.world.width) {
      this.createPlatform()
    }
  },
  playerJump: function() {
    if(this.player.body.touching.down) {
      this.startJumpY = this.player.y

      this.isJumping = true
      this.jumpPeaked = false

      this.player.body.velocity.y = -300
    } else if(this.isJumping && !this.jumpPeaked) {
      var distanceJumped = this.startJumpY - this.player.y
      if(distanceJumped <= this.maxJumpDistance) {
        this.player.body.velocity.y = -300
      } else {
        this.jumpPeaked = true
      }
    }
  },
  loadLevel: function() {

    this.createPlatform()
  },
  createPlatform: function() {
    var nextPlatformData = this.generateRandomPlatform()

    if(nextPlatformData) {
      this.currentPlatform = this.platformPool.getFirstDead()
      if(!this.currentPlatform) {
        console.log("aaaaaaaa");
        this.currentPlatform = new MrHop.Platform(
          this.game,
          this.floorPool,
          nextPlatformData.numTiles,
          this.game.world.width + nextPlatformData.separation,
          nextPlatformData.y,
          -this.levelSpeed,
          this.coinsPool
        )
      } else {
        console.log("bbbbbbbb");
        this.currentPlatform.prepare(
          nextPlatformData.numTiles,
          this.game.world.width + nextPlatformData.separation,
          nextPlatformData.y,
          -this.levelSpeed
        )
      }
      this.platformPool.add(this.currentPlatform)
    }
  },
  generateRandomPlatform: function() {
    var data = {}

    var minSeparation = 60
    var maxSeparation = 200
    data.separation = minSeparation + Math.random() * (maxSeparation - minSeparation)

    var minDifY = -120
    var maxDifY = 120

    data.y = this.currentPlatform.children[0].y + (minDifY + Math.random() * (maxDifY - minDifY))
    data.y = Math.max(150, data.y)
    data.y = Math.min(this.game.world.height - 50, data.y)


    var minTiles = 1
    var maxTiles = 5
    data.numTiles = minTiles + Math.random() * (maxTiles - minTiles)

    return data
  }
  // render: function() {
  //   this.game.debug.body(this.player)
  //   this.game.debug.bodyInfo(this.player, 0, 40)
  // }

}