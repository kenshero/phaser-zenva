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

  var chains = this.findAllChains()
  if(chains.length > 0) {
    this.populatedGrid()
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

  var tempPos = {row: source.row, col: source.col}
  source.row = target.row
  source.col = target.col

  target.row = tempPos.row
  target.col = tempPos.col
}

Match3.Board.prototype.checkAdjacent = function(source, target) {
  var diffRow = Math.abs(source.row - target.row);
  var diffCol = Math.abs(source.col - target.col);

  var isAdjacent = (diffRow == 1 && diffCol === 0) || (diffRow == 0 && diffCol === 1);
  return isAdjacent;
};


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

Match3.Board.prototype.findAllChains = function() {
  var chained = []
  var i, j

  for(i=0; i < this.rows; i++) {
    for(j = 0; j < this.cols; j++) {
      if(this.isChained({row: i, col: j})) {
        chained.push({row: i, col: j})
      }
    }
  }

  return chained
}

Match3.Board.prototype.clearChains = function() {
  var chainedBlocks = this.findAllChains()

  chainedBlocks.forEach(function(block){
    this.grid[block.row][block.col] = 0

    this.state.getBlockFromColRow(block).kill()

  }, this)
}

Match3.Board.prototype.dropBlock = function(sourceRow, targetRow, col) {
  this.grid[targetRow][col] = this.grid[sourceRow][col]
  this.grid[sourceRow][col] = 0

  this.state.dropBlock(sourceRow, targetRow, col)
}

Match3.Board.prototype.dropReserveBlock = function(sourceRow, targetRow, col){
  this.grid[targetRow][col] = this.reserveGrid[sourceRow][col];
  this.reserveGrid[sourceRow][col] = 0;

  this.state.dropReserveBlock(sourceRow, targetRow, col);
};


Match3.Board.prototype.updateGrid = function(){
  var i, j, k, foundBlock;

  //go through all the rows, from the bottom up
  for(i = this.rows - 1; i >= 0; i--){
    for(j = 0; j < this.cols; j++) {
      //if the block if zero, then get climb up to get a non-zero one
      if(this.grid[i][j] === 0) {
        foundBlock = false;

        //climb up in the main grid
        for(k = i - 1; k >= 0; k--) {
          if(this.grid[k][j] > 0) {
            this.dropBlock(k, i, j);
            foundBlock = true;
            break;
          }
        }

        if(!foundBlock) {
          //climb up in the reserve grid
          for(k = this.RESERVE_ROW - 1; k >= 0; k--) {
            if(this.reserveGrid[k][j] > 0) {
              this.dropReserveBlock(k, i, j);
              break;
            }
          }
        }
      }
    }
  }

  //repopulate the reserve
  this.populatedReserveGrid();
};