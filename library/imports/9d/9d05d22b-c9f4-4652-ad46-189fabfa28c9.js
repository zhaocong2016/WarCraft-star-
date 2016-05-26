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