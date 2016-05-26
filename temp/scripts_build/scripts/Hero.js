"use strict";
cc._RFpush(module, '7bc1eF1hKtLX4gGqJRJdGfq', 'Hero');
// scripts\Hero.js

var Direction = cc.Enum({
    NONE: 0,
    LEFT: 1,
    RIGHT: 2
});
var moveDirection = Direction.NONE;

cc.Class({
    'extends': cc.Component,

    properties: {

        //最大速度
        maxMoveSpeed: 10,
        //加速度
        accel: 0,
        //动画
        animate: cc.Animation
    },

    // use this for initialization
    onLoad: function onLoad() {

        //键盘输入，后续会改为重力感应（左右方向）
        this.setInputControl();
        //初始速度为0
        this.xspeed = 0;
    },

    //键盘输入，后续会改为重力感应（左右方向）
    setInputControl: function setInputControl() {

        cc.inputManager.setAccelerometerEnabled(true);
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.ACCELERATION,
            callback: function callback(acc, event) {
                if (acc.x > 0) {
                    this.turnRigth();
                } else {
                    this.turnLeft();
                }
            }
        }, self.node);

        /*onKeyPressed: function(keyCode,event){
            switch(keyCode){
                case cc.KEY.d:
                case cc.KEY.right:
                    //事件回调
                    self.turnRigth();
                    break;
                case cc.KEY.a:
                case cc.KEY.left:
                    self.turnLeft();
                    break;
                default:
                    moveDirection = Direction.NONE;
                    break;
            }
        },
        onKeyReleased: function(keyCode,event){
            if(keyCode == cc.KEY.right||keyCode == cc.KEY.d){
               moveDirection = Direction.NONE;
               
            }
            else if(keyCode == cc.KEY.left||keyCode == cc.KEY.a){
                 moveDirection = Direction.NONE;
            }
        }
        },self.node);*/
    },

    update: function update(dt) {
        //判断hero的运动方向
        if (moveDirection == Direction.RIGHT) {
            console.log('turn right');
            //初速度大小增加
            this.xspeed += this.accel * dt;
        } else if (moveDirection == Direction.LEFT) {
            console.log('turn left');
            this.xspeed -= this.accel * dt;
        }

        //如果xSpeed超过最大速度，则设置为最大速度
        if (Math.abs(this.xspeed) > this.maxMoveSpeed) {
            console.log('max speed!');
            //速度是矢量，所以要判断正负
            this.xspeed = this.maxMoveSpeed * Math.abs(this.xspeed) / this.xspeed;
        }

        //更新Hero的位置(在屏幕范围内)
        this.node.x += this.xspeed * dt;

        //检测是否有初速度
        if (this.xspeed != 0) console.log('moving!');

        //如果超过屏幕边界     
        if (this.node.x > 425) {
            //控制台信息
            console.log('over the line(right)');
            //停止奔跑动画
            this.animate.pause('hero-run');
            //重定位位置
            this.node.x = 425;
            //重设初速度为0
            this.xspeed = 0;
        } else if (this.node.x < -411) {
            console.log('over the line(left)');
            this.animate.pause('hero-run');
            this.node.x = -411;
            this.xspeed = 0;
        }
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
    }

});

cc._RFpop();