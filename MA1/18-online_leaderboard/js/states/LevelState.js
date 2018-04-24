var FruitNinja = FruitNinja || {};

FruitNinja.LevelState = function () {
    "use strict";
    Phaser.State.call(this);
    
    this.prefab_classes = {
        "background": FruitNinja.Prefab.prototype.constructor,
        "score": FruitNinja.Score.prototype.constructor,
        "lives": FruitNinja.Lives.prototype.constructor,
        "fruit_spawner": FruitNinja.FruitSpawner.prototype.constructor,
        "special_fruit_spawner": FruitNinja.SpecialFruitSpawner.prototype.constructor,
        "bomb_spawner": FruitNinja.BombSpawner.prototype.constructor,
        "leaderboard": FruitNinja.Leaderboard.prototype.constructor
    };
};

FruitNinja.LevelState.prototype = Object.create(FruitNinja.JSONLevelState.prototype);
FruitNinja.LevelState.prototype.constructor = FruitNinja.LevelState;

FruitNinja.LevelState.prototype.init = function (level_data) {
    "use strict";
    FruitNinja.JSONLevelState.prototype.init.call(this, level_data);
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000;
    
    this.MINIMUM_SWIPE_LENGTH = 50;
    this.CUT_STYLE = {line_width: 5, color: 0xE82C0C, alpha: 1};
    
    this.score = 0;
    this.cut_multiplier = 1;
};
FruitNinja.LevelState.prototype.create = function () {
    "use strict";
    FruitNinja.JSONLevelState.prototype.create.call(this);
    
    this.game.input.onDown.add(this.start_swipe, this);
    this.game.input.onUp.add(this.end_swipe, this);
    
    this.upgrades = this.game.plugins.add(FruitNinja.Upgrades, this);
    this.upgrades.apply_upgrades(this.game.current_upgrades);
};

FruitNinja.LevelState.prototype.start_swipe = function (pointer) {
    "use strict";
    this.start_swipe_point = new Phaser.Point(pointer.x, pointer.y);
};

FruitNinja.LevelState.prototype.end_swipe = function (pointer) {
    "use strict";
    var swipe_length, cut;
    this.end_swipe_point = new Phaser.Point(pointer.x, pointer.y);
    swipe_length = Phaser.Point.distance(this.end_swipe_point, this.start_swipe_point);
    if (swipe_length >= this.MINIMUM_SWIPE_LENGTH) {
        cut = new FruitNinja.Cut(this, "cut", {x: 0, y: 0}, {group: "cuts", start: this.start_swipe_point, end: this.end_swipe_point, duration: 0.3, style: Object.create(this.CUT_STYLE)});
        
        this.swipe = new Phaser.Line(this.start_swipe_point.x, this.start_swipe_point.y, this.end_swipe_point.x, this.end_swipe_point.y);
        
        this.groups.fruits.forEachAlive(this.check_collision, this);
        this.groups.special_fruits.forEachAlive(this.check_collision, this);
        this.groups.bombs.forEachAlive(this.check_collision, this);
    }
};

FruitNinja.LevelState.prototype.check_collision = function (object) {
    "use strict";
    var object_rectangle, line1, line2, line3, line4, intersection;

    object_rectangle = new Phaser.Rectangle(object.body.x, object.body.y, object.body.width, object.body.height);
    
    line1 = new Phaser.Line(object_rectangle.left, object_rectangle.bottom, object_rectangle.left, object_rectangle.top);
    line2 = new Phaser.Line(object_rectangle.left, object_rectangle.top, object_rectangle.right, object_rectangle.top);
    line3 = new Phaser.Line(object_rectangle.right, object_rectangle.top, object_rectangle.right, object_rectangle.bottom);
    line4 = new Phaser.Line(object_rectangle.right, object_rectangle.bottom, object_rectangle.left, object_rectangle.bottom);
    intersection = this.swipe.intersects(line1) || this.swipe.intersects(line2) || this.swipe.intersects(line3) || this.swipe.intersects(line4);
    if (intersection) {
        object.cut();
    }
};

FruitNinja.LevelState.prototype.game_over = function () {
    "use strict";
    var auth_data;
    this.game.money += this.score;
    this.game.max_score = Math.max(this.game.max_score, this.score);
    auth_data = database.getAuth();
    database.child("players").child(auth_data.uid).set({name: this.game.player_name, money: this.game.money, max_score: this.game.max_score}, this.show_leaderboard.bind(this));
    
    this.game.current_upgrades = [];
};

FruitNinja.LevelState.prototype.show_leaderboard = function () {
    "use strict";
    this.prefabs.leaderboard.show_leaderboard();
};