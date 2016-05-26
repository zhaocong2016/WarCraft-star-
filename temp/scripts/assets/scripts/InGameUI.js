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