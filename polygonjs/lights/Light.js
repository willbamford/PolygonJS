define(
    [
        'polygonjs/Entity',
        'polygonjs/math/Color'
    ],
    function (Entity, Color) {

        "use strict";

        var Light = function (opts) {
            opts = opts || {};
            Entity.call(this, opts);
            this.type = 'light';
            this.color = opts.color || Color.WHITE.clone();
            this.specular = opts.specular !== undefined ? opts.specular : Color.WHITE.clone();
            this.intensity = opts.intensity !== undefined ? opts.intensity : 1.0;
        };

        Light.create = function (opts) {
            return new Light(opts);
        };

        Light.prototype = Object.create(Entity.prototype);

        return Light;
    }
);
