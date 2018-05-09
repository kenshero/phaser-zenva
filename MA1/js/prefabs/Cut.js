var FruitNinja = FruitNinja || {};

FruitNinja.Cut = function (game_state, name, position, properties) {
    "use strict";
    Phaser.Graphics.call(this, game_state.game, position.x, position.y);
    
    this.game_state = game_state;
    
    this.name = name;
    
    this.game_state.groups[properties.group].add(this);
    
    this.game_state.prefabs[name] = this;
    
    this.beginFill(properties.style.color);
    this.lineStyle(properties.style.line_width, properties.style.color, properties.style.alpha);
    
    this.moveTo(properties.start.x, properties.start.y);
    this.lineTo(properties.end.x, properties.end.y);
    
    this.kill_timer = this.game_state.time.create();
    this.kill_timer.add(Phaser.Timer.SECOND * properties.duration, this.kill, this);
    this.kill_timer.start();
};

FruitNinja.Cut.prototype = Object.create(Phaser.Graphics.prototype);
FruitNinja.Cut.prototype.constructor = FruitNinja.Cut;

FruitNinja.Cut.prototype.kill = function () {
    "use strict";
    this.clear();
    Phaser.Graphics.prototype.kill.call(this);
};