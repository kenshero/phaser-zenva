var RPG = RPG || {};

RPG.GameState = {

  init: function(currentLevel) {
    //keep track of the current level
    this.currentLevel = currentLevel ? currentLevel : 'map1';

    //constants
    this.PLAYER_SPEED = 90;

    //no gravity in a top-down game
    this.game.physics.arcade.gravity.y = 0;

    //keyboard cursors
    this.cursors = this.game.input.keyboard.createCursorKeys();
  },
  create: function() {

    this.game.OnscreenControls = this.game.plugins.add(Phaser.Plugin.OnscreenControls)

    this.loadLevel();
    this.initGUI();
  },
  update: function() {

  },
  loadLevel: function(){
    //create a tilemap object
    this.map = this.add.tilemap(this.currentLevel);

    //join the tile images to the json data
    this.map.addTilesetImage('terrains', 'tilesheet');

    //create tile layers
    this.backgroundLayer = this.map.createLayer('backgroundLayer');
    this.collisionLayer = this.map.createLayer('collisionLayer');

    //send background to the back
    this.game.world.sendToBack(this.backgroundLayer);

    //collision layer should be collisionLayer
    this.map.setCollisionBetween(1,16, true, 'collisionLayer');

    //resize the world to fit the layer
    this.collisionLayer.resizeWorld();


    var playerData = {
      item: [],
      health: 25,
      attack: 12,
      defense: 8,
      gold: 100,
      quests: []
    }

    this.player = new RPG.Player(this, 100, 100, playerData)
    this.add.existing(this.player)
  },
  gameOver: function() {
    this.game.state.start('Game', true, false, this.currentLevel);
  },
  initGUI: function() {
    this.game.OnscreenControls.setup(this.player, {
      left: true,
      right: true,
      up: true,
      down: true,
      upleft: true,
      downleft: true,
      upright: true,
      downright: true,
      action: true
    })
  }

};
