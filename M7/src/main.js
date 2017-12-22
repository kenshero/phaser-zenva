var ZPlat = ZPlat || {};


ZPlat.game = new Phaser.Game(480, 360, Phaser.AUTO);

ZPlat.game.state.add('Boot', ZPlat.BootState);
ZPlat.game.state.add('Preload', ZPlat.PreloadState);
ZPlat.game.state.add('Game', ZPlat.GameState);

ZPlat.game.state.start('Boot');
