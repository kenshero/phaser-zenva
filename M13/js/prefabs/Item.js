var PointClk = PointClk || {};

PointClk.Item = function(state, x, y, data) {
  Phaser.Sprite.call(this, state.game, x, y, data.asset);

  this.game = state.game;
  this.state = state;
  this.anchor.setTo(0.5);

  this.data = data;

  //listen for input
  this.inputEnabled = true;
  this.input.pixelPerfectClick = true;
  this.events.onInputDown.add(this.state.selectItem, this.state);
};

PointClk.Item.prototype = Object.create(Phaser.Sprite.prototype);
PointClk.Item.prototype.constructor = PointClk.Item;