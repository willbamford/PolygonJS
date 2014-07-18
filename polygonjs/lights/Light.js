define(
    ['polygonjs/Entity'],
    function (Entity) {

        "use strict";

        var Light = function () {
            var opts = {};
            Entity.call(this, opts);
            this.type = 'light';
            
            // this.color = opts.colour;
        };

        Light.create = function () {
            return new Light();
        };

        Light.prototype = Object.create(Entity.prototype);

        return Light;
    }
);