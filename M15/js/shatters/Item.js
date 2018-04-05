var DunCrawl = DunCrawl || {};

DunCrawl.Item = function(state, data) {

  var position = {
    x: 10,
    y: 10
  }

  Phaser.Sprite.call(this, state.game, position.x, position.y, data.asset);

  this.game = state.game;
  this.state = state;
  this.board = state.board
  this.row = data.row;
  this.col = data.col;
  this.data = data;

  this.anchor.setTo(0.5);

};

DunCrawl.Item.prototype = Object.create(Phaser.Sprite.prototype);
DunCrawl.Item.prototype.constructor = DunCrawl.Unit;
