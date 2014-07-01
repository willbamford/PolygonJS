define([], function () {

    var Renderer = function (opts) {
        opts = opts || {};
        this.surface = opts.surface;
        this.scene = opts.scene;
    };

    Renderer.create = function (opts) {
        return new Renderer(opts);
    };

    Renderer.prototype = {
        draw: function (delta) {
            
        }
    };

    return Renderer;
});