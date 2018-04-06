var DunCrawl = DunCrawl || {};

DunCrawl.Item = function(state, data) {

  var position = state.board.getXYFromRowCol(data)

  Phaser.Sprite.call(this, state.game, position.x, position.y, data.asset);

  this.game = state.game;
  this.state = state;
  this.board = state.board
  this.row = data.row;
  this.col = data.col;
  this.data = data;

  this.anchor.setTo(0.5);

  this.inputEnabled = true
  this.events.onInputDown.add(this.collect, this)

};

DunCrawl.Item.prototype = Object.create(Phaser.Sprite.prototype);
DunCrawl.Item.prototype.constructor = DunCrawl.Unit;

DunCrawl.Item.prototype.collect = function() {
  if(this.data.type == 'consumable') {
    this.state.playerStats.health += this.data.health
    this.state.playerStats.attack += this.data.attack
    this.state.playerStats.defense += this.data.defense
    this.state.playerStats.gold += this.data.gold
    this.state.refreshStats()
    this.kill()
  }
}
