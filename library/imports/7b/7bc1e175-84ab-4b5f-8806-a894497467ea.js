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