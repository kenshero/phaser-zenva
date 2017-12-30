var Veggies = Veggies || {};

Veggies.Plant = function(state, x, y, data) {
  Phaser.Sprite.call(this, state.game, x, y, data.plantAsset);

  this.state = state;
  this.game = state.game;
};

Veggies.Plant.prototype = Object.create(Phaser.Sprite.prototype);
Veggies.Plant.prototype.constructor = Veggies.Plant;
