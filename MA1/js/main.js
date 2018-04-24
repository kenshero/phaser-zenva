var FruitNinja = FruitNinja || {};

// var database = new Firebase("https://crackling-torch-4365.firebaseio.com");

var game = new Phaser.Game("100%", "100%", Phaser.CANVAS);
game.state.add("BootState", new FruitNinja.BootState());
game.state.add("LoadingState", new FruitNinja.LoadingState());
game.state.add("GameState", new FruitNinja.LevelState());
game.state.start("BootState", true, false, "assets/levels/level1.json");