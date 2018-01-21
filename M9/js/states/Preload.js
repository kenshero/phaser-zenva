var RPG = RPG || {};

//loading the game assets
RPG.PreloadState = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(100, 1);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets    
    this.load.image('sword', 'assets/images/attack-icon.png');
    this.load.image('quest', 'assets/images/quest-button.png');
    this.load.image('chest', 'assets/images/chest-gold.png');
    this.load.image('coin', 'assets/images/coin.png');
    this.load.image('potion', 'assets/images/potion.png');
    this.load.image('shield', 'assets/images/shield.png');
    this.load.image('scroll', 'assets/images/scroll-skull.png');
    this.load.image('strangeItem', 'assets/images/gods-helmet.png');

    this.load.image('monster', 'assets/images/demon.png');
    this.load.image('dragon', 'assets/images/goldendragon.png');
    this.load.image('snake', 'assets/images/snake.png');
    this.load.image('skeleton', 'assets/images/swordskeleton.png');

    this.load.image('sword', 'assets/images/attack-icon.png')
    this.load.spritesheet('player', 'assets/images/player.png', 30, 30, 2, 0, 2);
    this.load.image('tilesheet', 'assets/images/terrains.png');  

    //load game data
    this.load.tilemap('map1', 'assets/levels/world.json', null, Phaser.Tilemap.TILED_JSON);
  },
  create: function() {
    this.state.start('Game');
  }
};