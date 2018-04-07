var DunCrawl = DunCrawl || {}

DunCrawl.Board = function(state, data) {
  this.state = state
  this.game = state.game
  this.rows = data.rows
  this.cols = data.cols
  this.numCells = this.rows * this.cols
  this.mapElements = state.mapElements;
  this.tileSize = data.tileSize
  this.levelData = data.levelData
  this.coefs = this.levelData.coefs
  this.darkTiles = state.darkTiles

  var i, j, tile
  for(i=0; i<this.rows; i++) {
    for(j=0; j<this.cols; j++) {
      tile = new Phaser.Sprite(this.game, j * this.tileSize, i * this.tileSize, 'rockTile')
      tile.row = i
      tile.col = j
      this.state.backgroundTiles.add(tile)

      tile.inputEnabled = true
      tile.events.onInputDown.add(function(tile){
        this.clearDarknessTile(tile, true);
      }, this)
    }
  }
}

DunCrawl.Board.prototype.getSurrounding = function(tile) {
  var adjacentTiles = []
  var relativePositions = [
    {r: 1, c: -1},
    {r: 1, c: 0},
    {r: 1, c: 1},
    {r: 0, c: -1},
    {r: 0, c: 1},
    {r: -1, c: -1},
    {r: -1, c: 0},
    {r: -1, c: 1}
  ]

  var relRow, relCol
  relativePositions.forEach(function(relPos){
    relRow = tile.row + relPos.r
    relCol = tile.col + relPos.c

    if(relRow >= 0 && relRow < this.rows && relCol >= 0 && relCol < this.cols) {
      adjacentTiles.push({row: relRow, col: relCol})
    }
  }, this)
  return adjacentTiles
}

DunCrawl.Board.prototype.getXYFromRowCol = function(cell) {
  return {
    x: cell.col * this.tileSize + this.tileSize/2,
    y: cell.row * this.tileSize + this.tileSize/2
  }
}

DunCrawl.Board.prototype.getFreeCell = function() {
  var freeCell,  foundCell
  var row, col, i
  var len = this.mapElements.length

  while(!freeCell) {
    foundCell = false

    row = this.randomBetween(0, this.rows, true)
    col = this.randomBetween(0, this.cols, true)

    for(i=0; i < len ; i++) {
      if(this.mapElements.children[i].alive && this.mapElements.children[i].row === row && this.mapElements.children[i].col == col) {
        foundCell = true
        break
      }
    }

    if(!foundCell) {
      freeCell = { row: row, col: col }
    }

  }

  return freeCell
}

DunCrawl.Board.prototype.randomBetween = function(a, b, isInteger) {
  var numBetween = a + Math.random() * (b-a)

  if(isInteger) {
    numBetween = Math.floor(numBetween)
  }

  return numBetween
}

DunCrawl.Board.prototype.initLevel = function() {
  this.initDarkness()
  this.initItems()
  this.initEnemies()
  this.initExit()
}

DunCrawl.Board.prototype.initItems = function(){
  //number of items
  var numItems = Math.round(this.numCells * this.coefs.itemOccupation * this.randomBetween(1 - this.coefs.itemVariation, 1 + this.coefs.itemVariation));

  //generate items
  var i = 0;
  var type;
  var itemData, newItem, cell;

  while(i < numItems) {

    //random item type
    type = this.randomBetween(0, this.levelData.itemTypes.length, true);

    //grab item data
    itemData = Object.create(this.levelData.itemTypes[type]);
    itemData.board = this;

    itemData.health = itemData.health || 0;
    itemData.attack = itemData.attack || 0;
    itemData.defense = itemData.defense || 0;
    itemData.gold = itemData.gold || 0;

    //get a free cell to place the new item
    cell = this.getFreeCell();
    itemData.row = cell.row;
    itemData.col = cell.col;

    //create the item and add it to the map
    newItem = new DunCrawl.Item(this.state, itemData);
    this.mapElements.add(newItem);

    i++;
  }
};


DunCrawl.Board.prototype.initExit = function(){
  //starting point
  var startCell = this.getFreeCell();
  var start = new DunCrawl.Item(this.state, {
    asset: 'start',
    row: startCell.row,
    col:  startCell.col,
    type: 'start'
  });
  this.mapElements.add(start);

  //exit
  var exitCell = this.getFreeCell();
  var exit = new DunCrawl.Item(this.state, {
    asset: 'exit',
    row: exitCell.row,
    col:  exitCell.col,
    type: 'exit'
  });
  this.mapElements.add(exit);

  //door key
  var keyCell = this.getFreeCell();
  var key = new DunCrawl.Item(this.state, {
    asset: 'key',
    row: keyCell.row,
    col:  keyCell.col,
    type: 'key'
  });
  this.mapElements.add(key);
  this.clearDarknessTile(start, true);
};

DunCrawl.Board.prototype.initEnemies = function() {
  var numEnemies = Math.round(this.numCells * this.coefs.enemyOccupation * this.randomBetween(1 - this.coefs.enemyVariation, 1 + this.coefs.enemyVariation))

  var i = 0
  var type
  var enemyData, newEnemy, cell

  while(i < numEnemies) {
    type = this.randomBetween(0, this.levelData.enemyTypes.length, true)
    enemyData = Object.create(this.levelData.enemyTypes[type])
    enemyData.board = this

    var coefs = Math.pow(this.coefs.levelIncrement, this.state.currentLevel)
    enemyData.health = Math.round(coefs * enemyData.health)
    enemyData.attack = Math.round(coefs * enemyData.attack)
    enemyData.defense = Math.round(coefs * enemyData.defense)
    enemyData.gold = Math.round(coefs * enemyData.healthgold)

    cell = this.getFreeCell()
    enemyData.row = cell.row
    enemyData.col = cell.col

    newEnemy = new DunCrawl.Enemy(this.state, enemyData)
    this.mapElements.add(newEnemy)

    i++
  }
}

DunCrawl.Board.prototype.initDarkness = function() {
  var i, j, tile
  for(i=0; i<this.rows; i++) {
    for(j=0; j<this.cols; j++) {
      tile = new Phaser.Sprite(this.game, j * this.tileSize, i * this.tileSize, 'darkTile')
      tile.row = i
      tile.col = j
      this.darkTiles.add(tile)

      tile.inputEnabled = true
      tile.events.onInputDown.add(function(tile){

      }, this)
    }
  }
  this.darkTiles.setAll('alpha', 0.7)
}

DunCrawl.Board.prototype.clearDarknessTile = function(tile, considerEnemies) {
  //cells that will be discovered or revealed
  var tiles = this.getSurrounding(tile);
  tiles.push(tile);

  var len = this.darkTiles.length;
  var lenMap = this.mapElements.length;
  var darkTile, i ,j;

  if(considerEnemies) {
    var hasMonster = false;
    var lenTiles = tiles.length;
    var enemy;

    for(i = 0; i < lenTiles; i++) {
      //search for monster in the tile
      for(j = 0; j < lenMap; j++) {
        enemy = this.mapElements.children[j];

        if(enemy.alive && enemy.data.type == 'enemy' && enemy.visible && enemy.row == tiles[i].row && enemy.col == tiles[i].col) {
          hasMonster = true;
          break;
        }
      }

      //if there was a monster, we can't reveal
      if(hasMonster) {
        return;
      }
    }
  }

  tiles.forEach(function(currTile) {
    for(i=0; i < len; i++) {
      darkTile = this.darkTiles.children[i]
      if(darkTile.alive && currTile.row === darkTile.row && currTile.col === darkTile.col) {

        for(j = 0; j < lenMap; j++) {
          if(this.mapElements.children[j].alive && this.mapElements.children[j].row == darkTile.row && this.mapElements.children[j].col == darkTile.col) {
            this.mapElements.children[j].visible = true;
            break;
          }
        }

        darkTile.kill();
        break;
      }
    }
  }, this)
}
