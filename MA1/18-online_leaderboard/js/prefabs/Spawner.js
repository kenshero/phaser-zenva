var FruitNinja = FruitNinja || {};

FruitNinja.Spawner = function (game_state, name, position, properties) {
    "use strict";
    FruitNinja.Prefab.call(this, game_state, name, position, properties);
    
    this.pool = this.game_state.groups[properties.pool];
    
    this.spawn_time = properties.spawn_time;
    
    this.velocity_x = properties.velocity_x;
    this.velocity_y = properties.velocity_y;
    
    this.spawn_timer = this.game_state.time.create();
    this.schedule_spawn();
};

FruitNinja.Spawner.prototype = Object.create(FruitNinja.Prefab.prototype);
FruitNinja.Spawner.prototype.constructor = FruitNinja.Spawner;

FruitNinja.Spawner.prototype.schedule_spawn = function () {
    "use strict";
    var time;
    // add a new spawn event with random time between a range
    time = this.game_state.rnd.between(this.spawn_time.min, this.spawn_time.max);
    this.spawn_timer.add(Phaser.Timer.SECOND * time, this.spawn, this);
    this.spawn_timer.start();
};

FruitNinja.Spawner.prototype.spawn = function () {
    "use strict";
    var object_name, object_position, object, object_velocity;
    // get new random position and velocity
    object_position = new Phaser.Point(this.game_state.rnd.between(0.2 * this.game_state.game.world.width, 0.8 * this.game_state.game.world.width), this.game_state.game.world.height);
    object_velocity = this.object_velocity();
    // get first dead object from the pool
    object = this.pool.getFirstDead();
    if (!object) {
        // if there is no dead object, create a new one
        object_name = "object_" + this.pool.countLiving();
        object = this.create_object(object_name, object_position, object_velocity);
    } else {
        // if there is a dead object, reset it to the new position and velocity
        object.reset(object_position.x, object_position.y, object_velocity);
    }
    
    // schedule next spawn
    this.schedule_spawn();
};

FruitNinja.Spawner.prototype.object_velocity = function () {
    "use strict";
    var velocity_x, velocity_y;
    // generate random velocity inside a range
    velocity_x = this.game_state.rnd.between(this.velocity_x.min, this.velocity_x.max);
    velocity_y = this.game_state.rnd.between(this.velocity_y.min, this.velocity_y.max);
    return new Phaser.Point(velocity_x, velocity_y);
};