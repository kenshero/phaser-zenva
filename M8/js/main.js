var Veggies = Veggies || {};

Veggies.game = new Phaser.Game(480, 320, Phaser.AUTO);

Veggies.game.state.add('Boot', Veggies.BootState); 
Veggies.game.state.add('Preload', Veggies.PreloadState); 
Veggies.game.state.add('Game', Veggies.GameState);

Veggies.game.state.start('Boot'); 
