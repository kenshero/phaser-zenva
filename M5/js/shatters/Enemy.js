var SpaceHipster = SpaceHipster || {}

SpaceHipster.Enemy = function(game, x, y, key, health, enemyBullets) {
  Phaser.Sprite.call(this, game, x, y, key)

  this.game = game
  // this.game.physics.arcade.enable(this)

  this.animations.add('getHit', [0, 1, 2, 1, 0], 25, false)
  this.anchor.setTo(0.5)
  this.health = health

  this.enemyBullets = enemyBullets

  this.enemyTimer = this.game.time.create(false)
  this.enemyTimer.start()

  this.scheduleShooting()
}

SpaceHipster.Enemy.prototype = Object.create(Phaser.Sprite.prototype)
SpaceHipster.Enemy.prototype.constructor = SpaceHipster.Enemy

SpaceHipster.Enemy.prototype.update = function() {
  if(this.x < 0.05 * this.game.world.width){
    this.x = 0.05 * this.game.world.width + 2
    this.body.velocity.x *= -1
  } else if(this.x > 0.95 * this.game.world.width){
    this.x = 0.95 * this.game.world.width - 2
    this.body.velocity.x *= -1
  }

  if(this.top > this.game.world.height){
    this.kill()
  }
}

SpaceHipster.Enemy.prototype.damage = function(amount){
  Phaser.Sprite.prototype.damage.call(this, amount)
  this.play('getHit')

  if(this.health <= 0) {
    var emitter = this.game.add.emitter(this.x, this.y, 100)
    emitter.makeParticles('enemyParticle')
    emitter.minParticleSpeed.setTo(-200, -200)
    emitter.maxParticleSpeed.setTo(200, 200)
    emitter.gravity = 0
    emitter.start(true, 500, null, 100)
  }
}

SpaceHipster.Enemy.prototype.scheduleShooting = function() {
  this.shoot()

  this.enemyTimer.add(Phaser.Timer.SECOND * 2, this.scheduleShooting, this)
}

SpaceHipster.Enemy.prototype.shoot = function() {
  var bullet = this.enemyBullets.getFirstExists(false)

  if(!bullet) {
    bullet = new SpaceHipster.EnemyBullet(this.game, this.x, this.bottom)
    this.enemyBullets.add(bullet)
  } else {
    bullet.reset(this.x, this.y)
  }

  bullet.body.velocity.y = 100
}
