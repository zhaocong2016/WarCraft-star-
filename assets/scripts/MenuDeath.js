cc.Class({
    extends: cc.Component,

    properties: {
        scoreFinal:cc.Label,
        scoreDisplay:cc.Label,
    },
    
    init: function(game){
        this.game = game;
    },
    
    hide: function(){
        this.node.setPosition(1000,0);
    },
    
    show: function(){
        this.node.setPosition(0,0);
        this.score();
    },
    
    score: function() {
          this.scoreDisplay.string = this.scoreFinal.string -'Score: ';
    },
    // use this for initialization
    onLoad: function () {
        
    },

    
});
