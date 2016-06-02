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
    WHITE:-1,
    BULE:-1,
    RED:-1,
    PURPLE:-1
});
cc.Class({
    extends: cc.Component,

    properties: {
    
        speed: 4 ,
        
        maxRatio:4,
        
        starType:{
            default: starType.WHITE,
            type:starType
        }

        
    },
    
    onLoad:function () {
    },
    
    onCollisionEnter:function (other, self) {
        console.log('collision!');
        
        //如果红色流星与墙碰撞则会反弹
        if(other.node.group == 'wall'){
            if(this.starType == starType.RED){
                //X方向速度取反以此反弹
                this.vecX_red *= -1;
            }
        }
        else {
            this.onStarKilled();
        }
    },
    
    //流星的一些初始化
   init (WaveMng) {
        //waveMng = WaveMng;
   },
   
   start () {
       
        //WHITE
        if(this.starType == starType.WHITE){
            //屏幕内X坐标的随机值
            this.randomX = cc.director.getVisibleSize().width * cc.random0To1();
            // cc.log("getVisibleSizeX:",cc.director.getVisibleSize().width);
            // cc.log("random:",this.randomX);
            
            vecX_white = this.node.getPositionX() - this.randomX;
            // cc.log("vecX_white:",vecX_white);
            
            vecY_white = this.node.getPositionY();
            // cc.log("vecY_white:",vecY_white);
            
            ratio_white = vecY_white / vecX_white * 1.0;
            // cc.log("ratio_white:",ratio_white);
            
            //juge = ratio_white/Math.abs(ratio_white);
            
            if(Math.abs(ratio_white) > this.maxRatio)
            {
                //console.log('star\'s speed is too fast ');
                this.speed = cc.random0To1()*1 + 1;
                
                ratio_white = this.maxRatio; //* juge;
            }
        }
        
         //BULE
        if(this.starType == starType.BULE){
            
            var heroPos = this.waveMng.player.getPosition();
            
            vecX_bule = this.node.getPositionX() - heroPos.x;
            vecy_bule = this.node.getPositionY() - heroPos.y;
            
            //ratio是矢量，因为vecX,vecY都是矢量
            ratio_bule = vecy_bule / (vecX_bule * 1.0);
            //用于判断ratio的正负号
            juge = ratio_bule/Math.abs(ratio_bule);
            
            //如果ratio值过大会导致star的速度极快，所以要限制ratio值
            if(Math.abs(ratio_bule) > this.maxRatio)
            {
                //console.log('star\'s speed is too fast ');
                this.speed = cc.random0To1()*1 + 1;
                ratio_bule = this.maxRatio*juge;
            }
        }
        
        //RED
        if(this.starType == starType.RED){
            //屏幕外X坐标的随机值
            this.randomX_0 = cc.director.getVisibleSize().width * -1 * 0.5 * cc.random0To1() ;   //左
            this.randomX_1 = cc.director.getVisibleSize().width * 0.5 * cc.random0To1() + cc.director.getVisibleSize.x;   //右
            
            //random用来随机流星方向
            var random = cc.random0To1();
            
            if(random > 0.5){
                vecX_red = this.node.getPositionX() - this.randomX_0;
            }
            else{
                vecX_red = this.node.getPositionX() - this.randomX_1;
            }
            vecY_red = this.node.getPositionY() - cc.director.getVisibleSize.y * - 0.5;
            
            ratio_red = vecY_red / (vecX_red * 1.0);
        }

        //PURPLE
        if(this.starType == starType.PURPLE){
            
        }
        
    },
    
    //流星的AI
    starAI () {
        //white
        if(this.starType == starType.WHITE){
            if (vecX_white >= 0)
            {
                this.node.x += this.speed * -1;
                this.node.y += this.speed * ratio_white * -1;
                // this.node.setPosition(this.node.getPositionX() +  this.speed * -1,
                //     this.node.getPositionY() + this.speed * ratio_white * -1 );
            }
            else {
                this.node.x += this.speed ;
                this.node.y += this.speed * ratio_white ;
                // this.node.setPosition(this.node.getPositionX() +  this.speed,
                //     this.node.getPositionY() + this.speed * ratio_white );
             }
        }
        //bule
        else if(this.starType == starType.BULE){
            if (vecX_bule >= 0 && vecY_bule>=0)
            {
                this.node.x += this.speed * -1;
                this.node.y += this.speed * ratio_bule * -1;
            }
            else if(vecX_bule >= 0 && vecY_bule<0)
            {
                this.node.x += this.speed * -1;    
                this.node.y += this.speed * ratio_bule * -1;
            }
            else if(vecX_bule < 0 && vecY_bule<0)
            {
                this.node.x += this.speed ;    
                this.node.y += this.speed * ratio_bule;
            }
            else if(vecX_bule < 0 && vecY_bule>=0)
            { 
                this.node.x += this.speed ;    
                this.node.y += this.speed * ratio_bule;
            }
            else{
                this.node.x += this.speed ;    
                this.node.y += this.speed ;
            }
        }  
        //red
        else if(this.starType == starType.RED){
             if (vecX_bule >= 0 && vecY_bule>=0)
            {
                this.node.x += this.speed * -1;
                this.node.y += this.speed * ratio_bule * -1;
            }
            else if(vecX_bule >= 0 && vecY_bule<0)
            {
                this.node.x += this.speed * -1;    
                this.node.y += this.speed * ratio_bule * -1;
            }
            else if(vecX_bule < 0 && vecY_bule<0)
            {
                this.node.x += this.speed ;    
                this.node.y += this.speed * ratio_bule;
            }
            else if(vecX_bule < 0 && vecY_bule>=0)
            { 
                this.node.x += this.speed ;    
                this.node.y += this.speed * ratio_bule;
            }
            else{
                this.node.x += this.speed ;    
                this.node.y += this.speed ;
            }
        }
        else if(this.starType == starType.PURPLE){
            
        }
    },
    
    //流星的状态
    starState () {
      if(this.node.getPositionY() < cc.director.getVisibleSize().y){
          starDied = true;
          this.onStarKilled();
      }
      else  
          starDied = false;
    },
    
    onStarKilled () {
        //消除节点
        this.node.destroy();
        //刷新得分
        this.waveMng.updateScoreDisplay();
        cc.log('killed');   
    },
    
    update (dt){
       //流星的AI
       this.starAI();
       //流星的状态
       //this.starState();
       
    },
    
    

});
