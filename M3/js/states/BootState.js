var BootState = {
  init: function(){
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.scale.pageAlignHorizontally = true
    this.scale.pageAlignVertically = true
  },
  preload: function(){
    this.load.image('bar', 'assets/images/bar.png')
    this.load.image('logo', 'assets/images/logo.png')
  },
  create: function(){
    this.game.stage.backgroundColor = '#ddd'
    this.state.start('PreloadState')
  }
}