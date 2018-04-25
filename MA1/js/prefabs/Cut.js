var FruitNinja = FruitNinja || {}

FruitNinja.Cut = function(gameState, name, position, properties) {
  "use strict"
  Phaser.Graphics.call(this, gameState.game, position.x, position.y)

  this.gameState = gameState
  this.name = name
  this.gameState.groups[properties.group].add(this)
  this.gameState.prefabs[name] = this

  this.beginFill(properties.style.color);
  this.lineStyle(properties.style.line_width, properties.style.color, properties.style.alpha);
  
  this.moveTo(properties.start.x, properties.start.y);
  this.lineTo(properties.end.x, properties.end.y);

  this.killTimer = this.gameState.time.create()
  this.killTimer.add(Phaser.Timer.SECOND * properties.duration, this.kill, this)
  this.killTimer.start()

}

FruitNinja.Cut.prototype = Object.create(Phaser.Graphics.prototype)
FruitNinja.Cut.prototype.kill = function() {
  "use strict"
  this.clear()
  Phaser.Graphics.prototype.kill.call(this)
}
