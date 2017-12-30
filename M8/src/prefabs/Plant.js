var Veggies = Veggies || {};

Veggies.Plant = function(state, x, y, data) {
  Phaser.Sprite.call(this, state.game, x, y, data.plantAsset);

  this.state = state;
  this.game = state.game;
  this.bullets = state.bullets
  this.suns = state.suns

  this.anchor.setTo(0.5)

  this.game.physics.arcade.enable(this)
  this.body.immovable = true

  this.reset(x, y, data)
};

Veggies.Plant.prototype = Object.create(Phaser.Sprite.prototype);
Veggies.Plant.prototype.constructor = Veggies.Plant;

Veggies.Plant.prototype.reset = function(x, y, data) {
  Phaser.Sprite.prototype.reset.call(this, x, y, data.health)

  this.loadTexture(data.plantAsset)
}