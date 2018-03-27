var PointClk = PointClk || {};

PointClk.GameState = {

  init: function(playerData) {
    this.playerData = playerData ? playerData : {};
    this.playerData.room = this.playerData.room ? this.playerData.room : 'livingroom';
    this.playerData.items = this.playerData.items ? this.playerData.items : [];
  },
  create: function() {
    //panel area
    this.panel = this.add.sprite(0, 270, 'panel');
    var style = {
      font: '16px Prstart',
      fill: '#fff',
      align: 'left',
      wordWrap: true,
      wordWrapWidth: 400
    };
    this.panelLabel = this.add.text(10, 290, '', style);

    this.loadRoom();

    //player items
    this.items = this.add.group();

    this.showItems();
  },
  loadRoom: function() {
    this.roomData = JSON.parse(this.game.cache.getText(this.playerData.room));

    this.background = this.add.sprite(0, 0, this.roomData.background);

    //create things
    this.things = this.add.group();
    var thing;
    this.roomData.things.forEach(function(thingData){
      thing = new PointClk.Thing(this, thingData);
      this.things.add(thing);
    }, this);
  },
  addItem: function(itemData) {
    //create an Item object
    var item = new PointClk.Item(this, 420 + this.items.length * 80, 310, itemData);
    this.items.add(item);

    return item;
  },
  selectItem: function(item) {
    if(this.selectedItem != item) {
      this.clearSelection();
      this.selectedItem = item;
      this.selectedItem.alpha = 0.5;
    }
    else {
      this.clearSelection();
    }
  },
  clearSelection: function() {
    this.selectedItem = null;
    this.items.setAll('alpha', 1);
  },
  showItems: function() {
    this.playerData.items.forEach(function(itemData){
      this.addItem(itemData);
    }, this);
  }

};
