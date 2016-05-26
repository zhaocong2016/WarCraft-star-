"use strict";
cc._RFpush(module, 'd4e94rzqGBMOpisbMunyIpS', 'Star');
// scripts\Star.js

//star的X速度和Y速度的比值
var ratio;
var vecX;
var vecY;
var starDied = false;
var juge;
var game = require('Game');
cc.Class({
    'extends': cc.Component,

    properties: {

        speed: 4,

        maxRatio: 4
    },

    /*star:{
        default:null,
        type:cc.Nodes
    },*/
    onLoad: function onLoad() {
        //this.speed = 0;
    },

    //流星的一些初始化
    init: function init() {
        //this.setPosition(this.getNewStarPosition());
    },

    start: function start() {

        var heroPos = this.game.hero.getPosition();

        vecX = this.node.x - heroPos.x;
        vecY = this.node.y - heroPos.y;

        //ratio是矢量，因为vecX,vecY都是矢量
        ratio = vecY / (vecX * 1.0);
        //用于判断ratio的正负号
        juge = ratio / Math.abs(ratio);

        //如果ratio值过大会导致star的速度极快，所以要限制ratio值
        if (Math.abs(ratio) > this.maxRatio) {
            console.log('star\'s speed is too fast ');
            this.speed = cc.random0To1() * 1 + 1;
            ratio = this.maxRatio * juge;
        }
        //console.log("1");
        //cclog("")
    },

    //流星的AI
    starAI: function starAI() {
        console.log('star moving');
        if (vecX >= 0 && vecY >= 0) {
            this.node.x += this.speed * -1;
            this.node.y += this.speed * ratio * -1;
        } else if (vecX >= 0 && vecY < 0) {
            this.node.x += this.speed * -1;
            this.node.y += this.speed * ratio * -1;
        } else if (vecX < 0 && vecY < 0) {
            this.node.x += this.speed;
            this.node.y += this.speed * ratio;
        } else if (vecX < 0 && vecY >= 0) {
            this.node.x += this.speed;
            this.node.y += this.speed * ratio;
        } else {
            this.node.x += this.speed;
            this.node.y += this.speed;
        }
    },

    //流星的状态
    starState: function starState() {
        if (this.node.y < -315) {
            starDied = true;
        } else starDied = false;
    },

    onStarKilled: function onStarKilled() {
        this.node.destroy();
        this.game.spawnNewStar();
        //  cc.pool.putInPool(star);  
    },

    update: function update(dt) {
        //流星的AI
        this.starAI();
        //流星的状态
        this.starState();
        if (starDied == true) {
            this.onStarKilled();
        }
    }

});

cc._RFpop();