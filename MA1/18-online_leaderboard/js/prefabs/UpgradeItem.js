var FruitNinja = FruitNinja || {};

FruitNinja.UpgradeItem = function (game_state, name, position, properties) {
    "use strict";
    FruitNinja.MenuItem.call(this, game_state, name, position, properties);
    
    this.description = properties.description;
    this.price = properties.price;
    
    this.upgrade_type = properties.upgrade_type;
    this.upgrade_properties = properties.upgrade_properties;
    
    this.selected = false;
};

FruitNinja.UpgradeItem.prototype = Object.create(FruitNinja.MenuItem.prototype);
FruitNinja.UpgradeItem.prototype.constructor = FruitNinja.UpgradeItem;

FruitNinja.UpgradeItem.prototype.selection_over = function () {
    "use strict";
    FruitNinja.MenuItem.prototype.selection_over.call(this);
    this.game_state.prefabs.upgrade_description.text = this.description;
    this.game_state.prefabs.upgrade_price.text = "Price: " + this.price + " points";
};

FruitNinja.UpgradeItem.prototype.selection_out = function () {
    "use strict";
    FruitNinja.MenuItem.prototype.selection_out.call(this);
    this.game_state.prefabs.upgrade_description.text = "";
    this.game_state.prefabs.upgrade_price.text = "";
};

FruitNinja.UpgradeItem.prototype.select = function () {
    "use strict";
    if (!this.selected && this.game_state.game.money >= this.price) {
        this.game_state.game.money -= this.price;
        this.game_state.game.current_upgrades.push({type: this.upgrade_type, properties: this.upgrade_properties});
        this.selected = true;
    }
};