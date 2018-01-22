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

    this.game.onscreenControls = this.game.plugins.add(Phaser.Plugin.OnscreenControls)

    this.loadLevel();
  },
  update: function() {

    this.game.physics.arcade.collide(this.player, this.collisionLayer)
    this.game.physics.arcade.overlap(this.player, this.items, this.collect, null, this)

    this.player.body.velocity.x = 0
    this.player.body.velocity.y = 0

    if(this.cursors.left.isDown || this.player.btnsPressed.left || this.player.btnsPressed.upleft || this.player.btnsPressed.downleft) {
      this.player.body.velocity.x = -this.PLAYER_SPEED
      this.player.scale.setTo(1, 1)
    }

    if(this.cursors.right.isDown || this.player.btnsPressed.right || this.player.btnsPressed.upright || this.player.btnsPressed.downright) {
      this.player.body.velocity.x = this.PLAYER_SPEED
      this.player.scale.setTo(-1, 1)
    }

    if(this.cursors.up.isDown || this.player.btnsPressed.up || this.player.btnsPressed.upright || this.player.btnsPressed.upleft) {
      this.player.body.velocity.y = -this.PLAYER_SPEED
    }

    if(this.cursors.down.isDown || this.player.btnsPressed.down || this.player.btnsPressed.downright || this.player.btnsPressed.downleft) {
      this.player.body.velocity.y = this.PLAYER_SPEED
    }

    if(this.game.input.activePointer.isUp) {
      this.game.onscreenControls.stopMovement()
    }

    if(this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0) {
      this.player.play('walk')
    } else {
      this.player.animations.stop()
      this.player.frame = 0
    }

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
      items: [],
      health: 25,
      attack: 12,
      defense: 8,
      gold: 100,
      quests: [
        {
          name: 'Find the Magic Scroll',
          code: 'magic-scroll',
          isCompleted: false
        },
        {
          name: 'Find the Helmet of the Golds',
          code: 'gods-helmet',
          isCompleted: false
        }
      ]
    }

    this.player = new RPG.Player(this, 100, 100, playerData)
    this.add.existing(this.player)

    this.items = this.add.group()

    var potion = new RPG.Item(this, 100, 150, 'potion', {health: 10})
    this.items.add(potion)

    var sword = new RPG.Item(this, 100, 180, 'sword', {attack: 2})
    this.items.add(sword)

    var shield = new RPG.Item(this, 100, 210, 'shield', {defense: 2})
    this.items.add(shield)

    var chest = new RPG.Item(this, 100, 240, 'chest', {gold: 100})
    this.items.add(chest)

    var questItem = new RPG.Item(this, 100, 270, 'scroll', {isQuest: true, questCode: 'magic-scroll'})
    this.items.add(questItem)
    this.initGUI();
  },
  gameOver: function() {
    this.game.state.start('Game', true, false, this.currentLevel);
  },
  initGUI: function() {
    this.game.onscreenControls.setup(this.player, {
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

    this.showPlayerIcons()
  },
  collect: function(player, item) {
    this.player.collectItem(item)
  },
  showPlayerIcons: function() {
    this.goldIcon = this.add.sprite(10, 10, 'coin')
    this.goldIcon.fixedToCamera = true

    var style = {font: '14px Arial', fill: '#fff'}
    this.goldLabel = this.add.text(30, 10, '0', style)
    this.goldLabel.fixedToCamera = true

    this.attackIcon = this.add.sprite(70, 10, 'sword')
    this.attackIcon.fixedToCamera = true

    var style = {font: '14px Arial', fill: '#fff'}
    this.attackLabel = this.add.text(90, 10, '0', style)
    this.attackLabel.fixedToCamera = true

    this.defenseIcon = this.add.sprite(130, 10, 'shield')
    this.defenseIcon.fixedToCamera = true

    var style = {font: '14px Arial', fill: '#fff'}
    this.defenseLabel = this.add.text(150, 10, '0', style)
    this.defenseLabel.fixedToCamera = true

    this.refreshStats()
  },
  refreshStats: function() {
    this.goldLabel.text = this.player.data.gold
    this.attackLabel.text = this.player.data.attack
    this.defenseLabel.text = this.player.data.defense
  }

};