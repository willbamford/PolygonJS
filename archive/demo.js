
var surface = {

    SVG_NS: 'http://www.w3.org/2000/svg',
    XML_NS: 'http://www.w3.org/2000/xmlns/',

    init: function () {
        var svg = this.create('svg', {
            style: 'border: 1px solid black',
            width: 640,
            height: 480
        });
        this.setAttrNS(svg, this.XML_NS, 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
        document.body.appendChild(svg);
        this.svg = svg;
    },
    create: function (name, attrs) {
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
        var line = this.create('line', {
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
        var circle = this.create('circle', {
            cx: x,
            cy: y,
            r: r,
            style: style
        });
        this.svg.appendChild(circle);
        return circle;
    }
};

var isoSurface = function () {
    init: function () {
        surface.init();
        this.surface = surface;
        this.objects = [];
        
    },
    add: function (type) {

    },
    remove: function (id) {

    },
    render: function () {

    }
};

var project = function (p) {

    var s = 10;
    var sx = sy = sz = s;

    /* Real Isometric */
    // var alpha = Math.PI / 6; // 30 degrees
    // var beta = alpha;
    // var x = (sx * p.x * Math.cos(alpha)) - (sy * p.y * Math.cos(beta));
    // var y = (sx * p.x * Math.sin(alpha)) + (sy * p.y * Math.sin(beta)) + (sz * p.z);

    // Game Isometric 
    var x = (p.x - p.z) * s;
    var y = (0.5 * (p.x + p.z) + p.y) * s;
    

    return {x: x, y: y};
};

var sandbox = {
    init: function () {

        // Z
        // | Y
        // |/
        // 0-- X

        var points = [
            {x: 0, y: 0, z: 0},
            {x: 1, y: 0, z: 0},
            {x: 0, y: 0, z: 1},
            {x: 1, y: 0, z: 1},

            {x: 0, y: 1, z: 0},
            {x: 1, y: 1, z: 0},
            {x: 0, y: 1, z: 1},
            {x: 1, y: 1, z: 1},

            // {x: 0, y: 0, z: 1},
            // {x: 1, y: 0, z: 1}
        ];

        // surface.init();

        // var lp = null;

        // points.forEach(function (point) {
        //     var p = project(point);
        //     surface.circle(p.x + 100, p.y + 100);

        //     if (lp) {
        //         surface.line(lp.x + 100, lp.y + 100, p.x + 100, p.y + 100);
        //     }

        //     lp = p;
        // });
    }
};

sandbox.init();