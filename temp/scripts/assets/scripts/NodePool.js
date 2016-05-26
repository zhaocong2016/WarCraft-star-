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