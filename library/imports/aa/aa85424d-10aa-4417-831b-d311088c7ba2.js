cc.Class({
    'extends': cc.Component,

    properties: {
        starPrefab: {
            'default': null,
            type: cc.Prefab
        },
        hero: {
            'default': null,
            type: cc.Node
        },
        //得分Label 的引用
        scoreDisplay: {
            'default': null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        //流星的对象池
        /*let initCont = 3;
        for(let i =0;i < initCont; ++i){
            let star = cc.instantiate(this.starPrefab);
            cc.pool.putInPool(star);
        }*/
        //this.schedule(this.spawnNewStar,,2);
        //this.spawnNewStar();

        //初始化得分
        this.score = 0;
    },

    //实例流星对象
    spawnNewStar: function spawnNewStar() {
        //let newStar = null;
        /*if(cc.pool.hasObject(cc.Node)){
            newStar = cc.pool.getFromPool(cc.Node);
        }
        else{
            newStar = cc.instantiate(this.starPrefab);
        }*/
        //newStar.getComponent('Star').init();
        var newStar = cc.instantiate(this.starPrefab);
        newStar.getComponent('Star').game = this;
        this.node.addChild(newStar);
        newStar.setPosition(this.getNewStarPosition());
    },

    //创建流星
    getNewStarPosition: function getNewStarPosition() {
        var maxX = this.node.width / 2;
        //流星出现在随机的X坐标
        var randX = cc.randomMinus1To1() * maxX;
        var posY = this.node.height * 0.5;
        return cc.p(randX, posY);
    },

    update: function update(dt) {
        /*if(this.newStar.starDied == true){
            onStarKilled(newStar);
            this.spawnNewStar();
            this.newStar.starDied == false;
        }*/
    },

    //刷新得分
    gainScore: function gainScore() {
        this.score += 1;
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
    },

    //游戏结束
    gameOver: function gameOver() {
        cc.game.pause();
    }

});