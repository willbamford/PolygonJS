define(['polygonjs/lib'], function (lib) {

    "use strict";

    var SVG_NS = 'http://www.w3.org/2000/svg';
    var XML_NS = 'http://www.w3.org/2000/xmlns/';

    var Surface = function (opts) {
        opts = opts || {};
        this.width = opts.width || 640;
        this.height = opts.height || 480;
        this.cx = this.width / 2;
        this.cy = this.height / 2;
        var svg = this.createEl('svg', {
            style: 'border: 1px solid #eee',
            width: this.width,
            height: this.height
        });
        this.setAttrNS(svg, XML_NS, 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
        document.body.appendChild(svg);
        this.svg = svg;
        return this;
    };

    Surface.lastId = 0;

    Surface.create = function (opts) {
        return new Surface(opts);
    };

    Surface.prototype = {

        createEl: function (name, attrs) {
            var el = document.createElementNS(SVG_NS, name);
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

        line: function (x1, y1, x2, y2, style) {
            style = style || 'stroke: black';
            var line = this.createEl('line', {
                x1: this.cx + x1,
                x2: this.cx + x2,
                y1: this.cy + y1,
                y2: this.cy + y2,
                style: style
            });
            this.svg.appendChild(line);
            return line;
        },

        circle: function (x, y, r, style) {
            r = r || 1;
            style = style || 'stroke: black';
            var circle = this.createEl('circle', {
                cx: this.cx + x,
                cy: this.cy + y,
                r: r,
                style: style
            });
            this.svg.appendChild(circle);
            return circle;
        },

        dot: function (x, y) {
            return this.circle(x, y, 1);
        },

        polygon: function (points, style, id) {
            var self = this;
            var encodedPoints = '';
            style = style || this.randomColour();
            id = id || 'p' + Surface.lastId++;
            lib.each(points, function (point) {
                var x = point.x + self.cx;
                var y = point.y + self.cy;
                encodedPoints += x + ',' + y + ' ';
            });
            var polygon = this.createEl('polygon', {
                id: id,
                points: encodedPoints,
                style: 'fill: ' + style
            });
            this.svg.appendChild(polygon);
            return polygon;
        }
    };

    return Surface;
});