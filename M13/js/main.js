var PointClk = PointClk || {};

PointClk.game = new Phaser.Game(640, 360, Phaser.AUTO);

PointClk.game.state.add('Boot', PointClk.BootState);
PointClk.game.state.add('Preload', PointClk.PreloadState);
PointClk.game.state.add('Game', PointClk.GameState);

PointClk.game.state.start('Boot');
