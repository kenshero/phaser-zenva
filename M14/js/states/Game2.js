var HexGame = HexGame || {};

HexGame.GameState = {

  init: function() {

    this.TILE_W = 56;
    this.TILE_H = 64;
    this.MARGIN_X = 30;
    this.MARGIN_Y = 5;
  },
  create: function() {
    this.map = JSON.parse(this.game.cache.getText('map'));
    this.board = new HexGame.Board(this, this.map.grid);

    this.playerUnits = this.add.group()
    this.enemyUnits = this.add.group()
    this.initUnits()

    this.newTurn()

  },
  initUnits: function() {
    this.playerUnitsData = JSON.parse(this.game.cache.getText('playerUnits'))
    this.enemyUnitsData = JSON.parse(this.game.cache.getText('enemyUnits'))

    var unit
    this.playerUnitsData.forEach(function(unitData){
      unit = new HexGame.Unit(this, unitData)

      unit.isPlayer = true
      this.playerUnits.add(unit)

    }, this)

    this.enemyUnitsData.forEach(function(unitData){
      unit = new HexGame.Unit(this, unitData);
      this.enemyUnits.add(unit);
    }, this);
  },
  clearSelection: function() {
    this.board.setAll('alpha', 1)

    this.board.forEach(function(tile){
      tile.events.onInputDown.removeAll()
    }, this)
  },
  newTurn: function() {
    this.allUnits = []

    this.playerUnits.forEachAlive(function(unit) {
      this.allUnits.push(unit)
    }, this)

    this.enemyUnits.forEachAlive(function(unit) {
      this.allUnits.push(unit)
    }, this)

    this.shuffle(this.allUnits)

    this.currUnitIndex = 0
    this.prepareNextUnit()

  },
  shuffle: function(array) {
    var counter = array.length, temp, index

    while(counter > 0) {
      index = Math.floor(Math.random() * counter)

      counter --

      temp = array[counter]
      array[counter] = array[index]
      array[index] = temp
    }

    return array
  },
  prepareNextUnit: function() {
    if(this.currUnitIndex < this.allUnits.length) {
      var unit = this.allUnits[this.currUnitIndex]
      this.currUnitIndex++

      if(unit.alive) {
        unit.showMovementOptions()
      } else {
        this.prepareNextUnit()
      }
    } else {
      this.newTurn()
    }
  }
};
