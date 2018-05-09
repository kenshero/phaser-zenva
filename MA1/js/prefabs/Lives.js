var FruitNinja = FruitNinja || {};

FruitNinja.Lives = function (game_state, name, position, properties) {
    "use strict";
    var live_index, life;
    FruitNinja.Prefab.call(this, game_state, name, position, properties);
    
    this.visible = false;
    
    this.lives = properties.lives;
    this.lives_sprites = [];
    for (live_index = 0; live_index < this.lives; live_index += 1) {
        life = new Phaser.Sprite(this.game_state.game, position.x + (live_index * properties.lives_spacing), position.y, this.texture);
        this.lives_sprites.push(life);
        this.game_state.groups.hud.add(life);
    }
};

FruitNinja.Lives.prototype = Object.create(FruitNinja.Prefab.prototype);
FruitNinja.Lives.prototype.constructor = FruitNinja.Lives;

FruitNinja.Lives.prototype.die = function () {
    "use strict";
    var life;
    this.lives -= 1;
    
    life = this.lives_sprites.pop();
    life.kill();
    
    if (this.lives === 0) {
        this.game_state.game_over();
    }
};