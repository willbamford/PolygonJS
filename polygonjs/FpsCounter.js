define([], function () {

    "use strict";

    var FpsCounter = function (opts) {
        this.time = 0;
        this.frame = 0;
        this.framesPerSecond = 0;
        this.sampleSize = opts.sampleSize || 100;
        this.callback = opts.callback;
    };

    FpsCounter.create = function (opts) {
        return new FpsCounter(opts);
    };

    FpsCounter.prototype = {
        tick: function (delta) {
            this.frame++;
            this.time += delta;
            if (this.frame === this.sampleSize) {
                this.framesPerSecond = ((this.frame / this.time) * 1000).toFixed(2);
                if (this.callback) {
                    this.callback(this.framesPerSecond);
                }
                this.time = 0;
                this.frame = 0;
            }
        } 
    };

    return FpsCounter;
});