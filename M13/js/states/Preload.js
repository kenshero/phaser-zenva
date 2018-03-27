var PointClk = PointClk || {};

//loading the game assets
PointClk.PreloadState = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(100, 1);
    this.load.setPreloadSprite(this.preloadBar);

    //load game assets

    //living room
    this.load.image('panel', 'assets/images/blue_panel.png');
    this.load.image('livingroom', 'assets/images/livingroom/livingroom.png');
    this.load.image('armless-chair', 'assets/images/livingroom/armless-chair.png');
    this.load.image('key', 'assets/images/livingroom/key.png');
    this.load.image('lamp', 'assets/images/livingroom/lamp.png');
    this.load.image('tv', 'assets/images/livingroom/tv.png');
    this.load.image('fancy-table', 'assets/images/livingroom/fancy-table.png');
    this.load.image('door', 'assets/images/livingroom/door.png');
    this.load.image('openDoor', 'assets/images/livingroom/opendoor.png');

    //bedroom
    this.load.image('bedroom', 'assets/images/bedroom/bedroom.png');
    this.load.image('medal', 'assets/images/bedroom/flat_medal6.png');
    this.load.image('gem', 'assets/images/bedroom/gem.png');
    this.load.image('chair', 'assets/images/bedroom/wooden-chair-viyana.png');


    //data files
    this.load.text('livingroom', 'assets/data/livingroom.json');
    this.load.text('bedroom', 'assets/data/bedroom.json');
  },
  create: function() {
    this.state.start('Game');
  }
};