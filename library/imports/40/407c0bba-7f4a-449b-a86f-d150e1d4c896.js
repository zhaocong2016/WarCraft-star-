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