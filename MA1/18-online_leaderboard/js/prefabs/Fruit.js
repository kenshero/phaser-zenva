var FruitNinja = FruitNinja || {};

FruitNinja.Fruit = function (game_state, name, position, properties) {
    "use strict";
    var frame_index;
    FruitNinja.Cuttable.call(this, game_state, name, position, properties);
    
    this.frames = properties.frames;
    
    frame_index = this.game_state.rnd.between(0, this.frames.length - 1);
    this.frame = this.frames[frame_index];
    
    this.body.setSize(20, 20);
};

FruitNinja.Fruit.prototype = Object.create(FruitNinja.Cuttable.prototype);
FruitNinja.Fruit.prototype.constructor = FruitNinja.Fruit;

FruitNinja.Fruit.prototype.reset = function (position_x, position_y, velocity) {
    "use strict";
    var frame_index;
    FruitNinja.Cuttable.prototype.reset.call(this, position_x, position_y, velocity);
    frame_index = this.game_state.rnd.between(0, this.frames.length - 1);
    this.frame = this.frames[frame_index];
};

FruitNinja.Fruit.prototype.cut = function () {
    "use strict";
    this.game_state.score += this.game_state.cut_multiplier;
    this.kill();
};