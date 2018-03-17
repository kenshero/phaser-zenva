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
  console.log(this.grid)
  this.reserveGrid = []

  this.RESERVE_ROW = 5

  for(i = 0 ; i < this.RESERVE_ROW; i++) {
    this.reserveGrid.push([])
    for(j=0; j<cols; j++) {
      this.reserveGrid[i].push(0)
    }
  }
  console.log(this.reserveGrid)

}
