var FruitNinja = FruitNinja || {};

FruitNinja.BombSpawner = function (game_state, name, position, properties) {
    "use strict";
    FruitNinja.Spawner.call(this, game_state, name, position, properties);
};

FruitNinja.BombSpawner.prototype = Object.create(FruitNinja.Spawner.prototype);
FruitNinja.BombSpawner.prototype.constructor = FruitNinja.BombSpawner;

FruitNinja.BombSpawner.prototype.create_object = function (name, position, velocity) {
    "use strict";
    // return new bomb
    return new FruitNinja.Bomb(this.game_state, name, position, {texture: "bomb_image", group: "bombs", velocity: velocity});
};