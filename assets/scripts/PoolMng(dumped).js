const NodePool = require ('NodePool');
cc.Class({
    extends: cc.Component,

    properties: {
        starPools:{
            default: [],
            type:NodePool
        },
    },

    // use this for initialization
    onLoad: function () {

    },

    init () {
        for(let i =0; i < this.starPools.length; ++i){
            this.starPools[i].init();
        }
    },
    
    requireStar () {
        let thePool = this.starPools;
        if(thePool.index >= 0 ){
            thePool.request();
        } else {
            return null;
        }
    },
    
    returnStar (obj) {
        let thePool = this.starPools;
        if(thePool.index < thePool.size ){
            thePool.return(obj);
        } else {
            cc.log('Return obj to a full pool, something has gone wrong');
            return null;
        }
    },
});
