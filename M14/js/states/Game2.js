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
  }
};
