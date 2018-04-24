var FruitNinja = FruitNinja || {};

FruitNinja.StartStateItem = function (game_state, name, position, properties) {
    "use strict";
    FruitNinja.MenuItem.call(this, game_state, name, position, properties);
    
    this.level_file = properties.level_file;
    this.state_name = properties.state_name;
};

FruitNinja.StartStateItem.prototype = Object.create(FruitNinja.MenuItem.prototype);
FruitNinja.StartStateItem.prototype.constructor = FruitNinja.StartStateItem;

FruitNinja.StartStateItem.prototype.select = function () {
    "use strict";
    // starts game state
    this.game_state.state.start("BootState", true, false, this.level_file, this.state_name);
};