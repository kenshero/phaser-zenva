var FruitNinja = FruitNinja || {};

FruitNinja.Leaderboard = function (game_state, name, position, properties) {
    "use strict";
    var score_index, score_position, score;
    FruitNinja.Prefab.call(this, game_state, name, position, properties);
    
    this.number_of_scores = properties.number_of_scores;
    this.scores_spacing = properties.scores_spacing;
    this.text_properties = properties.text_properties;
    
    this.scores = [];    
};

FruitNinja.Leaderboard.prototype = Object.create(FruitNinja.Prefab.prototype);
FruitNinja.Leaderboard.prototype.constructor = FruitNinja.Leaderboard;

FruitNinja.Leaderboard.prototype.show_leaderboard = function () {
    "use strict";

    database.child("players").orderByChild("max_score").limitToLast(this.number_of_scores).on("child_added", this.update_leaderboard.bind(this));
    
    this.game_state.game.input.keyboard.addCallbacks(this, this.process_keyboard, null, null);
};

FruitNinja.Leaderboard.prototype.update_leaderboard = function (snapshot) {
    "use strict";
    var player_data, score_position, score;
    player_data = snapshot.val();
    score_position = new Phaser.Point(this.position.x, this.position.y + (this.scores.length * this.scores_spacing));
    score = new FruitNinja.TextPrefab(this.game_state, "score" + this.scores.length, score_position, this.text_properties);
    this.game_state.groups.hud.add(score);
    score.text = player_data.name + ": " + player_data.max_score;
    this.scores.push(score);
};

FruitNinja.Leaderboard.prototype.process_keyboard = function (event) {
    "use strict";
    if (event.keyCode === Phaser.Keyboard.ESC) {
        game.state.start("BootState", true, false, "assets/levels/title_screen.json", "TitleState");
    }
};