var SpaceHipster = SpaceHipster || {};

SpaceHipster.PlayerBullet = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'bullet');
  
  //some default values
  this.anchor.setTo(0.5);
  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
};

SpaceHipster.PlayerBullet.prototype = Object.create(Phaser.Sprite.prototype);
SpaceHipster.PlayerBullet.prototype.constructor = SpaceHipster.PlayerBullet;