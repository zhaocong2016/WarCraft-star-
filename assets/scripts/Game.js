cc.Class({
    extends: cc.Component,

    properties: {
        MenuDeath:cc.Node,
        InGameUI:cc.Node,
        Player:cc.Node,
      
    },

    // use this for initialization
    onLoad: function () {

        cc.director.setDisplayStats(true);

        var game = this.node;
        this.In_gameUI = this.InGameUI.getComponent('InGameUI');
        this.In_gameUI.init(game);
        
         
        this.menu_death = this.MenuDeath.getComponent('MenuDeath');
        this.menu_death.init(game);
        
        this.player = this.Player.getComponent('Player');
        this.player.init(game);
        
        
        
        cc.log("onLoad Game complete!");
    },
    
    reStart () {
        cc.director.loadScene('playGame');
        cc.director.resume();
    },
   
    gameOver () {
        this.menu_death.show();
    },
    
});
