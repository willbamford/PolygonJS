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

            var container = typeof opts.container === 'string' ?
                document.getElementById(opts.container) :
                opts.container;

            container.appendChild(this.renderer.view);
            this.container = container;

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

                    var point, firstPoint = points[0];
                    var x, y, i;

                    graphics.beginFill(color);
                    graphics.moveTo(firstPoint.x + this.cx, -firstPoint.y + this.cy);
                    for (i = 1; i < len; i++) {
                        point = points[i];
                        graphics.lineTo(point.x + this.cx, -point.y + this.cy);
                    }
                    // TODO: examine why this is necessary
                    if (len === 3) {
                        graphics.lineTo(firstPoint.x + this.cx, -firstPoint.y + this.cy);
                    }
                    graphics.endFill();
                }
            },

            line: function (from, to, color) {

                var graphics = this.graphics;
                graphics.lineStyle(2, color, 1);
                graphics.moveTo(from.x + this.cx, -from.x + this.cy);
                graphics.lineTo(to.x + this.cx, -to.y + this.cy);
                graphics.lineStyle(0);
            },

            render: function () {
                this.renderer.render(this.stage);
            }
        };

        return Surface;
    }
);