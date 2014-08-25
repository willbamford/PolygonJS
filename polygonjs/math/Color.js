define(['polygonjs/math/PMath'], function (PMath) {

    var Color = function (opts) {
        opts = opts || {};
        this.r = opts.r || 0;
        this.g = opts.g || 0;
        this.b = opts.b || 0;
    };

    Color.create = function (opts) {
        return new Color(opts);
    };

    Color.prototype = {

        equals: function (color) {
            return PMath.equals(this.r, color.r) &&
                PMath.equals(this.g, color.g) &&
                PMath.equals(this.b, color.b);
        },

        clone: function () {
            return Color.create({r: this.r, g: this.g, b: this.b});
        },

        copy: function (color) {
            this.r = color.r;
            this.g = color.g;
            this.b = color.b;
            return this;
        },

        add: function (color) {
            this.r += color.r;
            this.g += color.g;
            this.b += color.b;
            return this;
        },

        subtract: function (color) {
            this.r -= color.r;
            this.g -= color.g;
            this.b -= color.b;
            return this;
        },

        multiply: function (color) {
            this.r *= color.r;
            this.g *= color.g;
            this.b *= color.b;
            return this;
        },

        multiplyScalar: function (v) {
            this.r *= v;
            this.g *= v;
            this.b *= v;
            return this;
        },

        clamp: function () {
            this.r = PMath.clamp(this.r, 0.0, 1.0);
            this.g = PMath.clamp(this.g, 0.0, 1.0);
            this.b = PMath.clamp(this.b, 0.0, 1.0);
            return this;
        },

        setRGB: function (r, g, b) {
            this.r = r;
            this.g = g;
            this.b = b;
            return this;
        },

        getHex: function () {
            return ((this.r * 255) << 16) ^
                ((this.g * 255) << 8) ^
                ((this.b * 255) << 0);
        },

        setHex: function (hex) {
            hex = Math.floor(hex);
            this.r = ((hex & 0xff0000) >> 16) / 255;
            this.g = ((hex & 0x00ff00) >> 8) / 255;
            this.b = (hex & 0x0000ff) / 255;
            return this;
        },

        getHexStyle: function () {
    		return '#' + ('000000' + this.getHex().toString(16)).slice(-6);
    	},

        randomise: function () {
            this.r = Math.random();
            this.g = Math.random();
            this.b = Math.random();
            return this;
        }
    };

    Color.BLACK = Color.create({r: 0, g: 0, b: 0});
    Color.WHITE = Color.create({r: 1, g: 1, b: 1});
    Color.RED = Color.create({r: 1, g: 0, b: 0});
    Color.GREEN = Color.create({r: 0, g: 1, b: 0});
    Color.BLUE = Color.create({r: 0, g: 0, b: 1});
    Color.CYAN = Color.create({r: 0, g: 1, b: 1});
    Color.MAGENTA = Color.create({r: 1, g: 0, b: 1});
    Color.YELLOW = Color.create({r: 1, g: 1, b: 0});

    return Color;
});
