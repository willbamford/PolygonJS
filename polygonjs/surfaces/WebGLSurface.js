define(
    [
        'libs/pixi.js/bin/pixi.dev'
    ],
    function (PIXI) {

        "use strict";

        var Surface = function (opts) {
            opts = opts || {};
            this.width = opts.width || 640;
            this.height = opts.height || 480;
            this.cx = this.width / 2;
            this.cy = this.height / 2;
            this.stage = new PIXI.Stage(0x000000, true);
            // this.renderer = new PIXI.WebGLRenderer(this.width, this.height);
            // this.renderer = new PIXI.CanvasRenderer(this.width, this.height);
            this.renderer = PIXI.autoDetectRenderer(this.width, this.height);
            this.renderer.view.style.display = 'block';
            document.body.appendChild(this.renderer.view);
            this.graphics = new PIXI.Graphics();
            this.stage.addChild(this.graphics);
            return this;
        };

        Surface.create = function (opts) {
            return new Surface(opts);
        };

        Surface.prototype = {

            clear: function () {
                this.graphics.clear();
            },

            polygon: function (points, color) {
                var graphics = this.graphics;
                var len = points.length;
                if (len) {
                    var point = points[0];
                    var x, y;
                    graphics.beginFill(color);
                    graphics.moveTo(point.x + this.cx, -point.y + this.cy);
                    for (var i = 1; i < len; i++) {
                        point = points[i];
                        graphics.lineTo(point.x + this.cx, -point.y + this.cy);
                    }
                    point = points[0];
                    graphics.lineTo(point.x + this.cx, -point.y + this.cy);
                    graphics.endFill();
                }
            },

            render: function () {
                this.renderer.render(this.stage);
            }
        };

        return Surface;
    }
);