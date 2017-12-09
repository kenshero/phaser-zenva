var MrHop = MrHop || {}

MrHop.GameState = {

  init: function() {
    this.floorPool = this.add.group()
    this.game.physics.arcade.gravity.y = 1000
  },
  create: function() {
    var platform = new MrHop.Platform(this.game, this.floorPool, 12, 100, 200)
    this.add.existing(platform)
  },
  update: function() {

  }

}