var PointClk = PointClk || {};

PointClk.Thing = function(state, data) {
  Phaser.Sprite.call(this, state.game, data.x, data.y, data.asset);

  this.game = state.game;
  this.state = state;
  this.anchor.setTo(0.5);
  this.data = data;

  //
  this.inputEnabled = true
  this.input.pixelPerfectClick = true
  this.events.onInputDown.add(this.touch, this)

};

PointClk.Thing.prototype = Object.create(Phaser.Sprite.prototype);
PointClk.Thing.prototype.constructor = PointClk.Thing;

PointClk.Thing.prototype.touch = function() {
  this.state.panelLabel.text = this.data.text

  if(this.data.type == 'collectable') {
    this.state.addItem(this.data)
    this.kill()
    return
  } else if(this.data.type == 'door' && this.data.isOpen) {
    console.log("go to", this.data.destination)
    var playerData = {
      room: this.data.destination,
      items: []
    }

    this.state.items.forEachAlive(function(item) {
      playerData.items.push(item.data)
    }, this)

    this.game.state.start('Game', true, false, playerData)
    return
  }

  var selectedItem = this.state.selectedItem

  if(selectedItem) {
    if(this.data.interactions && this.data.interactions[this.state.selectedItem.data.id]) {
      var interaction = this.data.interactions[this.state.selectedItem.data.id]

      if(interaction.text) {
        this.state.panelLabel.text = interaction.text
      }
      if(interaction.asset) {
        this.loadTexture(interaction.asset)
        this.data.asset = interaction.asset
      }

      if(interaction.action == 'open-door') {
        this.data.isOpen = true
        selectedItem.kill()
        this.state.clearSelection()
      }

    }
  }
}
