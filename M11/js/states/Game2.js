var HTown = HTown || {};

HTown.GameState = {

  init: function() {
    //game constants
    this.STEP = 2

    this.game.physics.arcade.gravity.y = 0

  },
  create: function() {

    // grass floor
    this.background = this.add.tileSprite(0, 0, 1200, 800, 'grass')
    this.game.world.setBounds(0, 0, 1200, 800)

    this.buildings = this.add.group()

    var house = new HTown.Building(this, 100, 100, {asset: 'house', housing: 100})
    this.buildings.add(house)

    var farm = new HTown.Building(this, 200, 200, {asset: 'crops', food: 100})
    this.buildings.add(farm)

    var factory = new HTown.Building(this, 200, 300, {asset: 'factory', jobs: 20})
    this.buildings.add(factory)

    this.town = new HTown.TownModel({}, {population: 100, food: 200, money: 100}, [{housing: 2}, {housing: 4}, {food: 50}, {jobs: 20}])

    this.simulationTimer = this.game.time.events.loop(Phaser.Timer.SECOND * this.STEP, this.simulationStep, this)

    this.initGui()
  },
  update: function() {

  },
  simulationStep: function() {
    this.town.step()
    this.refreshStats()
  },
  initGui: function() {
    //
    this.moneyIcon = this.add.sprite(10, 10, 'money')
    this.moneyIcon.fixedToCamera = true

    var style = {font: '14px Arial', fill: '#fff'}
    this.moneyLabel = this.add.text(45, 15, '0', style)

    this.foodIcon = this.add.sprite(100, 10, 'food')
    this.foodIcon.fixedToCamera = true

    style = {font: '14px Arial', fill: '#fff'}
    this.foodLabel = this.add.text(135, 15, '0', style)
    this.foodLabel.fixedToCamera = true

    this.populationIcon = this.add.sprite(190, 10, 'population')
    this.populationIcon.fixedToCamera = true

    style = {font: '14px Arial', fill: '#fff'}
    this.populationLabel = this.add.text(225, 15, '0', style)
    this.populationLabel.fixedToCamera = true

    this.jobsIcon = this.add.sprite(280, 10, 'jobs')
    this.jobsIcon.fixedToCamera = true

    style = {font: '14px Arial', fill: '#fff'}
    this.jobsLabel = this.add.text(315, 15, '0', style)
    this.jobsLabel.fixedToCamera = true

    this.refreshStats()

  },
  refreshStats: function() {
    this.moneyLabel.text = Math.round(this.town.stats.money)
    this.foodLabel.text = Math.round(this.town.stats.food)
    this.populationLabel.text = Math.round(this.town.stats.population) + '/' + Math.round(this.town.stats.housing)
    this.jobsLabel.text = Math.round(this.town.stats.jobs)
  }

};
