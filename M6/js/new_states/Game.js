var MrHop = MrHop || {}

MrHop.GameState = {
  init: function() {
    this.floorPool = this.add.group()
    this.game.physics.arcade.gravity.y = 1000

    this.maxJumpDistance = 120

    this.cursors = this.game.input.keyboard.createCursorKeys()
    this.myCoins = 0
  },
  create: function() {
    this.player = this.add.sprite(50, 50, 'player')
    this.player.anchor.setTo(0.5)
    this.player.animations.add('running', [0, 1, 2, 3, 2, 1], 15, true)
    this.game.physics.arcade.enable(this.player)

    this.platform = new MrHop.Platform(this.game, this.floorPool, 12, 0, 200)
    this.add.existing(this.platform)
  },
  update: function() {
    this.game.physics.arcade.collide(this.player, this.platform)
  }

}