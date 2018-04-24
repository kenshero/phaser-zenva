var FruitNinja = FruitNinja || {};

FruitNinja.LoginState = function () {
    "use strict";
    FruitNinja.JSONLevelState.call(this);
    
    this.prefab_classes = {
        "background": FruitNinja.Prefab.prototype.constructor,
        "title": FruitNinja.TextPrefab.prototype.constructor,
        "player_input": FruitNinja.PlayerInput.prototype.constructor,
        "button": FruitNinja.Button.prototype.constructor
    };
};

FruitNinja.LoginState.prototype = Object.create(FruitNinja.JSONLevelState.prototype);
FruitNinja.LoginState.prototype.constructor = FruitNinja.LoginState;

FruitNinja.LoginState.prototype.create = function () {
    "use strict";
    FruitNinja.JSONLevelState.prototype.create.call(this);
    
    this.game.input.keyboard.addCallbacks(this, null, null, this.save_player_input);
    this.current_player_input = this.prefabs.email_input.player_input;
};

FruitNinja.LoginState.prototype.save_player_input = function (char) {
    "use strict";
    this.current_player_input.text += char;
};

FruitNinja.LoginState.prototype.attempt_login = function () {
    "use strict";
    this.email = this.prefabs.email_input.player_input.text;
    this.password = this.prefabs.password_input.player_input.text;
    database.authWithPassword({email: this.email, password: this.password}, this.on_login.bind(this));
};

FruitNinja.LoginState.prototype.on_login = function (error, auth_data) {
    "use strict";
    if (error) {
        console.log(error);
        console.log(auth_data);
        if (error.code === "INVALID_USER") {
            database.createUser({email: this.email, password: this.password}, this.on_create_user.bind(this));
        }
    } else {
        database.child("players").child(auth_data.uid).once("value", this.save_player_data.bind(this));
    }
};

FruitNinja.LoginState.prototype.on_create_user = function (error, user_data) {
    "use strict";
    if (error) {
        console.log(error);
    } else {
        this.attempt_login(this.email, this.password);
    }
};

FruitNinja.LoginState.prototype.save_player_data = function (snapshot) {
    "use strict";
    var player_data;
    player_data = snapshot.val();
    if (player_data) {
        this.game.player_name = player_data.name;
        this.game.money = player_data.money;
        this.game.max_score = player_data.max_score;
    } else {
        this.game.player_name = this.email.replace(/@.*/, '');
        this.game.money = 0;
        this.game.max_score = 0;
        database.child("players").child(snapshot.key()).set({name: this.game.player_name, money: this.game.money, max_score: this.game.max_score});
    }
    
    this.game.state.start("BootState", true, false, "assets/levels/title_screen.json", "TitleState");
};