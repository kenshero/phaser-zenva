var FruitNinja = FruitNinja || {};

FruitNinja.FruitSpawner = function (game_state, name, position, properties) {
    "use strict";
    FruitNinja.Spawner.call(this, game_state, name, position, properties);
    
    this.frames = properties.frames;
};

FruitNinja.FruitSpawner.prototype = Object.create(FruitNinja.Spawner.prototype);
FruitNinja.FruitSpawner.prototype.constructor = FruitNinja.FruitSpawner;

FruitNinja.FruitSpawner.prototype.create_object = function (name, position, velocity) {
    "use strict";
    // return new fruit with random frame
    return new FruitNinja.Fruit(this.game_state, name, position, {texture: "fruits_spritesheet", group: "fruits", frames: this.frames, velocity: velocity});
};