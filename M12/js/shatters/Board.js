var Match3 = Match3 || {};

//setting game configuration and loading the assets for the loading screen
Match3.Board = function(state, rows, cols, blockVariations) {
  this.state = state
  this.rows = rows
  this.cols = cols
  this.blockVariations = blockVariations

  this.grid = []

  var i, j
  for(i = 0; i < rows; i++) {
    this.grid.push([])
    for(j = 0; j < cols; j++) {
      this.grid[i].push(0)
    }
  }

  this.reserveGrid = []
  this.RESERVE_ROW = 5
  for(i = 0 ; i < this.RESERVE_ROW; i++) {
    this.reserveGrid.push([])
    for(j=0; j<cols; j++) {
      this.reserveGrid[i].push(0)
    }
  }

  this.populatedGrid()
  this.populatedReserveGrid()

}

Match3.Board.prototype.populatedGrid = function() {
  var i, j, variation
  for(i = 0; i < this.rows; i++) {
    for(j = 0; j < this.cols; j++) {
      variation = Math.floor(Math.random() * this.blockVariations) + 1
      this.grid[i][j] = variation
    }
  }
}

Match3.Board.prototype.populatedReserveGrid = function() {
  var i, j, variation
  for(i = 0; i < this.RESERVE_ROW; i++) {
    for(j = 0; j < this.cols; j++) {
      variation = Math.floor(Math.random() * this.blockVariations) + 1
      this.reserveGrid[i][j] = variation
    }
  }
}

Match3.Board.prototype.consoleLog = function() {
  var i, j
  var prettyString = ''

  for(i = 0; i < this.RESERVE_ROW; i++) {
    prettyString += '\n'
    for(j = 0; j < this.cols; j++) {
      prettyString += ' ' + this.reserveGrid[i][j]
    }
  }
  prettyString += '\n'
  for(j = 0; j < this.cols; j++) {
    prettyString += ' -'
  }

  for(i = 0; i < this.rows; i++) {
    prettyString += '\n'
    for(j = 0; j < this.cols; j++) {
      prettyString += ' ' + this.grid[i][j]
    }
  }
  console.log(prettyString)
}

Match3.Board.prototype.swap = function(source, target) {
  var temp = this.grid[target.row][target.col]
  this.grid[target.row][target.col] = this.grid[source.row][source.col]
  this.grid[source.row][source.col] = temp
}

Match3.Board.prototype.checkAdjacent = function(source, target) {
  var diffRow = Math.abs(source.row - target.row)
  var diffCol = Math.abs(source.col - target.col)

  var isAdjacent = (diffRow == 1 && diffRow == 0) || (diffRow == 0 && diffCol == 1)
  return isAdjacent
}

Match3.Board.prototype.isChained = function(block) {
  var isChained = false
  var variation = this.grid[block.row][block.col]
  var row = block.row
  var col = block.col

  //left
  if(variation == this.grid[row][col - 1] && variation == this.grid[row][col - 2]) {
    isChained = true
  }

  //right
  if(variation == this.grid[row][col + 1] && variation == this.grid[row][col + 2]) {
    isChained = true
  }

  //up
  if(this.grid[row-2]) {
    if(variation == this.grid[row - 1][col] && variation == this.grid[row - 2][col]) {
      isChained = true
    }
  }

  //down
  if(this.grid[row+2]) {
    if(variation == this.grid[row + 1][col] && variation == this.grid[row + 2][col]) {
      isChained = true
    }
  }

  //center horizontal
  if(variation == this.grid[row][col - 1] && variation == this.grid[row][col + 1]) {
    isChained = true
  }

  //center vertical
  if(this.grid[row+1] && this.grid[row-1]) {
    if(variation == this.grid[row+1][col] && variation == this.grid[row-1][col]) {
      isChained = true
    }
  }

  return isChained

}
