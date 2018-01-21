var RPG = RPG || {}

RPG.Item = function(state, x, y, key, data) {
  Phaser.Sprite.call(this, state.game, x, y, key)

  this.state = state
  this.game = state.game
  this.data = data
  this.anchor.setTo(0.5)

  this.game.physics.arcade.enable(this)

}

RPG.Item.prototype = Object.create(Phaser.Sprite.prototype)
RPG.Item.prototype.constructor = RPG.Item
