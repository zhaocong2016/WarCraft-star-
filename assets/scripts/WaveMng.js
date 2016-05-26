cc.Class({
    extends: cc.Component,

    properties: {
        //StarGroup:cc.Node,
        star0: cc.Prefab ,
        star1: cc.Prefab,
        star2: cc.Prefab,
        star3: cc.Prefab,
        player:cc.Node, 
        score: cc.Label,
        spawnInterval:1,
    },

    // use this for initialization
    onLoad: function () {
        this.Score = 0;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        this.wave();
        //cc.log("onLoad waveMng complete !");
    },
    
    wave () {
       this.schedule(this.spawn,this.spawnInterval);
       //cc.log("wave complete !");
    },
    
    spawn () {
        //this.node.getComponent('PoolMng').init();
        //var obj = this.node.getComponent('PoolMng').requireStar();
        var obj = cc.instantiate(this.star0);
        obj.active =true;
        obj.getComponent('Star').waveMng = this;
        this.node.active = true;
        this.node.addChild(obj);
        //cc.log("spawning !");
        obj.setPosition(this.getNewStarPosition());
        //cc.log("spawn complete !");
    },
    
    getNewStarPosition () {
        //cc.log("getNewStarPosition start !");
        var maxX = this.node.width/2;
        //流星出现在随机的X坐标
        var randX = cc.randomMinus1To1()*maxX;
        var posY = this.node.height*0.5;
        //cc.log("getNewStarPosition complete !");
        return cc.p(randX,posY);
        
    },
    
    updateScoreDisplay () {
        this.Score+=1;
        this.score.string = 'Score: ' + this.Score.toString();  
    },
    
    onDisable: function() {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    }

  
});
