var FruitNinja = FruitNinja || {};

FruitNinja.Lives = function (game_state, name, position, properties) {
    "use strict";
    var live_index, life;
    FruitNinja.Prefab.call(this, game_state, name, position, properties);
    
    this.visible = false;
    
    this.lives_spacing = properties.lives_spacing;
    
    this.lives = properties.lives;
    this.lives_sprites = [];
    // create a sprite for each life
    this.add_lives(this.lives);
};

FruitNinja.Lives.prototype = Object.create(FruitNinja.Prefab.prototype);
FruitNinja.Lives.prototype.constructor = FruitNinja.Lives;

FruitNinja.Lives.prototype.die = function () {
    "use strict";
    var life;
    this.lives -= 1;
    // kill the last life
    life = this.lives_sprites.pop();
    life.kill();
    // if there are no more lives, it's game over
    if (this.lives === 0) {
        this.game_state.game_over();
    }
};

FruitNinja.Lives.prototype.add_lives = function (number_of_lives) {
    "use strict";
    var life_index, life;
    for (life_index = 0; life_index < number_of_lives; life_index += 1) {
        life = new Phaser.Sprite(this.game_state.game, this.position.x + ((this.lives_sprites.length - 1) * this.lives_spacing), this.position.y, this.texture);
        this.lives_sprites.push(life);
        this.game_state.groups.hud.add(life);
    }
};