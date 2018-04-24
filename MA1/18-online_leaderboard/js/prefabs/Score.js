var FruitNinja = FruitNinja || {};

FruitNinja.Score = function (game_state, name, position, properties) {
    "use strict";
    FruitNinja.TextPrefab.call(this, game_state, name, position, properties);
};

FruitNinja.Score.prototype = Object.create(FruitNinja.TextPrefab.prototype);
FruitNinja.Score.prototype.constructor = FruitNinja.Score;

FruitNinja.Score.prototype.update = function () {
    "use strict";
    // update the text to show the number of cutted fruits
    this.text = "Fruits: " + this.game_state.score;
};