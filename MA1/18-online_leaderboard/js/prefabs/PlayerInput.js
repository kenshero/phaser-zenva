var FruitNinja = FruitNinja || {};

FruitNinja.PlayerInput = function (game_state, name, position, properties) {
    "use strict";
    FruitNinja.Prefab.call(this, game_state, name, position, properties);
    
    this.inputEnabled = true;
    this.events.onInputDown.add(this.select, this);
    
    this.player_input = new FruitNinja.TextPrefab(this.game_state, this.name + "_input", Object.create(this.position), properties.text_properties);
    this.game_state.groups.hud.add(this.player_input);
};

FruitNinja.PlayerInput.prototype = Object.create(FruitNinja.Prefab.prototype);
FruitNinja.PlayerInput.prototype.constructor = FruitNinja.PlayerInput;

FruitNinja.PlayerInput.prototype.select = function () {
    "use strict";
    this.game_state.current_player_input = this.player_input;
};