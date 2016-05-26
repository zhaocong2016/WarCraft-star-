
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad: function () {
        
    },
    
    hide: function(){
        this.node.setPosition(2000,0);
    },
    
    show: function(){
        this.node.setPosition(0,0);
    },

    init: function(game){
        this.game = game;
    },
});
