var SpaceHipster = SpaceHipster || {};

SpaceHipster.EnemyBullet = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'bullet');
  
  //some default values
  this.anchor.setTo(0.5);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
};

SpaceHipster.EnemyBullet.prototype = Object.create(Phaser.Sprite.prototype);
SpaceHipster.EnemyBullet.prototype.constructor = SpaceHipster.EnemyBullet;