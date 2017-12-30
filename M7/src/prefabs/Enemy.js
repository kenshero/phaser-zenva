var ZPlat = ZPlat || {}

ZPlat.Enemy = function(game, x, y, key, velocity, tilemap) {
  Phaser.Sprite.call(this, game, x, y, key)

  this.game = game
  this.tilemap = tilemap
  this.anchor.setTo(0.5)

  if(velocity === undefined) {
    velocity = (40 + Math.random() * 20) *(Math.random() < 0.5 ? 1 : -1)
  }

  this.game.physics.arcade.enableBody(this)
  this.body.collideWorldBounds = true
  this.body.bounce.set(1, 0)
  this.body.velocity.x = velocity
}

ZPlat.Enemy.prototype = Object.create(Phaser.Sprite.prototype)
ZPlat.Enemy.prototype.constructor = ZPlat.Enemy

ZPlat.Enemy.prototype.update = function() {

  var direction
  if(this.body.velocity.x > 0) {
    this.scale.setTo(-1, 1)
    direction = 1
  } else {
    this.scale.setTo(1, 1)
    direction = -1
  }

  var nextX = this.x + direction * (Math.abs(this.width)/2 + 1)
  var nextY = this.bottom + 1

  var nextTile = this.tilemap.getTileWorldXY(nextX, nextY, this.tilemap.tileWidth, this.tilemap.tileHeight, 'collisionLayer')
  console.log("nextTile : ", nextTile);
  if(!nextTile && this.body.blocked.down) {
    this.body.velocity.x *= -1
  }

}