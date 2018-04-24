var FruitNinja = FruitNinja || {};

FruitNinja.Money = function (game_state, name, position, properties) {
    "use strict";
    FruitNinja.TextPrefab.call(this, game_state, name, position, properties);
};

FruitNinja.Money.prototype = Object.create(FruitNinja.TextPrefab.prototype);
FruitNinja.Money.prototype.constructor = FruitNinja.Money;

FruitNinja.Money.prototype.update = function () {
    "use strict";
    // update the text to show the number of cutted fruits
    this.text = "Money: " + this.game_state.game.money;
};