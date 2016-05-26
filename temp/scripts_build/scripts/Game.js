"use strict";
cc._RFpush(module, '7b55dBGetRD+aF+TUTJ/+F+', 'Game');
// scripts\Game.js


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
        }
    },

    onLoad: function onLoad() {
        //流星的对象池
        /*let initCont = 3;
        for(let i =0;i < initCont; ++i){
            let star = cc.instantiate(this.starPrefab);
            cc.pool.putInPool(star);
        }*/
        this.spawnNewStar();
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

    //流星消失后回收流星对象放入对象池

    update: function update(dt) {
        /*if(this.newStar.starDied == true){
            onStarKilled(newStar);
            this.spawnNewStar();
            this.newStar.starDied == false;
        }*/
    }
});

cc._RFpop();