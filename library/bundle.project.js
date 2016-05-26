require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"GameLogic(dumped)":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'aa854JNEKpEF4Mb0xEIjHui', 'GameLogic(dumped)');
// scripts\GameLogic(dumped).js

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

cc._RFpop();
},{}],"Game":[function(require,module,exports){
"use strict";
cc._RFpush(module, '9f7f8EwOktGibZxj87bqJd5', 'Game');
// scripts\Game.js

cc.Class({
    'extends': cc.Component,

    properties: {
        MenuDeath: cc.Node,
        InGameUI: cc.Node,
        Player: cc.Node

    },

    // use this for initialization
    onLoad: function onLoad() {

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

    reStart: function reStart() {
        cc.director.loadScene('playGame');
        cc.director.resume();
    },

    gameOver: function gameOver() {
        this.menu_death.show();
    }

});

cc._RFpop();
},{}],"InGameUI":[function(require,module,exports){
"use strict";
cc._RFpush(module, '7b55dBGetRD+aF+TUTJ/+F+', 'InGameUI');
// scripts\InGameUI.js


cc.Class({
    "extends": cc.Component,

    properties: {},

    onLoad: function onLoad() {},

    hide: function hide() {
        this.node.setPosition(2000, 0);
    },

    show: function show() {
        this.node.setPosition(0, 0);
    },

    init: function init(game) {
        this.game = game;
    }
});

cc._RFpop();
},{}],"MenuDeath":[function(require,module,exports){
"use strict";
cc._RFpush(module, '9d05dIryfRGUq1GGJ+r+ijJ', 'MenuDeath');
// scripts\MenuDeath.js

cc.Class({
    'extends': cc.Component,

    properties: {
        scoreFinal: cc.Label,
        scoreDisplay: cc.Label
    },

    init: function init(game) {
        this.game = game;
    },

    hide: function hide() {
        this.node.setPosition(1000, 0);
    },

    show: function show() {
        this.node.setPosition(0, 0);
        this.score();
    },

    score: function score() {
        this.scoreDisplay.string = this.scoreFinal.string - 'Score: ';
    },
    // use this for initialization
    onLoad: function onLoad() {}

});

cc._RFpop();
},{}],"NodePool":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'bc502Bj7g5NT7Xw2DkBO1Io', 'NodePool');
// scripts\NodePool.js

var NodePool = cc.Class({
    name: 'NodePool',
    properties: {
        prefab: cc.Prefab,
        size: 0
    },

    ctor: function ctor() {
        this.index = 0;
        this.initList = [];
        this.list = [];
    },

    init: function init() {
        for (var i = 0; i < this.size; ++i) {
            var obj = cc.instantiate(this.prefab);
            this.initList[i] = obj;
            this.list[i] = obj;
        }
        this.index = this.size - 1;
    },

    reset: function reset() {
        for (var i = 0; i < this.size; ++i) {
            var obj = this.initList[i];
            this.list[i] = obj;
            if (obj.active) {
                obj.active = false;
            }
            if (obj.parent) {
                obj.removeFromParent();
            }
        }
        this.index = this.size - 1;
    },

    request: function request() {
        if (this.index < 0) {
            cc.log("Error: the pool do not have enough free item.");
            return null;
        }
        var obj = this.list[this.index];
        if (obj) {
            obj.active = true;
        }
        --this.index;
        return obj;
    },

    "return": function _return(obj) {
        ++this.index;
        obj.active = false;
        if (obj.parent) {
            obj.removeFromParent();
        }
        this.list[this.index] = obj;
    }

});

module.exports = NodePool;

cc._RFpop();
},{}],"Player":[function(require,module,exports){
"use strict";
cc._RFpush(module, '7bc1eF1hKtLX4gGqJRJdGfq', 'Player');
// scripts\Player.js

var Direction = cc.Enum({
    NONE: 0,
    LEFT: 1,
    RIGHT: 2
});
var moveDirection = Direction.NONE;
var game;
cc.Class({
    'extends': cc.Component,

    properties: {

        //最大速度
        maxMoveSpeed: 10,
        //加速度
        accel: 0,
        //动画
        animate: cc.Animation,
        //阻力
        drag: 0,
        //重力
        gravity: 0,
        //起跳初速度
        jumpVelocity: 0

    },

    init: function init(game) {
        this.game = game;
    },

    // use this for initialization
    onLoad: function onLoad() {
        //console.log("onLoad player");
        //初始速度为0
        this.xspeed = 0;
        this.yspeed = 0;
        this.jumping = false;

        //键盘输入，后续会改为重力感应（左右方向）
        this.setInputControl();

        //激活节点（激活碰撞检测）
        //this.node.active = true;
    },

    //键盘输入，后续会改为重力感应（左右方向）
    setInputControl: function setInputControl() {

        cc.inputManager.setAccelerometerEnabled(true);
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            //键盘回调函数
            onKeyPressed: function onKeyPressed(keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.d:
                    case cc.KEY.right:
                        //事件回调
                        self.turnRigth();
                        break;
                    case cc.KEY.a:
                    case cc.KEY.left:
                        self.turnLeft();
                        break;
                    case cc.KEY.w:
                    case cc.KEY.up:
                        if (!self.jumping) {
                            self.jumping = true;
                            self.jump();
                        }
                        break;
                    default:
                        moveDirection = Direction.NONE;
                        break;
                }
            },
            onKeyReleased: function onKeyReleased(keyCode, event) {
                if (keyCode == cc.KEY.right || keyCode == cc.KEY.d) {
                    moveDirection = Direction.NONE;
                } else if (keyCode == cc.KEY.left || keyCode == cc.KEY.a) {
                    moveDirection = Direction.NONE;
                }
            }
        }, self.node);
    },

    //跳跃
    jump: function jump() {
        this.yspeed = this.jumpVelocity;
        cc.log('jumping');
    },

    //键盘回调函数
    turnLeft: function turnLeft() {
        //播放奔跑动画
        this.animate.play('hero-run');
        //修改运动方向
        this.node.scaleX = 1;
        //设置moveDirection变量
        moveDirection = Direction.LEFT;
    },
    turnRigth: function turnRigth() {
        this.animate.play('hero-run');
        this.node.scaleX = -1;
        moveDirection = Direction.RIGHT;
    },

    //碰撞检测
    // onCollisionEnter: function() {
    //cc.director.pause();
    //this.game.getComponent('Game').gameOver();
    //},

    update: function update(dt) {

        //向右运动
        if (moveDirection == Direction.RIGHT) {
            //console.log('turn right');
            //初速度大小增加
            this.xspeed += this.accel * dt;
        }
        //向左运动
        else if (moveDirection == Direction.LEFT) {
                //console.log('turn left');
                this.xspeed -= this.accel * dt;
            }
            //阻力作用
            else {
                    if (this.xspeed > 0) {
                        this.xspeed -= this.drag * dt;
                        if (this.xspeed <= 0) {
                            this.xspeed = 0;
                            this.animate.pause('hero-run');
                        }
                    } else {
                        this.xspeed += this.drag * dt;
                        if (this.xspeed >= 0) {
                            this.xspeed = 0;
                            this.animate.pause('hero-run');
                        }
                    }
                }

        //跳跃
        if (this.jumping) {
            this.yspeed -= this.gravity * dt;
        }

        //如果xSpeed超过最大速度，则设置为最大速度
        if (Math.abs(this.xspeed) > this.maxMoveSpeed) {
            //console.log('max speed!')
            //速度是矢量，所以要判断正负
            this.xspeed = this.maxMoveSpeed * Math.abs(this.xspeed) / this.xspeed;
        }

        //更新Hero的位置(在屏幕范围内)
        this.node.x += this.xspeed * dt;
        if (this.jumping) {
            this.node.y += this.yspeed * dt;
            if (this.node.getPositionY() < -283) {
                this.yspeed = 0;
                this.node.setPositionY(-282);
                this.jumping = false;
            }
        }

        //检测是否有初速度
        if (this.xspeed != 0)
            //console.log('moving!')

            //如果超过屏幕边界     
            if (this.node.x > 545) {
                //控制台信息
                //console.log('over the line(right)');
                //停止奔跑动画
                //this.animate.pause('hero-run');
                //重定位位置
                this.node.x = -541;
                //重设初速度为0
                //this.xspeed = 0;
            } else if (this.node.x < -541) {
                    //console.log('over the line(left)');
                    //this.animate.pause('hero-run');
                    this.node.x = 545;
                    //this.xspeed = 0;
                }
    }

});

cc._RFpop();
},{}],"PoolMng(dumped)":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'aebb3oiz2tCko9Ph1G8yrSr', 'PoolMng(dumped)');
// scripts\PoolMng(dumped).js

var NodePool = require('NodePool');
cc.Class({
    'extends': cc.Component,

    properties: {
        starPools: {
            'default': [],
            type: NodePool
        }
    },

    // use this for initialization
    onLoad: function onLoad() {},

    init: function init() {
        for (var i = 0; i < this.starPools.length; ++i) {
            this.starPools[i].init();
        }
    },

    requireStar: function requireStar() {
        var thePool = this.starPools;
        if (thePool.index >= 0) {
            thePool.request();
        } else {
            return null;
        }
    },

    returnStar: function returnStar(obj) {
        var thePool = this.starPools;
        if (thePool.index < thePool.size) {
            thePool['return'](obj);
        } else {
            cc.log('Return obj to a full pool, something has gone wrong');
            return null;
        }
    }
});

cc._RFpop();
},{"NodePool":"NodePool"}],"Star":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'd4e94rzqGBMOpisbMunyIpS', 'Star');
// scripts\Star.js

//star的X速度和Y速度的比值
var ratio_bule;
var ratio_red;
var ratio_white;

var vecX_white;
var vecY_white;

var vecX_bule;
var vecY_bule;

var vecX_red;
var vecY_red;

var starDied = false;
var juge;
var waveMng;
var starType = cc.Enum({
    WHITE: -1,
    BULE: -1,
    RED: -1,
    PURPLE: -1
});
cc.Class({
    'extends': cc.Component,

    properties: {

        speed: 4,

        maxRatio: 4,

        starType: {
            'default': starType.WHITE,
            type: starType
        }

    },

    onLoad: function onLoad() {},

    onCollisionEnter: function onCollisionEnter(other, self) {
        console.log('collision!');

        //如果红色流星与墙碰撞则会反弹
        if (other.node.group == 'wall') {
            if (this.starType == starType.RED) {
                //X方向速度取反以此反弹
                this.vecX_red *= -1;
            }
        } else {
            this.onStarKilled();
        }
    },

    //流星的一些初始化
    init: function init(WaveMng) {
        //waveMng = WaveMng;
    },

    start: function start() {

        //WHITE
        if (this.starType == starType.WHITE) {
            //屏幕内X坐标的随机值
            this.randomX = cc.director.getVisibleSize.x * -0.5 * cc.random0To1();

            vecX_white = this.node.x - this.randomX;
            vecY_white = this.node.y - cc.director.getVisibleSize.y * -0.5;

            ratio_white = vecY_white / vecX_white * 1.0;

            juge = ratio_white / Math.abs(ratio_white);

            if (Math.abs(ratio_white) > this.maxRatio) {
                //console.log('star\'s speed is too fast ');
                this.speed = cc.random0To1() * 1 + 1;

                ratio_white = this.maxRatio * juge;
            }
        }

        //BULE
        if (this.starType == starType.BULE) {

            var heroPos = this.waveMng.player.getPosition();

            vecX_bule = this.node.x - heroPos.x;
            vecy_bule = this.node.y - heroPos.y;

            //ratio是矢量，因为vecX,vecY都是矢量
            ratio_bule = vecy_bule / (vecX_bule * 1.0);
            //用于判断ratio的正负号
            juge = ratio_bule / Math.abs(ratio_bule);

            //如果ratio值过大会导致star的速度极快，所以要限制ratio值
            if (Math.abs(ratio_bule) > this.maxRatio) {
                //console.log('star\'s speed is too fast ');
                this.speed = cc.random0To1() * 1 + 1;
                ratio_bule = this.maxRatio * juge;
            }
        }

        //RED
        if (this.starType == starType.RED) {
            //屏幕外X坐标的随机值
            this.randomX_0 = cc.director.getVisibleSize.x * -1 * 0.5 * cc.random0To1() + 200; //左
            this.randomX_1 = cc.director.getVisibleSize.x * 0.5 * cc.random0To1() + cc.director.getVisibleSize.x; //右

            //random用来随机流星方向
            var random = cc.random0To1();

            if (random > 0.5) {
                vecX_red = this.node.x - this.randomX_0;
            } else {
                vecX_red = this.node.x - this.randomX_1;
            }
            vecY_red = this.node.y - cc.director.getVisibleSize.y * -0.5;

            ratio_red = vecY_red / (vecX_red * 1.0);
        }

        //PURPLE
        if (this.starType == starType.PURPLE) {}
    },

    //流星的AI
    starAI: function starAI() {
        //white
        if (this.starType == starType.WHITE) {
            if (vecX_white >= 0 && vecY_white >= 0) {
                this.node.x += this.speed * -1;
                this.node.y += this.speed * ratio_white * -1;
            } else if (vecX_white >= 0 && vecY_white < 0) {
                this.node.x += this.speed * -1;
                this.node.y += this.speed * ratio_white * -1;
            } else if (vecX_white < 0 && vecY_white < 0) {
                this.node.x += this.speed;
                this.node.y += this.speed * ratio_white;
            } else if (vecX_white < 0 && vecY_white >= 0) {
                this.node.x += this.speed;
                this.node.y += this.speed * ratio_white;
            } else {
                this.node.x += this.speed;
                this.node.y += this.speed;
            }
        }
        //bule
        else if (this.starType == starType.BULE) {
                if (vecX_bule >= 0 && vecY_bule >= 0) {
                    this.node.x += this.speed * -1;
                    this.node.y += this.speed * ratio_bule * -1;
                } else if (vecX_bule >= 0 && vecY_bule < 0) {
                    this.node.x += this.speed * -1;
                    this.node.y += this.speed * ratio_bule * -1;
                } else if (vecX_bule < 0 && vecY_bule < 0) {
                    this.node.x += this.speed;
                    this.node.y += this.speed * ratio_bule;
                } else if (vecX_bule < 0 && vecY_bule >= 0) {
                    this.node.x += this.speed;
                    this.node.y += this.speed * ratio_bule;
                } else {
                    this.node.x += this.speed;
                    this.node.y += this.speed;
                }
            }
            //red
            else if (this.starType == RED) {
                    if (vecX_bule >= 0 && vecY_bule >= 0) {
                        this.node.x += this.speed * -1;
                        this.node.y += this.speed * ratio_bule * -1;
                    } else if (vecX_bule >= 0 && vecY_bule < 0) {
                        this.node.x += this.speed * -1;
                        this.node.y += this.speed * ratio_bule * -1;
                    } else if (vecX_bule < 0 && vecY_bule < 0) {
                        this.node.x += this.speed;
                        this.node.y += this.speed * ratio_bule;
                    } else if (vecX_bule < 0 && vecY_bule >= 0) {
                        this.node.x += this.speed;
                        this.node.y += this.speed * ratio_bule;
                    } else {
                        this.node.x += this.speed;
                        this.node.y += this.speed;
                    }
                } else if (this.starType == PURPLE) {}
    },

    //流星的状态
    starState: function starState() {
        if (this.node.y < -315) {
            starDied = true;
            this.onStarKilled();
        } else starDied = false;
    },

    onStarKilled: function onStarKilled() {
        //消除节点
        this.node.destroy();
        //刷新得分
        this.waveMng.updateScoreDisplay();
        cc.log('killed');
    },

    update: function update(dt) {
        //流星的AI
        this.starAI();
        //流星的状态
        //this.starState();
    }

});

cc._RFpop();
},{}],"UpdateScoreDisplay":[function(require,module,exports){
"use strict";
cc._RFpush(module, '407c0u6f0pEm6hv0VDh1MiW', 'UpdateScoreDisplay');
// scripts\UpdateScoreDisplay.js

cc.Class({
    'extends': cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {
        this.score = 0;
    },

    updateScoreDisplay: function updateScoreDisplay() {
        this.node.string = 'String: ' + this.score.toString();
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"WaveMng":[function(require,module,exports){
"use strict";
cc._RFpush(module, '1203bxrexJIYoH8966a4hp8', 'WaveMng');
// scripts\WaveMng.js

cc.Class({
    'extends': cc.Component,

    properties: {
        //StarGroup:cc.Node,
        star0: cc.Prefab,
        star1: cc.Prefab,
        star2: cc.Prefab,
        star3: cc.Prefab,
        player: cc.Node,
        score: cc.Label,
        spawnInterval: 1
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.Score = 0;
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        this.wave();
        //cc.log("onLoad waveMng complete !");
    },

    wave: function wave() {
        this.schedule(this.spawn, this.spawnInterval);
        //cc.log("wave complete !");
    },

    spawn: function spawn() {
        //this.node.getComponent('PoolMng').init();
        //var obj = this.node.getComponent('PoolMng').requireStar();
        var obj = cc.instantiate(this.star0);
        obj.active = true;
        obj.getComponent('Star').waveMng = this;
        this.node.active = true;
        this.node.addChild(obj);
        //cc.log("spawning !");
        obj.setPosition(this.getNewStarPosition());
        //cc.log("spawn complete !");
    },

    getNewStarPosition: function getNewStarPosition() {
        //cc.log("getNewStarPosition start !");
        var maxX = this.node.width / 2;
        //流星出现在随机的X坐标
        var randX = cc.randomMinus1To1() * maxX;
        var posY = this.node.height * 0.5;
        //cc.log("getNewStarPosition complete !");
        return cc.p(randX, posY);
    },

    updateScoreDisplay: function updateScoreDisplay() {
        this.Score += 1;
        this.score.string = 'Score: ' + this.Score.toString();
    },

    onDisable: function onDisable() {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    }

});

cc._RFpop();
},{}]},{},["WaveMng","UpdateScoreDisplay","InGameUI","Player","MenuDeath","Game","GameLogic(dumped)","PoolMng(dumped)","NodePool","Star"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L2Rpc3QvcmVzb3VyY2VzL2FwcC5hc2FyL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvc2NyaXB0cy9HYW1lTG9naWMoZHVtcGVkKS5qcyIsImFzc2V0cy9zY3JpcHRzL0dhbWUuanMiLCJhc3NldHMvc2NyaXB0cy9JbkdhbWVVSS5qcyIsImFzc2V0cy9zY3JpcHRzL01lbnVEZWF0aC5qcyIsImFzc2V0cy9zY3JpcHRzL05vZGVQb29sLmpzIiwiYXNzZXRzL3NjcmlwdHMvUGxheWVyLmpzIiwiYXNzZXRzL3NjcmlwdHMvUG9vbE1uZyhkdW1wZWQpLmpzIiwiYXNzZXRzL3NjcmlwdHMvU3Rhci5qcyIsImFzc2V0cy9zY3JpcHRzL1VwZGF0ZVNjb3JlRGlzcGxheS5qcyIsImFzc2V0cy9zY3JpcHRzL1dhdmVNbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2FhODU0Sk5FS3BFRjRNYjB4RUlqSHVpJywgJ0dhbWVMb2dpYyhkdW1wZWQpJyk7XG4vLyBzY3JpcHRzXFxHYW1lTG9naWMoZHVtcGVkKS5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHN0YXJQcmVmYWI6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuICAgICAgICBoZXJvOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIC8v5b6X5YiGTGFiZWwg55qE5byV55SoXG4gICAgICAgIHNjb3JlRGlzcGxheToge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgLy/mtYHmmJ/nmoTlr7nosaHmsaBcbiAgICAgICAgLypsZXQgaW5pdENvbnQgPSAzO1xyXG4gICAgICAgIGZvcihsZXQgaSA9MDtpIDwgaW5pdENvbnQ7ICsraSl7XHJcbiAgICAgICAgICAgIGxldCBzdGFyID0gY2MuaW5zdGFudGlhdGUodGhpcy5zdGFyUHJlZmFiKTtcclxuICAgICAgICAgICAgY2MucG9vbC5wdXRJblBvb2woc3Rhcik7XHJcbiAgICAgICAgfSovXG4gICAgICAgIC8vdGhpcy5zY2hlZHVsZSh0aGlzLnNwYXduTmV3U3RhciwsMik7XG4gICAgICAgIC8vdGhpcy5zcGF3bk5ld1N0YXIoKTtcblxuICAgICAgICAvL+WIneWni+WMluW+l+WIhlxuICAgICAgICB0aGlzLnNjb3JlID0gMDtcbiAgICB9LFxuXG4gICAgLy/lrp7kvovmtYHmmJ/lr7nosaFcbiAgICBzcGF3bk5ld1N0YXI6IGZ1bmN0aW9uIHNwYXduTmV3U3RhcigpIHtcbiAgICAgICAgLy9sZXQgbmV3U3RhciA9IG51bGw7XG4gICAgICAgIC8qaWYoY2MucG9vbC5oYXNPYmplY3QoY2MuTm9kZSkpe1xyXG4gICAgICAgICAgICBuZXdTdGFyID0gY2MucG9vbC5nZXRGcm9tUG9vbChjYy5Ob2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbmV3U3RhciA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc3RhclByZWZhYik7XHJcbiAgICAgICAgfSovXG4gICAgICAgIC8vbmV3U3Rhci5nZXRDb21wb25lbnQoJ1N0YXInKS5pbml0KCk7XG4gICAgICAgIHZhciBuZXdTdGFyID0gY2MuaW5zdGFudGlhdGUodGhpcy5zdGFyUHJlZmFiKTtcbiAgICAgICAgbmV3U3Rhci5nZXRDb21wb25lbnQoJ1N0YXInKS5nYW1lID0gdGhpcztcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG5ld1N0YXIpO1xuICAgICAgICBuZXdTdGFyLnNldFBvc2l0aW9uKHRoaXMuZ2V0TmV3U3RhclBvc2l0aW9uKCkpO1xuICAgIH0sXG5cbiAgICAvL+WIm+W7uua1geaYn1xuICAgIGdldE5ld1N0YXJQb3NpdGlvbjogZnVuY3Rpb24gZ2V0TmV3U3RhclBvc2l0aW9uKCkge1xuICAgICAgICB2YXIgbWF4WCA9IHRoaXMubm9kZS53aWR0aCAvIDI7XG4gICAgICAgIC8v5rWB5pif5Ye6546w5Zyo6ZqP5py655qEWOWdkOagh1xuICAgICAgICB2YXIgcmFuZFggPSBjYy5yYW5kb21NaW51czFUbzEoKSAqIG1heFg7XG4gICAgICAgIHZhciBwb3NZID0gdGhpcy5ub2RlLmhlaWdodCAqIDAuNTtcbiAgICAgICAgcmV0dXJuIGNjLnAocmFuZFgsIHBvc1kpO1xuICAgIH0sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge1xuICAgICAgICAvKmlmKHRoaXMubmV3U3Rhci5zdGFyRGllZCA9PSB0cnVlKXtcclxuICAgICAgICAgICAgb25TdGFyS2lsbGVkKG5ld1N0YXIpO1xyXG4gICAgICAgICAgICB0aGlzLnNwYXduTmV3U3RhcigpO1xyXG4gICAgICAgICAgICB0aGlzLm5ld1N0YXIuc3RhckRpZWQgPT0gZmFsc2U7XHJcbiAgICAgICAgfSovXG4gICAgfSxcblxuICAgIC8v5Yi35paw5b6X5YiGXG4gICAgZ2FpblNjb3JlOiBmdW5jdGlvbiBnYWluU2NvcmUoKSB7XG4gICAgICAgIHRoaXMuc2NvcmUgKz0gMTtcbiAgICAgICAgdGhpcy5zY29yZURpc3BsYXkuc3RyaW5nID0gJ1Njb3JlOiAnICsgdGhpcy5zY29yZS50b1N0cmluZygpO1xuICAgIH0sXG5cbiAgICAvL+a4uOaIj+e7k+adn1xuICAgIGdhbWVPdmVyOiBmdW5jdGlvbiBnYW1lT3ZlcigpIHtcbiAgICAgICAgY2MuZ2FtZS5wYXVzZSgpO1xuICAgIH1cblxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc5ZjdmOEV3T2t0R2liWnhqODdicUpkNScsICdHYW1lJyk7XG4vLyBzY3JpcHRzXFxHYW1lLmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgTWVudURlYXRoOiBjYy5Ob2RlLFxuICAgICAgICBJbkdhbWVVSTogY2MuTm9kZSxcbiAgICAgICAgUGxheWVyOiBjYy5Ob2RlXG5cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG5cbiAgICAgICAgY2MuZGlyZWN0b3Iuc2V0RGlzcGxheVN0YXRzKHRydWUpO1xuXG4gICAgICAgIHZhciBnYW1lID0gdGhpcy5ub2RlO1xuICAgICAgICB0aGlzLkluX2dhbWVVSSA9IHRoaXMuSW5HYW1lVUkuZ2V0Q29tcG9uZW50KCdJbkdhbWVVSScpO1xuICAgICAgICB0aGlzLkluX2dhbWVVSS5pbml0KGdhbWUpO1xuXG4gICAgICAgIHRoaXMubWVudV9kZWF0aCA9IHRoaXMuTWVudURlYXRoLmdldENvbXBvbmVudCgnTWVudURlYXRoJyk7XG4gICAgICAgIHRoaXMubWVudV9kZWF0aC5pbml0KGdhbWUpO1xuXG4gICAgICAgIHRoaXMucGxheWVyID0gdGhpcy5QbGF5ZXIuZ2V0Q29tcG9uZW50KCdQbGF5ZXInKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIuaW5pdChnYW1lKTtcblxuICAgICAgICBjYy5sb2coXCJvbkxvYWQgR2FtZSBjb21wbGV0ZSFcIik7XG4gICAgfSxcblxuICAgIHJlU3RhcnQ6IGZ1bmN0aW9uIHJlU3RhcnQoKSB7XG4gICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgncGxheUdhbWUnKTtcbiAgICAgICAgY2MuZGlyZWN0b3IucmVzdW1lKCk7XG4gICAgfSxcblxuICAgIGdhbWVPdmVyOiBmdW5jdGlvbiBnYW1lT3ZlcigpIHtcbiAgICAgICAgdGhpcy5tZW51X2RlYXRoLnNob3coKTtcbiAgICB9XG5cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnN2I1NWRCR2V0UkQrYUYrVFVUSi8rRisnLCAnSW5HYW1lVUknKTtcbi8vIHNjcmlwdHNcXEluR2FtZVVJLmpzXG5cblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7fSxcblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge30sXG5cbiAgICBoaWRlOiBmdW5jdGlvbiBoaWRlKCkge1xuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24oMjAwMCwgMCk7XG4gICAgfSxcblxuICAgIHNob3c6IGZ1bmN0aW9uIHNob3coKSB7XG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbigwLCAwKTtcbiAgICB9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdChnYW1lKSB7XG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc5ZDA1ZElyeWZSR1VxMUdHSityK2lqSicsICdNZW51RGVhdGgnKTtcbi8vIHNjcmlwdHNcXE1lbnVEZWF0aC5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHNjb3JlRmluYWw6IGNjLkxhYmVsLFxuICAgICAgICBzY29yZURpc3BsYXk6IGNjLkxhYmVsXG4gICAgfSxcblxuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoZ2FtZSkge1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgIH0sXG5cbiAgICBoaWRlOiBmdW5jdGlvbiBoaWRlKCkge1xuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24oMTAwMCwgMCk7XG4gICAgfSxcblxuICAgIHNob3c6IGZ1bmN0aW9uIHNob3coKSB7XG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbigwLCAwKTtcbiAgICAgICAgdGhpcy5zY29yZSgpO1xuICAgIH0sXG5cbiAgICBzY29yZTogZnVuY3Rpb24gc2NvcmUoKSB7XG4gICAgICAgIHRoaXMuc2NvcmVEaXNwbGF5LnN0cmluZyA9IHRoaXMuc2NvcmVGaW5hbC5zdHJpbmcgLSAnU2NvcmU6ICc7XG4gICAgfSxcbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9XG5cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnYmM1MDJCajdnNU5UN1h3MkRrQk8xSW8nLCAnTm9kZVBvb2wnKTtcbi8vIHNjcmlwdHNcXE5vZGVQb29sLmpzXG5cbnZhciBOb2RlUG9vbCA9IGNjLkNsYXNzKHtcbiAgICBuYW1lOiAnTm9kZVBvb2wnLFxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcHJlZmFiOiBjYy5QcmVmYWIsXG4gICAgICAgIHNpemU6IDBcbiAgICB9LFxuXG4gICAgY3RvcjogZnVuY3Rpb24gY3RvcigpIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IDA7XG4gICAgICAgIHRoaXMuaW5pdExpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5saXN0ID0gW107XG4gICAgfSxcblxuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zaXplOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBvYmogPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYik7XG4gICAgICAgICAgICB0aGlzLmluaXRMaXN0W2ldID0gb2JqO1xuICAgICAgICAgICAgdGhpcy5saXN0W2ldID0gb2JqO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5kZXggPSB0aGlzLnNpemUgLSAxO1xuICAgIH0sXG5cbiAgICByZXNldDogZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zaXplOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBvYmogPSB0aGlzLmluaXRMaXN0W2ldO1xuICAgICAgICAgICAgdGhpcy5saXN0W2ldID0gb2JqO1xuICAgICAgICAgICAgaWYgKG9iai5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICBvYmouYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob2JqLnBhcmVudCkge1xuICAgICAgICAgICAgICAgIG9iai5yZW1vdmVGcm9tUGFyZW50KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMuc2l6ZSAtIDE7XG4gICAgfSxcblxuICAgIHJlcXVlc3Q6IGZ1bmN0aW9uIHJlcXVlc3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmluZGV4IDwgMCkge1xuICAgICAgICAgICAgY2MubG9nKFwiRXJyb3I6IHRoZSBwb29sIGRvIG5vdCBoYXZlIGVub3VnaCBmcmVlIGl0ZW0uXCIpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9iaiA9IHRoaXMubGlzdFt0aGlzLmluZGV4XTtcbiAgICAgICAgaWYgKG9iaikge1xuICAgICAgICAgICAgb2JqLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLS10aGlzLmluZGV4O1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH0sXG5cbiAgICBcInJldHVyblwiOiBmdW5jdGlvbiBfcmV0dXJuKG9iaikge1xuICAgICAgICArK3RoaXMuaW5kZXg7XG4gICAgICAgIG9iai5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgaWYgKG9iai5wYXJlbnQpIHtcbiAgICAgICAgICAgIG9iai5yZW1vdmVGcm9tUGFyZW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5saXN0W3RoaXMuaW5kZXhdID0gb2JqO1xuICAgIH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gTm9kZVBvb2w7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc3YmMxZUYxaEt0TFg0Z0dxSlJKZEdmcScsICdQbGF5ZXInKTtcbi8vIHNjcmlwdHNcXFBsYXllci5qc1xuXG52YXIgRGlyZWN0aW9uID0gY2MuRW51bSh7XG4gICAgTk9ORTogMCxcbiAgICBMRUZUOiAxLFxuICAgIFJJR0hUOiAyXG59KTtcbnZhciBtb3ZlRGlyZWN0aW9uID0gRGlyZWN0aW9uLk5PTkU7XG52YXIgZ2FtZTtcbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcblxuICAgICAgICAvL+acgOWkp+mAn+W6plxuICAgICAgICBtYXhNb3ZlU3BlZWQ6IDEwLFxuICAgICAgICAvL+WKoOmAn+W6plxuICAgICAgICBhY2NlbDogMCxcbiAgICAgICAgLy/liqjnlLtcbiAgICAgICAgYW5pbWF0ZTogY2MuQW5pbWF0aW9uLFxuICAgICAgICAvL+mYu+WKm1xuICAgICAgICBkcmFnOiAwLFxuICAgICAgICAvL+mHjeWKm1xuICAgICAgICBncmF2aXR5OiAwLFxuICAgICAgICAvL+i1t+i3s+WInemAn+W6plxuICAgICAgICBqdW1wVmVsb2NpdHk6IDBcblxuICAgIH0sXG5cbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KGdhbWUpIHtcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJvbkxvYWQgcGxheWVyXCIpO1xuICAgICAgICAvL+WIneWni+mAn+W6puS4ujBcbiAgICAgICAgdGhpcy54c3BlZWQgPSAwO1xuICAgICAgICB0aGlzLnlzcGVlZCA9IDA7XG4gICAgICAgIHRoaXMuanVtcGluZyA9IGZhbHNlO1xuXG4gICAgICAgIC8v6ZSu55uY6L6T5YWl77yM5ZCO57ut5Lya5pS55Li66YeN5Yqb5oSf5bqU77yI5bem5Y+z5pa55ZCR77yJXG4gICAgICAgIHRoaXMuc2V0SW5wdXRDb250cm9sKCk7XG5cbiAgICAgICAgLy/mv4DmtLvoioLngrnvvIjmv4DmtLvnorDmkp7mo4DmtYvvvIlcbiAgICAgICAgLy90aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICB9LFxuXG4gICAgLy/plK7nm5jovpPlhaXvvIzlkI7nu63kvJrmlLnkuLrph43lipvmhJ/lupTvvIjlt6blj7PmlrnlkJHvvIlcbiAgICBzZXRJbnB1dENvbnRyb2w6IGZ1bmN0aW9uIHNldElucHV0Q29udHJvbCgpIHtcblxuICAgICAgICBjYy5pbnB1dE1hbmFnZXIuc2V0QWNjZWxlcm9tZXRlckVuYWJsZWQodHJ1ZSk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLmFkZExpc3RlbmVyKHtcbiAgICAgICAgICAgIGV2ZW50OiBjYy5FdmVudExpc3RlbmVyLktFWUJPQVJELFxuICAgICAgICAgICAgLy/plK7nm5jlm57osIPlh73mlbBcbiAgICAgICAgICAgIG9uS2V5UHJlc3NlZDogZnVuY3Rpb24gb25LZXlQcmVzc2VkKGtleUNvZGUsIGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChrZXlDb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuS0VZLmQ6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuS0VZLnJpZ2h0OlxuICAgICAgICAgICAgICAgICAgICAgICAgLy/kuovku7blm57osINcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudHVyblJpZ3RoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5LRVkuYTpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5LRVkubGVmdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudHVybkxlZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLktFWS53OlxuICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLktFWS51cDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2VsZi5qdW1waW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5qdW1waW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmp1bXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgbW92ZURpcmVjdGlvbiA9IERpcmVjdGlvbi5OT05FO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uS2V5UmVsZWFzZWQ6IGZ1bmN0aW9uIG9uS2V5UmVsZWFzZWQoa2V5Q29kZSwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5Q29kZSA9PSBjYy5LRVkucmlnaHQgfHwga2V5Q29kZSA9PSBjYy5LRVkuZCkge1xuICAgICAgICAgICAgICAgICAgICBtb3ZlRGlyZWN0aW9uID0gRGlyZWN0aW9uLk5PTkU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChrZXlDb2RlID09IGNjLktFWS5sZWZ0IHx8IGtleUNvZGUgPT0gY2MuS0VZLmEpIHtcbiAgICAgICAgICAgICAgICAgICAgbW92ZURpcmVjdGlvbiA9IERpcmVjdGlvbi5OT05FO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgc2VsZi5ub2RlKTtcbiAgICB9LFxuXG4gICAgLy/ot7Pot4NcbiAgICBqdW1wOiBmdW5jdGlvbiBqdW1wKCkge1xuICAgICAgICB0aGlzLnlzcGVlZCA9IHRoaXMuanVtcFZlbG9jaXR5O1xuICAgICAgICBjYy5sb2coJ2p1bXBpbmcnKTtcbiAgICB9LFxuXG4gICAgLy/plK7nm5jlm57osIPlh73mlbBcbiAgICB0dXJuTGVmdDogZnVuY3Rpb24gdHVybkxlZnQoKSB7XG4gICAgICAgIC8v5pKt5pS+5aWU6LeR5Yqo55S7XG4gICAgICAgIHRoaXMuYW5pbWF0ZS5wbGF5KCdoZXJvLXJ1bicpO1xuICAgICAgICAvL+S/ruaUuei/kOWKqOaWueWQkVxuICAgICAgICB0aGlzLm5vZGUuc2NhbGVYID0gMTtcbiAgICAgICAgLy/orr7nva5tb3ZlRGlyZWN0aW9u5Y+Y6YePXG4gICAgICAgIG1vdmVEaXJlY3Rpb24gPSBEaXJlY3Rpb24uTEVGVDtcbiAgICB9LFxuICAgIHR1cm5SaWd0aDogZnVuY3Rpb24gdHVyblJpZ3RoKCkge1xuICAgICAgICB0aGlzLmFuaW1hdGUucGxheSgnaGVyby1ydW4nKTtcbiAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IC0xO1xuICAgICAgICBtb3ZlRGlyZWN0aW9uID0gRGlyZWN0aW9uLlJJR0hUO1xuICAgIH0sXG5cbiAgICAvL+eisOaSnuajgOa1i1xuICAgIC8vIG9uQ29sbGlzaW9uRW50ZXI6IGZ1bmN0aW9uKCkge1xuICAgIC8vY2MuZGlyZWN0b3IucGF1c2UoKTtcbiAgICAvL3RoaXMuZ2FtZS5nZXRDb21wb25lbnQoJ0dhbWUnKS5nYW1lT3ZlcigpO1xuICAgIC8vfSxcblxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7XG5cbiAgICAgICAgLy/lkJHlj7Pov5DliqhcbiAgICAgICAgaWYgKG1vdmVEaXJlY3Rpb24gPT0gRGlyZWN0aW9uLlJJR0hUKSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCd0dXJuIHJpZ2h0Jyk7XG4gICAgICAgICAgICAvL+WInemAn+W6puWkp+Wwj+WinuWKoFxuICAgICAgICAgICAgdGhpcy54c3BlZWQgKz0gdGhpcy5hY2NlbCAqIGR0O1xuICAgICAgICB9XG4gICAgICAgIC8v5ZCR5bem6L+Q5YqoXG4gICAgICAgIGVsc2UgaWYgKG1vdmVEaXJlY3Rpb24gPT0gRGlyZWN0aW9uLkxFRlQpIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCd0dXJuIGxlZnQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnhzcGVlZCAtPSB0aGlzLmFjY2VsICogZHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL+mYu+WKm+S9nOeUqFxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnhzcGVlZCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueHNwZWVkIC09IHRoaXMuZHJhZyAqIGR0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMueHNwZWVkIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnhzcGVlZCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlLnBhdXNlKCdoZXJvLXJ1bicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy54c3BlZWQgKz0gdGhpcy5kcmFnICogZHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy54c3BlZWQgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMueHNwZWVkID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGUucGF1c2UoJ2hlcm8tcnVuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgLy/ot7Pot4NcbiAgICAgICAgaWYgKHRoaXMuanVtcGluZykge1xuICAgICAgICAgICAgdGhpcy55c3BlZWQgLT0gdGhpcy5ncmF2aXR5ICogZHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvL+WmguaenHhTcGVlZOi2hei/h+acgOWkp+mAn+W6pu+8jOWImeiuvue9ruS4uuacgOWkp+mAn+W6plxuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy54c3BlZWQpID4gdGhpcy5tYXhNb3ZlU3BlZWQpIHtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ21heCBzcGVlZCEnKVxuICAgICAgICAgICAgLy/pgJ/luqbmmK/nn6Lph4/vvIzmiYDku6XopoHliKTmlq3mraPotJ9cbiAgICAgICAgICAgIHRoaXMueHNwZWVkID0gdGhpcy5tYXhNb3ZlU3BlZWQgKiBNYXRoLmFicyh0aGlzLnhzcGVlZCkgLyB0aGlzLnhzcGVlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8v5pu05pawSGVyb+eahOS9jee9rijlnKjlsY/luZXojIPlm7TlhoUpXG4gICAgICAgIHRoaXMubm9kZS54ICs9IHRoaXMueHNwZWVkICogZHQ7XG4gICAgICAgIGlmICh0aGlzLmp1bXBpbmcpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS55ICs9IHRoaXMueXNwZWVkICogZHQ7XG4gICAgICAgICAgICBpZiAodGhpcy5ub2RlLmdldFBvc2l0aW9uWSgpIDwgLTI4Mykge1xuICAgICAgICAgICAgICAgIHRoaXMueXNwZWVkID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb25ZKC0yODIpO1xuICAgICAgICAgICAgICAgIHRoaXMuanVtcGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy/mo4DmtYvmmK/lkKbmnInliJ3pgJ/luqZcbiAgICAgICAgaWYgKHRoaXMueHNwZWVkICE9IDApXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdtb3ZpbmchJylcblxuICAgICAgICAgICAgLy/lpoLmnpzotoXov4flsY/luZXovrnnlYwgICAgIFxuICAgICAgICAgICAgaWYgKHRoaXMubm9kZS54ID4gNTQ1KSB7XG4gICAgICAgICAgICAgICAgLy/mjqfliLblj7Dkv6Hmga9cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdvdmVyIHRoZSBsaW5lKHJpZ2h0KScpO1xuICAgICAgICAgICAgICAgIC8v5YGc5q2i5aWU6LeR5Yqo55S7XG4gICAgICAgICAgICAgICAgLy90aGlzLmFuaW1hdGUucGF1c2UoJ2hlcm8tcnVuJyk7XG4gICAgICAgICAgICAgICAgLy/ph43lrprkvY3kvY3nva5cbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCA9IC01NDE7XG4gICAgICAgICAgICAgICAgLy/ph43orr7liJ3pgJ/luqbkuLowXG4gICAgICAgICAgICAgICAgLy90aGlzLnhzcGVlZCA9IDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMubm9kZS54IDwgLTU0MSkge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdvdmVyIHRoZSBsaW5lKGxlZnQpJyk7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5hbmltYXRlLnBhdXNlKCdoZXJvLXJ1bicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCA9IDU0NTtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLnhzcGVlZCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgIH1cblxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdhZWJiM29pejJ0Q2tvOVBoMUc4eXJTcicsICdQb29sTW5nKGR1bXBlZCknKTtcbi8vIHNjcmlwdHNcXFBvb2xNbmcoZHVtcGVkKS5qc1xuXG52YXIgTm9kZVBvb2wgPSByZXF1aXJlKCdOb2RlUG9vbCcpO1xuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBzdGFyUG9vbHM6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogW10sXG4gICAgICAgICAgICB0eXBlOiBOb2RlUG9vbFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge30sXG5cbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc3RhclBvb2xzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJQb29sc1tpXS5pbml0KCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVxdWlyZVN0YXI6IGZ1bmN0aW9uIHJlcXVpcmVTdGFyKCkge1xuICAgICAgICB2YXIgdGhlUG9vbCA9IHRoaXMuc3RhclBvb2xzO1xuICAgICAgICBpZiAodGhlUG9vbC5pbmRleCA+PSAwKSB7XG4gICAgICAgICAgICB0aGVQb29sLnJlcXVlc3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJldHVyblN0YXI6IGZ1bmN0aW9uIHJldHVyblN0YXIob2JqKSB7XG4gICAgICAgIHZhciB0aGVQb29sID0gdGhpcy5zdGFyUG9vbHM7XG4gICAgICAgIGlmICh0aGVQb29sLmluZGV4IDwgdGhlUG9vbC5zaXplKSB7XG4gICAgICAgICAgICB0aGVQb29sWydyZXR1cm4nXShvYmopO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2MubG9nKCdSZXR1cm4gb2JqIHRvIGEgZnVsbCBwb29sLCBzb21ldGhpbmcgaGFzIGdvbmUgd3JvbmcnKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdkNGU5NHJ6cUdCTU9waXNiTXVueUlwUycsICdTdGFyJyk7XG4vLyBzY3JpcHRzXFxTdGFyLmpzXG5cbi8vc3RhcueahFjpgJ/luqblkoxZ6YCf5bqm55qE5q+U5YC8XG52YXIgcmF0aW9fYnVsZTtcbnZhciByYXRpb19yZWQ7XG52YXIgcmF0aW9fd2hpdGU7XG5cbnZhciB2ZWNYX3doaXRlO1xudmFyIHZlY1lfd2hpdGU7XG5cbnZhciB2ZWNYX2J1bGU7XG52YXIgdmVjWV9idWxlO1xuXG52YXIgdmVjWF9yZWQ7XG52YXIgdmVjWV9yZWQ7XG5cbnZhciBzdGFyRGllZCA9IGZhbHNlO1xudmFyIGp1Z2U7XG52YXIgd2F2ZU1uZztcbnZhciBzdGFyVHlwZSA9IGNjLkVudW0oe1xuICAgIFdISVRFOiAtMSxcbiAgICBCVUxFOiAtMSxcbiAgICBSRUQ6IC0xLFxuICAgIFBVUlBMRTogLTFcbn0pO1xuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuXG4gICAgICAgIHNwZWVkOiA0LFxuXG4gICAgICAgIG1heFJhdGlvOiA0LFxuXG4gICAgICAgIHN0YXJUeXBlOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IHN0YXJUeXBlLldISVRFLFxuICAgICAgICAgICAgdHlwZTogc3RhclR5cGVcbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge30sXG5cbiAgICBvbkNvbGxpc2lvbkVudGVyOiBmdW5jdGlvbiBvbkNvbGxpc2lvbkVudGVyKG90aGVyLCBzZWxmKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjb2xsaXNpb24hJyk7XG5cbiAgICAgICAgLy/lpoLmnpznuqLoibLmtYHmmJ/kuI7lopnnorDmkp7liJnkvJrlj43lvLlcbiAgICAgICAgaWYgKG90aGVyLm5vZGUuZ3JvdXAgPT0gJ3dhbGwnKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGFyVHlwZSA9PSBzdGFyVHlwZS5SRUQpIHtcbiAgICAgICAgICAgICAgICAvL1jmlrnlkJHpgJ/luqblj5blj43ku6XmraTlj43lvLlcbiAgICAgICAgICAgICAgICB0aGlzLnZlY1hfcmVkICo9IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vblN0YXJLaWxsZWQoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL+a1geaYn+eahOS4gOS6m+WIneWni+WMllxuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoV2F2ZU1uZykge1xuICAgICAgICAvL3dhdmVNbmcgPSBXYXZlTW5nO1xuICAgIH0sXG5cbiAgICBzdGFydDogZnVuY3Rpb24gc3RhcnQoKSB7XG5cbiAgICAgICAgLy9XSElURVxuICAgICAgICBpZiAodGhpcy5zdGFyVHlwZSA9PSBzdGFyVHlwZS5XSElURSkge1xuICAgICAgICAgICAgLy/lsY/luZXlhoVY5Z2Q5qCH55qE6ZqP5py65YC8XG4gICAgICAgICAgICB0aGlzLnJhbmRvbVggPSBjYy5kaXJlY3Rvci5nZXRWaXNpYmxlU2l6ZS54ICogLTAuNSAqIGNjLnJhbmRvbTBUbzEoKTtcblxuICAgICAgICAgICAgdmVjWF93aGl0ZSA9IHRoaXMubm9kZS54IC0gdGhpcy5yYW5kb21YO1xuICAgICAgICAgICAgdmVjWV93aGl0ZSA9IHRoaXMubm9kZS55IC0gY2MuZGlyZWN0b3IuZ2V0VmlzaWJsZVNpemUueSAqIC0wLjU7XG5cbiAgICAgICAgICAgIHJhdGlvX3doaXRlID0gdmVjWV93aGl0ZSAvIHZlY1hfd2hpdGUgKiAxLjA7XG5cbiAgICAgICAgICAgIGp1Z2UgPSByYXRpb193aGl0ZSAvIE1hdGguYWJzKHJhdGlvX3doaXRlKTtcblxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKHJhdGlvX3doaXRlKSA+IHRoaXMubWF4UmF0aW8pIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdzdGFyXFwncyBzcGVlZCBpcyB0b28gZmFzdCAnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gY2MucmFuZG9tMFRvMSgpICogMSArIDE7XG5cbiAgICAgICAgICAgICAgICByYXRpb193aGl0ZSA9IHRoaXMubWF4UmF0aW8gKiBqdWdlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9CVUxFXG4gICAgICAgIGlmICh0aGlzLnN0YXJUeXBlID09IHN0YXJUeXBlLkJVTEUpIHtcblxuICAgICAgICAgICAgdmFyIGhlcm9Qb3MgPSB0aGlzLndhdmVNbmcucGxheWVyLmdldFBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgIHZlY1hfYnVsZSA9IHRoaXMubm9kZS54IC0gaGVyb1Bvcy54O1xuICAgICAgICAgICAgdmVjeV9idWxlID0gdGhpcy5ub2RlLnkgLSBoZXJvUG9zLnk7XG5cbiAgICAgICAgICAgIC8vcmF0aW/mmK/nn6Lph4/vvIzlm6DkuLp2ZWNYLHZlY1npg73mmK/nn6Lph49cbiAgICAgICAgICAgIHJhdGlvX2J1bGUgPSB2ZWN5X2J1bGUgLyAodmVjWF9idWxlICogMS4wKTtcbiAgICAgICAgICAgIC8v55So5LqO5Yik5patcmF0aW/nmoTmraPotJ/lj7dcbiAgICAgICAgICAgIGp1Z2UgPSByYXRpb19idWxlIC8gTWF0aC5hYnMocmF0aW9fYnVsZSk7XG5cbiAgICAgICAgICAgIC8v5aaC5p6ccmF0aW/lgLzov4flpKfkvJrlr7zoh7RzdGFy55qE6YCf5bqm5p6B5b+r77yM5omA5Lul6KaB6ZmQ5Yi2cmF0aW/lgLxcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhyYXRpb19idWxlKSA+IHRoaXMubWF4UmF0aW8pIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdzdGFyXFwncyBzcGVlZCBpcyB0b28gZmFzdCAnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwZWVkID0gY2MucmFuZG9tMFRvMSgpICogMSArIDE7XG4gICAgICAgICAgICAgICAgcmF0aW9fYnVsZSA9IHRoaXMubWF4UmF0aW8gKiBqdWdlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9SRURcbiAgICAgICAgaWYgKHRoaXMuc3RhclR5cGUgPT0gc3RhclR5cGUuUkVEKSB7XG4gICAgICAgICAgICAvL+Wxj+W5leWklljlnZDmoIfnmoTpmo/mnLrlgLxcbiAgICAgICAgICAgIHRoaXMucmFuZG9tWF8wID0gY2MuZGlyZWN0b3IuZ2V0VmlzaWJsZVNpemUueCAqIC0xICogMC41ICogY2MucmFuZG9tMFRvMSgpICsgMjAwOyAvL+W3plxuICAgICAgICAgICAgdGhpcy5yYW5kb21YXzEgPSBjYy5kaXJlY3Rvci5nZXRWaXNpYmxlU2l6ZS54ICogMC41ICogY2MucmFuZG9tMFRvMSgpICsgY2MuZGlyZWN0b3IuZ2V0VmlzaWJsZVNpemUueDsgLy/lj7NcblxuICAgICAgICAgICAgLy9yYW5kb23nlKjmnaXpmo/mnLrmtYHmmJ/mlrnlkJFcbiAgICAgICAgICAgIHZhciByYW5kb20gPSBjYy5yYW5kb20wVG8xKCk7XG5cbiAgICAgICAgICAgIGlmIChyYW5kb20gPiAwLjUpIHtcbiAgICAgICAgICAgICAgICB2ZWNYX3JlZCA9IHRoaXMubm9kZS54IC0gdGhpcy5yYW5kb21YXzA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZlY1hfcmVkID0gdGhpcy5ub2RlLnggLSB0aGlzLnJhbmRvbVhfMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZlY1lfcmVkID0gdGhpcy5ub2RlLnkgLSBjYy5kaXJlY3Rvci5nZXRWaXNpYmxlU2l6ZS55ICogLTAuNTtcblxuICAgICAgICAgICAgcmF0aW9fcmVkID0gdmVjWV9yZWQgLyAodmVjWF9yZWQgKiAxLjApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9QVVJQTEVcbiAgICAgICAgaWYgKHRoaXMuc3RhclR5cGUgPT0gc3RhclR5cGUuUFVSUExFKSB7fVxuICAgIH0sXG5cbiAgICAvL+a1geaYn+eahEFJXG4gICAgc3RhckFJOiBmdW5jdGlvbiBzdGFyQUkoKSB7XG4gICAgICAgIC8vd2hpdGVcbiAgICAgICAgaWYgKHRoaXMuc3RhclR5cGUgPT0gc3RhclR5cGUuV0hJVEUpIHtcbiAgICAgICAgICAgIGlmICh2ZWNYX3doaXRlID49IDAgJiYgdmVjWV93aGl0ZSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnggKz0gdGhpcy5zcGVlZCAqIC0xO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS55ICs9IHRoaXMuc3BlZWQgKiByYXRpb193aGl0ZSAqIC0xO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2ZWNYX3doaXRlID49IDAgJiYgdmVjWV93aGl0ZSA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCArPSB0aGlzLnNwZWVkICogLTE7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnkgKz0gdGhpcy5zcGVlZCAqIHJhdGlvX3doaXRlICogLTE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZlY1hfd2hpdGUgPCAwICYmIHZlY1lfd2hpdGUgPCAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnggKz0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueSArPSB0aGlzLnNwZWVkICogcmF0aW9fd2hpdGU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZlY1hfd2hpdGUgPCAwICYmIHZlY1lfd2hpdGUgPj0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS54ICs9IHRoaXMuc3BlZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnkgKz0gdGhpcy5zcGVlZCAqIHJhdGlvX3doaXRlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCArPSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgICAgIHRoaXMubm9kZS55ICs9IHRoaXMuc3BlZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy9idWxlXG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc3RhclR5cGUgPT0gc3RhclR5cGUuQlVMRSkge1xuICAgICAgICAgICAgICAgIGlmICh2ZWNYX2J1bGUgPj0gMCAmJiB2ZWNZX2J1bGUgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCArPSB0aGlzLnNwZWVkICogLTE7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS55ICs9IHRoaXMuc3BlZWQgKiByYXRpb19idWxlICogLTE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2ZWNYX2J1bGUgPj0gMCAmJiB2ZWNZX2J1bGUgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS54ICs9IHRoaXMuc3BlZWQgKiAtMTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnkgKz0gdGhpcy5zcGVlZCAqIHJhdGlvX2J1bGUgKiAtMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZlY1hfYnVsZSA8IDAgJiYgdmVjWV9idWxlIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCArPSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueSArPSB0aGlzLnNwZWVkICogcmF0aW9fYnVsZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZlY1hfYnVsZSA8IDAgJiYgdmVjWV9idWxlID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnggKz0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnkgKz0gdGhpcy5zcGVlZCAqIHJhdGlvX2J1bGU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnggKz0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnkgKz0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL3JlZFxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5zdGFyVHlwZSA9PSBSRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZlY1hfYnVsZSA+PSAwICYmIHZlY1lfYnVsZSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCArPSB0aGlzLnNwZWVkICogLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueSArPSB0aGlzLnNwZWVkICogcmF0aW9fYnVsZSAqIC0xO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZlY1hfYnVsZSA+PSAwICYmIHZlY1lfYnVsZSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS54ICs9IHRoaXMuc3BlZWQgKiAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS55ICs9IHRoaXMuc3BlZWQgKiByYXRpb19idWxlICogLTE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmVjWF9idWxlIDwgMCAmJiB2ZWNZX2J1bGUgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUueCArPSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnkgKz0gdGhpcy5zcGVlZCAqIHJhdGlvX2J1bGU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmVjWF9idWxlIDwgMCAmJiB2ZWNZX2J1bGUgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnggKz0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS55ICs9IHRoaXMuc3BlZWQgKiByYXRpb19idWxlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLnggKz0gdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS55ICs9IHRoaXMuc3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhclR5cGUgPT0gUFVSUExFKSB7fVxuICAgIH0sXG5cbiAgICAvL+a1geaYn+eahOeKtuaAgVxuICAgIHN0YXJTdGF0ZTogZnVuY3Rpb24gc3RhclN0YXRlKCkge1xuICAgICAgICBpZiAodGhpcy5ub2RlLnkgPCAtMzE1KSB7XG4gICAgICAgICAgICBzdGFyRGllZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm9uU3RhcktpbGxlZCgpO1xuICAgICAgICB9IGVsc2Ugc3RhckRpZWQgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgb25TdGFyS2lsbGVkOiBmdW5jdGlvbiBvblN0YXJLaWxsZWQoKSB7XG4gICAgICAgIC8v5raI6Zmk6IqC54K5XG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XG4gICAgICAgIC8v5Yi35paw5b6X5YiGXG4gICAgICAgIHRoaXMud2F2ZU1uZy51cGRhdGVTY29yZURpc3BsYXkoKTtcbiAgICAgICAgY2MubG9nKCdraWxsZWQnKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgLy/mtYHmmJ/nmoRBSVxuICAgICAgICB0aGlzLnN0YXJBSSgpO1xuICAgICAgICAvL+a1geaYn+eahOeKtuaAgVxuICAgICAgICAvL3RoaXMuc3RhclN0YXRlKCk7XG4gICAgfVxuXG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzQwN2MwdTZmMHBFbTZodjBWRGgxTWlXJywgJ1VwZGF0ZVNjb3JlRGlzcGxheScpO1xuLy8gc2NyaXB0c1xcVXBkYXRlU2NvcmVEaXNwbGF5LmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHt9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgIH0sXG5cbiAgICB1cGRhdGVTY29yZURpc3BsYXk6IGZ1bmN0aW9uIHVwZGF0ZVNjb3JlRGlzcGxheSgpIHtcbiAgICAgICAgdGhpcy5ub2RlLnN0cmluZyA9ICdTdHJpbmc6ICcgKyB0aGlzLnNjb3JlLnRvU3RyaW5nKCk7XG4gICAgfVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnMTIwM2J4cmV4SklZb0g4OTY2YTRocDgnLCAnV2F2ZU1uZycpO1xuLy8gc2NyaXB0c1xcV2F2ZU1uZy5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vU3Rhckdyb3VwOmNjLk5vZGUsXG4gICAgICAgIHN0YXIwOiBjYy5QcmVmYWIsXG4gICAgICAgIHN0YXIxOiBjYy5QcmVmYWIsXG4gICAgICAgIHN0YXIyOiBjYy5QcmVmYWIsXG4gICAgICAgIHN0YXIzOiBjYy5QcmVmYWIsXG4gICAgICAgIHBsYXllcjogY2MuTm9kZSxcbiAgICAgICAgc2NvcmU6IGNjLkxhYmVsLFxuICAgICAgICBzcGF3bkludGVydmFsOiAxXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB0aGlzLlNjb3JlID0gMDtcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWQgPSB0cnVlO1xuICAgICAgICBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZERlYnVnRHJhdyA9IHRydWU7XG4gICAgICAgIHRoaXMud2F2ZSgpO1xuICAgICAgICAvL2NjLmxvZyhcIm9uTG9hZCB3YXZlTW5nIGNvbXBsZXRlICFcIik7XG4gICAgfSxcblxuICAgIHdhdmU6IGZ1bmN0aW9uIHdhdmUoKSB7XG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5zcGF3biwgdGhpcy5zcGF3bkludGVydmFsKTtcbiAgICAgICAgLy9jYy5sb2coXCJ3YXZlIGNvbXBsZXRlICFcIik7XG4gICAgfSxcblxuICAgIHNwYXduOiBmdW5jdGlvbiBzcGF3bigpIHtcbiAgICAgICAgLy90aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdQb29sTW5nJykuaW5pdCgpO1xuICAgICAgICAvL3ZhciBvYmogPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KCdQb29sTW5nJykucmVxdWlyZVN0YXIoKTtcbiAgICAgICAgdmFyIG9iaiA9IGNjLmluc3RhbnRpYXRlKHRoaXMuc3RhcjApO1xuICAgICAgICBvYmouYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgb2JqLmdldENvbXBvbmVudCgnU3RhcicpLndhdmVNbmcgPSB0aGlzO1xuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKG9iaik7XG4gICAgICAgIC8vY2MubG9nKFwic3Bhd25pbmcgIVwiKTtcbiAgICAgICAgb2JqLnNldFBvc2l0aW9uKHRoaXMuZ2V0TmV3U3RhclBvc2l0aW9uKCkpO1xuICAgICAgICAvL2NjLmxvZyhcInNwYXduIGNvbXBsZXRlICFcIik7XG4gICAgfSxcblxuICAgIGdldE5ld1N0YXJQb3NpdGlvbjogZnVuY3Rpb24gZ2V0TmV3U3RhclBvc2l0aW9uKCkge1xuICAgICAgICAvL2NjLmxvZyhcImdldE5ld1N0YXJQb3NpdGlvbiBzdGFydCAhXCIpO1xuICAgICAgICB2YXIgbWF4WCA9IHRoaXMubm9kZS53aWR0aCAvIDI7XG4gICAgICAgIC8v5rWB5pif5Ye6546w5Zyo6ZqP5py655qEWOWdkOagh1xuICAgICAgICB2YXIgcmFuZFggPSBjYy5yYW5kb21NaW51czFUbzEoKSAqIG1heFg7XG4gICAgICAgIHZhciBwb3NZID0gdGhpcy5ub2RlLmhlaWdodCAqIDAuNTtcbiAgICAgICAgLy9jYy5sb2coXCJnZXROZXdTdGFyUG9zaXRpb24gY29tcGxldGUgIVwiKTtcbiAgICAgICAgcmV0dXJuIGNjLnAocmFuZFgsIHBvc1kpO1xuICAgIH0sXG5cbiAgICB1cGRhdGVTY29yZURpc3BsYXk6IGZ1bmN0aW9uIHVwZGF0ZVNjb3JlRGlzcGxheSgpIHtcbiAgICAgICAgdGhpcy5TY29yZSArPSAxO1xuICAgICAgICB0aGlzLnNjb3JlLnN0cmluZyA9ICdTY29yZTogJyArIHRoaXMuU2NvcmUudG9TdHJpbmcoKTtcbiAgICB9LFxuXG4gICAgb25EaXNhYmxlOiBmdW5jdGlvbiBvbkRpc2FibGUoKSB7XG4gICAgICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkRGVidWdEcmF3ID0gZmFsc2U7XG4gICAgfVxuXG59KTtcblxuY2MuX1JGcG9wKCk7Il19
