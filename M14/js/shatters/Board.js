var HexGame = HexGame || {};

HexGame.Board = function(state, grid) {
  Phaser.Group.call(this, state.game);

  this.state = state;
  this.game = state.game;
  this.grid = grid;
  this.rows = grid.length;
  this.cols = grid[0].length;

  var row, col, tile, x, y
  for(row = 0; row < this.rows; row++) {
    for(col = 0; col < this.cols; col++) {
      if(row % 2 === 0) {
        x = this.state.MARGIN_X + col * this.state.TILE_W
      } else {
        x = this.state.MARGIN_X + col * this.state.TILE_W + this.state.TILE_W/2
      }
      y = this.state.MARGIN_Y + row * this.state.TILE_H * 3/4
      tile = new Phaser.Sprite(this.game, x, y, 'grass')
      this.add(tile)
    }
  }
};


HexGame.Board.prototype = Object.create(Phaser.Group.prototype);
HexGame.Board.prototype.constructor = HexGame.Board;
