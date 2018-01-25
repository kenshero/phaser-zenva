var Achicken = Achicken || {};

Achicken.game = new Phaser.Game(1080, 640, Phaser.AUTO);

Achicken.game.state.add('Boot', Achicken.BootState); 
Achicken.game.state.add('Preload', Achicken.PreloadState); 
Achicken.game.state.add('Game', Achicken.GameState);

Achicken.game.state.start('Boot'); 
