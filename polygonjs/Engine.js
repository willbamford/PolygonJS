define(
    [
        'polygonjs/FpsCounter',
        'polygonjs/polyfills/animation-frame'
    ],
    function (FpsCounter) {

        var Engine = function (opts) {
            opts = opts || {};
            this.requestId = null;
            this.isRunning = false;
            this.lastTime = null;
            this.onTick = opts.onTick;
            this.fpsCounter = FpsCounter.create({
                sampleSize: 100,
                callback: function (framesPerSecond) {
                    console.log('FPS: ' + framesPerSecond);
                }
            });
        };

        Engine.create = function (opts) {
            return new Engine(opts);
        };

        Engine.prototype = {

            start: function () {
                if (!this.isRunning) {
                    this.lastTime = null;
                    this.requestId = window.requestAnimationFrame(this.tick.bind(this));
                    this.isRunning = true;
                }
            },

            stop: function () {
                if (this.isRunning) {
                    window.cancelAnimationFrame(this.requestId);
                    this.isRunning = false;
                }
            },

            tick: function () {
                // console.time('Render time');
                var currentTime = Date.now(),
                    delta = 0;

                if (this.lastTime)
                    delta = currentTime - this.lastTime;

                this.onTick(delta);

                this.lastTime = currentTime;
                this.requestId = window.requestAnimationFrame(this.tick.bind(this));
                this.fpsCounter.tick(delta);
                // console.timeEnd('Render time');
            }
        };

        return Engine;
    }
);