var FruitNinja = FruitNinja || {};

FruitNinja.Bomb = function (game_state, name, position, properties) {
    "use strict";
    FruitNinja.Cuttable.call(this, game_state, name, position, properties);
    
    this.scale.setTo(2);
    console.log(this.width);
    console.log(this.height);
    this.body.setSize(50, 50);
};

FruitNinja.Bomb.prototype = Object.create(FruitNinja.Cuttable.prototype);
FruitNinja.Bomb.prototype.constructor = FruitNinja.Bomb;

FruitNinja.Bomb.prototype.cut = function () {
    "use strict";
    FruitNinja.Cuttable.prototype.cut.call(this);
    // if a bomb is cut, the player lose a life
    this.game_state.prefabs.lives.die();
    this.kill();
};