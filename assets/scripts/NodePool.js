var NodePool = cc.Class({
    name: 'NodePool',
    properties:{
        prefab: cc.Prefab,
        size: 0
    },

    ctor() {
        this.index = 0;
        this.initList = [];
        this.list = [];
    },
    
    init () {
        for(let i = 0;i < this.size; ++i){
            let obj = cc.instantiate(this.prefab);
            this.initList[i] = obj;
            this.list[i] = obj;
        }
        this.index = this.size -1;
    },
    
    reset() {
        for(let i = 0; i < this.size; ++i){
            let obj = this.initList[i];
            this.list[i] = obj;
            if(obj.active){
                obj.active = false;
            }
            if(obj.parent){
                obj.removeFromParent();
            }
        }
        this.index = this.size - 1;
    },
    
    request() {
        if(this.index < 0){
            cc.log("Error: the pool do not have enough free item.");
            return null;
        }
        let obj = this.list[this.index];
        if( obj ){
            obj.active =true;
        }
        --this.index;
        return obj;
    },
    
    return ( obj ) {
        ++this.index;
        obj.active =false;
        if(obj.parent){
            obj.removeFromParent();
        }
        this.list[this.index] = obj;
    }
    
});

module.exports = NodePool;