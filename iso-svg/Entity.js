define(
    [
        'iso-svg/lib',
        'iso-svg/geom/Vector3',
        'iso-svg/geom/Matrix3'
    ],
    function (lib, Vector3, Matrix3) {

        "use strict";

        var Entity = function (opts) {
            this.parent = null;

            this.position = Vector3.create(0, 0, 0);
            this.rotation = Matrix3.IDENTITY.copy();
            this.scale    = Vector3.create(1, 1, 1);

            this.children = [];
        };

        Entity.create = function (opts) {
            return new Entity(opts);
        };

        return Entity;
    }
);