var RPG = RPG || {}

RPG.Item = function(state, x, y, key, data) {
  Phaser.Sprite.call(this, state.game, x, y, key)

  this.state = state
  this.game = state.game
  this.data = data
  this.anchor.setTo(0.5)

  this.data.attack = +this.data.attack
  this.data.defense = +this.data.defense
  this.data.health = +this.data.health
  this.data.gold = +this.data.gold

  this.game.physics.arcade.enable(this)

}

RPG.Item.prototype = Object.create(Phaser.Sprite.prototype)
RPG.Item.prototype.constructor = RPG.Item
