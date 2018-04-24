var FruitNinja = FruitNinja || {};

FruitNinja.Button = function (game_state, name, position, properties) {
    "use strict";
    Phaser.Button.call(this, game_state.game, position.x, position.y, properties.texture, game_state[properties.callback], game_state);
    
    this.game_state = game_state;
    
    this.name = name;
    
    this.game_state.groups[properties.group].add(this);
    
    if (properties.anchor) {
        this.anchor.setTo(properties.anchor.x, properties.anchor.y);
    }
    
    this.game_state.prefabs[name] = this;
};

FruitNinja.Button.prototype = Object.create(Phaser.Button.prototype);
FruitNinja.Button.prototype.constructor = FruitNinja.Button;