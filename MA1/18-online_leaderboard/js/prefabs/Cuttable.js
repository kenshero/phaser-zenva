var FruitNinja = FruitNinja || {};

FruitNinja.Cuttable = function (game_state, name, position, properties) {
    "use strict";
    FruitNinja.Prefab.call(this, game_state, name, position, properties);
    
    this.anchor.setTo(0.5);
    this.scale.setTo(5);
    
    this.game_state.game.physics.arcade.enable(this);
    
    this.velocity = properties.velocity;
    this.body.velocity.y = -this.velocity.y;
    this.body.velocity.x = this.velocity.x;
    
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
};

FruitNinja.Cuttable.prototype = Object.create(FruitNinja.Prefab.prototype);
FruitNinja.Cuttable.prototype.constructor = FruitNinja.Cuttable;

FruitNinja.Cuttable.prototype.reset = function (position_x, position_y, velocity) {
    "use strict";
    Phaser.Sprite.prototype.reset.call(this, position_x, position_y);
    this.body.velocity.y = -velocity.y;
    this.body.velocity.x = velocity.x;
};

FruitNinja.Cuttable.prototype.cut = function () {
    "use strict";
    var emitter;
    emitter = this.game_state.game.add.emitter(this.x, this.y);
    emitter.makeParticles("particle_image");
    
    emitter.minParticleSpeed.setTo(-200, -200);
    emitter.maxParticleSpeed.setTo(200, 200);
    emitter.gravity = 0;
    
    emitter.start(true, 700, null, 1000);
};