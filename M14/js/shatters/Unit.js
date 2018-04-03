var HexGame = HexGame || {};

HexGame.Unit = function(state, data) {
  var position = state.board.getXYFromRowCol(data.row, data.col)
  Phaser.Sprite.call(this, state.game, position.x, position.y, data.asset);

  this.game = state.game;
  this.state = state;
  this.board = state.board;
  this.row = data.row;
  this.col = data.col;
  this.data = data;

  this.anchor.setTo(0.5);

  this.inputEnabled = true
  this.input.pixelPerfectClick = true
  this.events.onInputDown.add(this.showMovementOptions, this)

};


HexGame.Unit.prototype = Object.create(Phaser.Sprite.prototype);
HexGame.Unit.prototype.constructor = HexGame.Unit;

HexGame.Unit.prototype.showMovementOptions = function() {
  this.state.clearSelection()
  if(this.state.uiBlocked) {
    return
  }

  var currTile = this.board.getFromRowCol(this.row, this.col)

  var adjacentCells = this.board.getAdjacent(currTile, true)

  adjacentCells.forEach(function(tile){
    tile.alpha = 0.7

    tile.events.onInputDown.add(this.moveUnit, this)
  }, this)
}

HexGame.Unit.prototype.moveUnit = function(tile) {
  this.state.clearSelection()
  this.state.uiBlocked = true

  var pos = this.board.getXYFromRowCol(tile.row, tile.col)
  var unitMovement = this.game.add.tween(this)

  unitMovement.to(pos, 200)
  unitMovement.onComplete.add(function(){
    this.state.uiBlocked = false
    this.row = tile.row
    this.col = tile.col
  }, this)
  unitMovement.start()

}
