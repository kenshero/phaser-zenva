var FruitNinja = FruitNinja || {};

FruitNinja.BootState = function () {
    "use strict";
    Phaser.State.call(this);
};

FruitNinja.prototype = Object.create(Phaser.State.prototype);
FruitNinja.prototype.constructor = FruitNinja.BootState;

FruitNinja.BootState.prototype.init = function (level_file) {
    "use strict";
    this.level_file = level_file;
};

FruitNinja.BootState.prototype.preload = function () {
    "use strict";
    this.load.text("level1", this.level_file);
};

FruitNinja.BootState.prototype.create = function () {
    "use strict";
    var level_text, level_data;
    level_text = this.game.cache.getText("level1");
    level_data = JSON.parse(level_text);
    this.game.state.start("LoadingState", true, false, level_data);
};