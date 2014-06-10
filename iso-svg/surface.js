define(['iso-svg/lib'], function (lib) {

    var surface = {

        SVG_NS: 'http://www.w3.org/2000/svg',
        XML_NS: 'http://www.w3.org/2000/xmlns/',

        create: function (opts) {
            var instance = lib.create(this);
            return instance.init(opts);
        },

        init: function (opts) {
            opts = opts || {};
            opts.width = opts.width || 640;
            opts.height = opts.height || 480;
            var svg = this.createEl('svg', {
                style: 'border: 1px solid #eee',
                width: opts.width,
                height: opts.height
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
                x1: x1,
                x2: x2,
                y1: y1,
                y2: y2,
                style: style
            });
            this.svg.appendChild(line);
            return line;
        },

        circle: function (x, y, r, style) {
            r = r || 1;
            style = style || 'stroke: black';
            var circle = this.createEl('circle', {
                cx: x,
                cy: y,
                r: r,
                style: style
            });
            this.svg.appendChild(circle);
            return circle;
        }
    };

    return surface;
});