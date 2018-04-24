var FruitNinja = FruitNinja || {};

FruitNinja.StoreState = function () {
    "use strict";
    FruitNinja.JSONLevelState.call(this);
    
    this.prefab_classes = {
        "background": FruitNinja.Prefab.prototype.constructor,
        "title": FruitNinja.TextPrefab.prototype.constructor,
        "money": FruitNinja.Money.prototype.constructor,
        "text": FruitNinja.TextPrefab.prototype.constructor,
        "upgrade_item": FruitNinja.UpgradeItem.prototype.constructor
    };
};

FruitNinja.StoreState.prototype = Object.create(FruitNinja.JSONLevelState.prototype);
FruitNinja.StoreState.prototype.constructor = FruitNinja.StoreState;

FruitNinja.StoreState.prototype.create = function () {
    "use strict";
    var menu_position, menu_items, menu_properties, menu;
    FruitNinja.JSONLevelState.prototype.create.call(this);
    
    // adding menu
    menu_position = new Phaser.Point(0, 0);
    menu_items = [];
    this.groups.menu_items.forEach(function (menu_item) {
        menu_items.push(menu_item);
    }, this);
    menu_properties = {texture: "", group: "background", menu_items: menu_items};
    menu = new FruitNinja.Menu(this, "menu", menu_position, menu_properties);
};

FruitNinja.StoreState.prototype.update = function () {
    "use strict";
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
        game.state.start("BootState", true, false, "assets/levels/title_screen.json", "TitleState");
    }
};