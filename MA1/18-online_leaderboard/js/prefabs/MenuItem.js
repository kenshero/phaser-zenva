var FruitNinja = FruitNinja || {};

FruitNinja.MenuItem = function (game_state, name, position, properties) {
    "use strict";
    FruitNinja.TextPrefab.call(this, game_state, name, position, properties);
    
    this.anchor.setTo(0.5);
    
    this.on_selection_animation = this.game_state.game.add.tween(this.scale);
    this.on_selection_animation.to({x: 1.5 * this.scale.x, y: 1.5 * this.scale.y}, 500);
    this.on_selection_animation.to({x: this.scale.x, y: this.scale.y}, 500);
    this.on_selection_animation.repeatAll(-1);
};

FruitNinja.MenuItem.prototype = Object.create(FruitNinja.TextPrefab.prototype);
FruitNinja.MenuItem.prototype.constructor = FruitNinja.MenuItem;

FruitNinja.MenuItem.prototype.selection_over = function () {
    "use strict";
    if (this.on_selection_animation.isPaused) {
        this.on_selection_animation.resume();
    } else {
        this.on_selection_animation.start();
    }
};

FruitNinja.MenuItem.prototype.selection_out = function () {
    "use strict";
    this.on_selection_animation.pause();
};

FruitNinja.MenuItem.prototype.select = function () {
    "use strict";
    // the default item does nothing
};