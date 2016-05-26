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