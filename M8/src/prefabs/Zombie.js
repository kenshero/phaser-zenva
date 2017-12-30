var Veggies = Veggies || {};

Veggies.Zombie = function(state, x, y, data) {
  Phaser.Sprite.call(this, state.game, x, y, data.asset)

  this.state = state
  this.game = state.game
};

Veggies.Zombie.prototype = Object.create(Phaser.Sprite.prototype)
Veggies.Zombie.prototype.constructor = Veggies.Zombie
