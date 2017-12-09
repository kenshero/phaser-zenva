var MrHop = MrHop || {}

MrHop.Platform = function(game, floorPool, numTiles, x, y) {
  Phaser.Group.call(this, game)

  this.tileSize = 40
  this.game = game
  this.enableBody = true
  this.floorPool = floorPool

  this.prepare(numTiles, x, y)

}

MrHop.Platform.prototype = Object.create(Phaser.Group.prototype);
MrHop.Platform.prototype.constructor = MrHop.Platform

MrHop.Platform.prototype.prepare = function(numTiles, x, y) {
  var i = 0
  while(i < numTiles){
    var floorTile = this.floorPool.getFirstExists(false)
    if(!floorTile) {
      floorTile = new Phaser.Sprite(this.game, x + i * this.tileSize, y, 'floor')
    } else {
      floorTile.reset(x + i * this.tileSize, y)
    }

    this.add(floorTile)
    i++
  }

  this.setAll('body.immovable', true);
  this.setAll('body.allowGravity', false);
}