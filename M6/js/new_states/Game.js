var MrHop = MrHop || {}

MrHop.GameState = {
  init: function() {
    this.floorPool = this.add.group()
    this.platformPool = this.add.group()

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

    this.platform = new MrHop.Platform(this.game, this.floorPool, 12, 0, 200, -this.levelSpeed)
    this.platformPool.add(this.platform)
  },
  update: function() {

    this.platformPool.forEachAlive(function(platform, index){
      this.game.physics.arcade.collide(this.player, platform)
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
  }
  // render: function() {
  //   this.game.debug.body(this.player)
  //   this.game.debug.bodyInfo(this.player, 0, 40)
  // }

}