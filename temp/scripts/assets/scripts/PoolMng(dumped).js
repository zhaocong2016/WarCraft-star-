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