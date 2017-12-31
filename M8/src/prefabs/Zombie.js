var Veggies = Veggies || {};

Veggies.Zombie = function(state, x, y, data) {
  Phaser.Sprite.call(this, state.game, x, y, data.asset)

  this.state = state
  this.game = state.game
  this.anchor.setTo(0.5)

  this.game.physics.arcade.enable(this)
  this.reset(x, y, data)
};

Veggies.Zombie.prototype = Object.create(Phaser.Sprite.prototype)
Veggies.Zombie.prototype.constructor = Veggies.Zombie

Veggies.Zombie.prototype.reset = function(x, y, data) {
  Phaser.Sprite.prototype.reset.call(this, x, y, data.health)

  this.loadTexture(data.asset)

  this.animationName = null

  if(data.animationFrames) {
    this.animationName = data.asset + 'Anim'
    this.animations.add(this.animationName, data.animationFrames, 4, true)
    this.play(this.animationName)
  }

  this.attack = data.attack
  this.defaultVelocity = data.velocity
  this.body.velocity.x = data.velocity

}