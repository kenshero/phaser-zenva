var RPG = RPG || {}

RPG.Player = function(state, x, y, data) {
  Phaser.Sprite.call(this, state.game, x, y, 'player')

  this.state = state
  this.game = state.game
  this.data = data
  this.anchor.setTo(0.5)

  this.animations.add('walk', [0, 1, 0], 6, false)

  this.game.physics.arcade.enable(this)

}

RPG.Player.prototype = Object.create(Phaser.Sprite.prototype)
RPG.Player.prototype.constructor = RPG.Player

RPG.Player.prototype.collectItem = function(item) {
  if(item.data.isQuest) {
    this.data.items.push(item)

    this.checkQuestCompletion(item)

  } else {
    this.data.health += item.data.health ? item.data.health : 0
    this.data.attack += item.data.attack ? item.data.attack : 0
    this.data.defense += item.data.defense ? item.data.defense : 0
    this.data.gold += item.data.gold ? item.data.gold : 0
  }
  item.kill()
}

RPG.Player.prototype.checkQuestCompletion = function(item) {
  var i = 0
  var len = this.data.quests.length
  while(i < len) {
    if(this.data.quests[i].code == item.data.questCode) {
      this.data.quests[i].isCompleted = true
      console.log(this.data.quests[i].name + 'has been completed');
      break
    }
    i++
  }
}
