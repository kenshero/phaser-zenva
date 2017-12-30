var Veggies = Veggies || {};

Veggies.Bullet = function(state, x, y) {
  Phaser.Sprite.call(this, state.game, x, y, 'bullet');

  this.state = state;
  this.game = state.game;
};

Veggies.Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Veggies.Bullet.prototype.constructor = Veggies.Bullet;
