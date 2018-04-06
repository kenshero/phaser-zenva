var DunCrawl = DunCrawl || {};

DunCrawl.GameState = {

  init: function(data) {
    //board
    this.ROWS = 8;
    this.COLS = 6;
    this.TILE_SIZE = 60;

    data = data || {};
    this.currentLevel = data.currentLevel || 1;

    this.playerStats = data.playerStats || {
      health: 25,
      attack: 2,
      defense: 1,
      gold: 0,
      hasKey: false
    };
  },
  create: function() {
    //tiles groups
    this.backgroundTiles = this.add.group()

    this.mapElements = this.add.group()

    this.levelData = JSON.parse(this.game.cache.getText('gameBaseData'))

    this.board = new DunCrawl.Board(this, {
      rows: this.ROWS,
      cols: this.COLS,
      tileSize: this.TILE_SIZE,
      levelData: this.levelData
    });

    this.item = new DunCrawl.Item(this, {
      row: 3,
      col: 2,
      asset: 'sword',
      type: 'consumable',
      health: 10,
      attack: 0,
      defense: 1,
      gold: 100
    })

    this.mapElements.add(this.item)

    this.board.initLevel()

    this.initGui()
  },
  gameOver: function() {
    this.game.state.start('Game');
  },
  nextLevel: function() {
    this.game.state.start('Game', true, false, {currentLevel: this.currentLevel + 1, playerStats: this.playerStats});
  },
  initGui: function() {
    var y = this.TILE_SIZE * this.ROWS
    var bitmapRect = this.add.bitmapData(this.game.width, this.game.height - y)
    bitmapRect.ctx.fillStyle = '#000058'
    bitmapRect.ctx.fillRect(0, 0, this.game.width, this.game.height - y)

    this.panel = this.add.sprite(0, y, bitmapRect)

    var style = {
      font: '16px Pstart',
      fill: '#fff',
      align: 'left'
    }

    this.healthIcon = this.add.sprite(this.game.width - 110, y -10 + this.TILE_SIZE/2, 'heart');
    this.healthLabel = this.add.text(this.game.width - 70, y -10 + this.TILE_SIZE/2 + 5, '', style);

    //attack
    this.attackIcon = this.add.sprite(this.game.width - 110, y -10 + 2 * this.TILE_SIZE/2, 'attack');
    this.attackLabel = this.add.text(this.game.width - 70, y -10 + 2 * this.TILE_SIZE/2 + 5, '', style);

    //defense
    this.defenseIcon = this.add.sprite(this.game.width - 110, y -10 + 3 * this.TILE_SIZE/2, 'defense');
    this.defenseLabel = this.add.text(this.game.width - 70, y -10 + 3 * this.TILE_SIZE/2 + 5, '', style);

    //gold
    this.goldIcon = this.add.sprite(this.game.width - 110, y -10 + 4 * this.TILE_SIZE/2, 'gold');
    this.goldLabel = this.add.text(this.game.width - 70, y -10 + 4 * this.TILE_SIZE/2 + 5, '', style);

    this.charImage = this.add.sprite(30, y + 16, 'profile')

    style = {
      font: '10px Pstart',
      fill: '#fff',
      align: 'left'
    }
    this.levelLabel = this.add.text(45, this.game.height - this.TILE_SIZE/2, '', style)
    this.refreshStats()
  },
  refreshStats: function() {
    this.healthLabel.text = Math.ceil(this.playerStats.health)
    this.attackLabel.text = Math.ceil(this.playerStats.attack)
    this.defenseLabel.text = Math.ceil(this.playerStats.defense)
    this.goldLabel.text = Math.ceil(this.playerStats.gold)

    this.levelLabel.text = 'Floor' + this.currentLevel
  }

};
