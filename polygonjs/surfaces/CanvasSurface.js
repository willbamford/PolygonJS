define([], function () {

    "use strict";

    var Surface = function (opts) {
        opts = opts || {};
        this.width = opts.width || 640;
        this.height = opts.height || 480;
        this.cx = this.width / 2;
        this.cy = this.height / 2;

        var canvas = this.createEl('canvas', {
            style: 'background: black',
            width: this.width,
            height: this.height
        });

        var container = typeof opts.container === 'string' ?
            document.getElementById(opts.container) :
            opts.container;

        container.appendChild(canvas);
        this.container = container;
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        return this;
    };

    Surface.create = function (opts) {
        return new Surface(opts);
    };

    Surface.prototype = {

        createEl: function (name, attrs) {
            var el = document.createElement(name);
            attrs = attrs || {};
            for (var attr in attrs)
                this.setAttr(el, attr, attrs[attr]);
            return el;
        },

        setAttr: function (el, name, value) {
            el.setAttribute(name, value);
        },

        setAttrNS: function (el, namespace, name, value) {
            el.setAttributeNS(namespace, name, value);
        },

        clear: function () {
            this.context.clearRect(0, 0, this.width, this.height);
        },

        polygon: function (points, color) {
            var ctx = this.context;
            var len = points.length;
            if (len > 1) {
                var point = points[0];
                ctx.fillStyle = color.getHexStyle();
                // ctx.strokeStyle = color;
                ctx.beginPath();
                ctx.moveTo(point.x + this.cx, -point.y + this.cy);
                for (var i = 1; i < len; i++) {
                    point = points[i];
                    ctx.lineTo(point.x + this.cx, -point.y + this.cy);
                }
                ctx.closePath();
                ctx.fill();
                // ctx.stroke(); // Gets rid of seams but performance hit
            }
        },

        line: function (from, to, color) {

            var ctx = this.context;
            ctx.strokeStyle = color.getHexStyle();
            ctx.beginPath();
            ctx.moveTo(from.x + this.cx, -from.x + this.cy);
            ctx.lineTo(to.x + this.cx, -to.y + this.cy);
            ctx.stroke();
        },

        render: function () {}
    };

    return Surface;
});
