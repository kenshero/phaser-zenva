var HexGame = HexGame || {};

HexGame.Board = function(state, grid) {
  Phaser.Group.call(this, state.game);

  this.state = state;
  this.game = state.game;
  this.grid = grid;
  this.rows = grid.length;
  this.cols = grid[0].length;

  this.terrains = [
    {asset: 'grass'},
    {asset: 'water', blocked: true},
    {asset: 'rocks'},
    {asset: 'grasstrees'},
    {asset: 'grasstrees2'},
  ]

  var row, col, tile, x, y
  for(row = 0; row < this.rows; row++) {
    for(col = 0; col < this.cols; col++) {
      if(row % 2 === 0) {
        x = this.state.MARGIN_X + col * this.state.TILE_W
      } else {
        x = this.state.MARGIN_X + col * this.state.TILE_W + this.state.TILE_W/2
      }
      y = this.state.MARGIN_Y + row * this.state.TILE_H * 3/4
      tile = new Phaser.Sprite(this.game, x, y, this.terrains[this.grid[row][col]].asset)

      tile.row = row
      tile.col = col
      tile.terrainsAsset = this.terrains[this.grid[row][col]].asset
      tile.blocked = this.terrains[this.grid[row][col]].blocked

      tile.inputEnabled = true
      tile.input.pixelPerfectClick = true

      this.add(tile)
    }
  }
};


HexGame.Board.prototype = Object.create(Phaser.Group.prototype);
HexGame.Board.prototype.constructor = HexGame.Board;

HexGame.Board.prototype.getFromRowCol = function(row, col) {
  var foundTile

  this.forEach(function(tile){
    if(tile.row === row && tile.col === col) {
      foundTile = tile
    }
  }, this)

  return foundTile
}

HexGame.Board.prototype.getXYFromRowCol = function(row, col) {
  var pos = {}
  if(row % 2 === 0) {
    pos.x = this.state.MARGIN_X + col * this.state.TILE_W + this.state.TILE_W/2
  } else {
    pos.x = this.state.MARGIN_X + col * this.state.TILE_W + this.state.TILE_W/2 + this.state.TILE_W/2
  }
  pos.y = this.state.MARGIN_Y + row * this.state.TILE_H * 3/4 + this.state.TILE_H/2

  return pos
}
