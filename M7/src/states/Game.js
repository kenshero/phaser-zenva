var ZPlat = ZPlat || {};

ZPlat.GameState = {

  init: function(level) {
    console.log("level : ", level);
    this.currentLevel = level || 'level1';

    //constants
    this.RUNNING_SPEED = 180;
    this.JUMPING_SPEED = 500;
    this.BOUNCING_SPEED = 150;

    //gravity
    this.game.physics.arcade.gravity.y = 1000;

    //cursor keys to move the player
    this.cursors = this.game.input.keyboard.createCursorKeys();
  },
  create: function() {
    //load current level
    this.loadLevel();

    //show on-screen touch controls
    this.createOnscreenControls();
  },
  update: function() {
    this.game.physics.arcade.collide(this.player, this.collisionLayer);
    this.game.physics.arcade.collide(this.enemies, this.collisionLayer);

    this.game.physics.arcade.overlap(this.player, this.goal, this.changeLevel, null, this);

    //generic platformer behavior (as in Monster Kong)
    this.player.body.velocity.x = 0;

    if(this.cursors.left.isDown || this.player.customParams.isMovingLeft) {
      this.player.body.velocity.x = -this.RUNNING_SPEED;
      this.player.scale.setTo(1, 1);
      this.player.play('walking');
    }
    else if(this.cursors.right.isDown || this.player.customParams.isMovingRight) {
      this.player.body.velocity.x = this.RUNNING_SPEED;
      this.player.scale.setTo(-1, 1);
      this.player.play('walking');
    }
    else {
      this.player.animations.stop();
      this.player.frame = 3;
    }

    if((this.cursors.up.isDown || this.player.customParams.mustJump) && (this.player.body.blocked.down || this.player.body.touching.down)) {
      this.player.body.velocity.y = -this.JUMPING_SPEED;
      this.player.customParams.mustJump = false;
    }
  },
  loadLevel: function() {

    this.map = this.add.tilemap(this.currentLevel)

    this.map.addTilesetImage('tiles_spritesheet', 'gameTiles')

    //create layers
    this.backgroundLayer = this.map.createLayer('backgroundLayer')
    this.collisionLayer = this.map.createLayer('collisionLayer')

    this.game.world.sendToBack(this.backgroundLayer)

    this.map.setCollisionBetween(1, 160, true, 'collisionLayer')

    this.collisionLayer.resizeWorld()

    var goalArr = this.findObjectsByType('goal', this.map, 'objectsLayer')
    this.goal = this.add.sprite(goalArr[0].x, goalArr[0].y, 'goal')
    this.game.physics.arcade.enable(this.goal)
    this.goal.body.allowGravity = false
    this.goal.nextLevel = goalArr[0].properties.nextLevel


    var playerArr = this.findObjectsByType('player', this.map, 'objectsLayer')
    this.player = this.add.sprite(playerArr[0].x, playerArr[0].y, 'player', 3)
    this.player.anchor.setTo(0.5)
    this.player.animations.add('walking', [0, 1, 2, 1], 6, true)
    this.game.physics.arcade.enable(this.player)
    this.player.customParams = {}
    this.player.body.collideWorldBounds = true

    this.game.camera.follow(this.player)

    this.enemies = this.add.group()
    this.createEnemies()

  },
  createOnscreenControls: function() {
    this.leftArrow = this.add.button(20, this.game.height - 60, 'arrowLeftButton');
    this.rightArrow = this.add.button(110, this.game.height - 60, 'arrowRightButton');
    this.actionButton = this.add.button(this.game.width - 100, this.game.height - 60, 'actionButton');

    this.leftArrow.alpha = 0.5;
    this.rightArrow.alpha = 0.5;
    this.actionButton.alpha = 0.5;

    this.leftArrow.fixedToCamera = true;
    this.rightArrow.fixedToCamera = true;
    this.actionButton.fixedToCamera = true;

    this.actionButton.events.onInputDown.add(function(){
      this.player.customParams.mustJump = true;
    }, this);

    this.actionButton.events.onInputUp.add(function(){
      this.player.customParams.mustJump = false;
    }, this);

    //left
    this.leftArrow.events.onInputDown.add(function(){
      this.player.customParams.isMovingLeft = true;
    }, this);

    this.leftArrow.events.onInputUp.add(function(){
      this.player.customParams.isMovingLeft = false;
    }, this);

    this.leftArrow.events.onInputOver.add(function(){
      this.player.customParams.isMovingLeft = true;
    }, this);

    this.leftArrow.events.onInputOut.add(function(){
      this.player.customParams.isMovingLeft = false;
    }, this);

    //right
    this.rightArrow.events.onInputDown.add(function(){
      this.player.customParams.isMovingRight = true;
    }, this);

    this.rightArrow.events.onInputUp.add(function(){
      this.player.customParams.isMovingRight = false;
    }, this);

    this.rightArrow.events.onInputOver.add(function(){
      this.player.customParams.isMovingRight = true;
    }, this);

    this.rightArrow.events.onInputOut.add(function(){
      this.player.customParams.isMovingRight = false;
    }, this);
  },
  findObjectsByType: function(targetType, tilemap, layer) {
    var result = []
    tilemap.objects[layer].forEach(function(element){
      if(element.properties.type == targetType) {
        element.y -= tilemap.tileHeight
        result.push(element)
      }
    }, this)

    return result
  },
  changeLevel: function(player, goal) {
    console.log("go to :" + goal.nextLevel)
    this.game.state.start('Game', true, false, goal.nextLevel)
  },
  createEnemies: function() {
    var enemyArr = this.findObjectsByType('enemy', this.map, 'objectsLayer')

    var enemy;

    enemyArr.forEach(function(element){
      enemy = new ZPlat.Enemy(this.game, element.x, element.y, 'slime', element.properties.velocity, this.map)
      this.enemies.add(enemy)
    }, this)

  }
}