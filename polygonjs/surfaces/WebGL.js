define(
    [
        'polygonjs/lib',
        'libs/pixi.js/bin/pixi.dev'
    ],
    function (lib, PIXI) {

        "use strict";

        console.log(PIXI);

        var Surface = function (opts) {
            // opts = opts || {};
            // this.width = opts.width || 640;
            // this.height = opts.height || 480;
            // this.cx = this.width / 2;
            // this.cy = this.height / 2;
            return this;
        };

        Surface.lastId = 0;

        Surface.create = function (opts) {
            return new Surface(opts);
        };

        Surface.prototype = {

            clear: function () {
            },

            circle: function (point, r, style) {
            },

            dot: function (point, style) {
            },

            polygon: function (points, style) {
            }
        };

        return Surface;
    }
);