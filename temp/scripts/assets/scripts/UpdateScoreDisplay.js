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