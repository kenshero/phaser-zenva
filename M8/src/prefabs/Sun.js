var Veggies = Veggies || {};

Veggies.Sun = function(state, x, y) {
  Phaser.Sprite.call(this, state.game, x, y, 'sun');

  this.state = state;
  this.game = state.game;
};

Veggies.Sun.prototype = Object.create(Phaser.Sprite.prototype);
Veggies.Sun.prototype.constructor = Veggies.Sun;
