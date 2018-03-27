var PointClk = PointClk || {};

PointClk.Item = function(state, x, y, data) {
  Phaser.Sprite.call(this, state.game, x, y, data.asset);

  this.game = state.game;
  this.state = state;
  this.anchor.setTo(0.5);

};

PointClk.Item.prototype = Object.create(Phaser.Sprite.prototype);
PointClk.Item.prototype.constructor = PointClk.Item;
