define(['polygonjs/math/MissingMath'], function (MMath) {

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
            return MMath.equals(this.r, color.r) &&
                MMath.equals(this.g, color.g) &&
                MMath.equals(this.b, color.b);
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
            this.r = MMath.clamp(this.r, 0.0, 1.0);
            this.g = MMath.clamp(this.g, 0.0, 1.0);
            this.b = MMath.clamp(this.b, 0.0, 1.0);
            return this;
        },

        getHex: function () {
            return ((this.r * 255) << 16) |
                ((this.g * 255) << 8) |
                ((this.b * 255) << 0);
        },

        setHex: function (hex) {
            hex = Math.floor(hex);
            this.r = ((hex & 0xff0000) >> 16) / 255;
            this.g = ((hex & 0x00ff00) >> 8) / 255;
            this.b = (hex & 0x0000ff) / 255;
            return this;
        }
    };

    return Color;
});