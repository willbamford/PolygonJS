define(
    [
        'polygonjs/Entity',
        'polygonjs/geom/Vector3'
    ],
        function (Entity, Vector3) {

        var Camera = function (opts) {
            opts = opts || {};
            Entity.call(this, opts);

            this.upVector = opts.upVector || Vector3.create(0, 1, 0);
            this.targetVector = opts.targetVector || Vector3.create(0, 0, 0);
            this.viewTransform;
        };

        Camera.create = function (opts) {
            return new Camera(opts);
        };

        Camera.prototype = Object.create(Entity.prototype);

        Camera.prototype.update = function (delta) {
            Entity.prototype.update.call(this, delta);


        };

        return Camera;
    }
);