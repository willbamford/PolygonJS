define(['polygonjs/lib'], function (lib) {

    "use strict";

    var Surface = function (opts) {
        opts = opts || {};
        this.width = opts.width || 640;
        this.height = opts.height || 480;
        this.cx = this.width / 2;
        this.cy = this.height / 2;

        var canvas = this.createEl('canvas', {
            style: 'border: 1px solid #eee',
            width: this.width,
            height: this.height
        });

        // var svg = this.createEl('svg', {
        //     style: 'border: 1px solid #eee',
        //     width: this.width,
        //     height: this.height
        // });
        // this.setAttrNS(svg, XML_NS, 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
        document.body.appendChild(canvas);
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        return this;
    };

    Surface.lastId = 0;

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

        polygon: function (points, style) {
            var ctx = this.context;
            var len = points.length;
            if (len > 1) {
                var point = points[0];
                ctx.fillStyle = style;
                ctx.beginPath();
                ctx.moveTo(point.x + this.cx, point.y + this.cy);
                for (var i = 1; i < len; i++) {
                    point = points[i];
                    ctx.lineTo(point.x + this.cx, point.y + this.cy);
                }
                ctx.closePath();
                ctx.fill();
            }
        }
    };

    return Surface;
});