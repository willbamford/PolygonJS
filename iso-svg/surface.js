define(['iso-svg/lib'], function (lib) {

    var surface = {

        SVG_NS: 'http://www.w3.org/2000/svg',
        XML_NS: 'http://www.w3.org/2000/xmlns/',

        width: 640,
        height: 480,
        cx: 320,
        cy: 240,

        create: function (opts) {
            var instance = lib.create(this);
            return instance.init(opts);
        },

        init: function (opts) {
            opts = opts || {};
            if (opts.width) this.width = opts.width;
            if (opts.height) this.height = opts.height;
            this.cx = this.width / 2;
            this.cy = this.height / 2;
            var svg = this.createEl('svg', {
                style: 'border: 1px solid #eee',
                width: this.width,
                height: this.height
            });
            this.setAttrNS(svg, this.XML_NS, 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
            document.body.appendChild(svg);
            this.svg = svg;
            return this;
        },

        createEl: function (name, attrs) {
            var el = document.createElementNS(this.SVG_NS, name);
            var attrs = attrs || {};
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

        polygon: function (points, style) {
            var self = this;
            var encodedPoints = '';
            style = style || 'fill: ' + this.randomColour();
            lib.each(points, function (point) {
                var x = point[0] + self.cx;
                var y = point[1] + self.cy;
                encodedPoints += x + ',' + y + ' ';
            });
            var polygon = this.createEl('polygon', {
                points: encodedPoints,
                style: style
            });
            this.svg.appendChild(polygon);
            return polygon;
        },

        randomColour: function () {
            var colours = ['chocolate', 'indianred', 'mediumslateblue', 'lavender', 'lightblue', 'darkorange', 'seagreen', 'navy', 'royalblue', 'olive', 'lightgoldenrodyellow', 'pink'];
            return colours[Math.floor(Math.random() * colours.length)];
        }
    };

    return surface;
});