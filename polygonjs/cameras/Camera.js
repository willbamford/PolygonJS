define(
    [
        'polygonjs/Entity',
        'polygonjs/geom/Vector3',
        'polygonjs/geom/Matrix4'
    ],
    function (Entity, Vector3, Matrix4) {

        "use strict";

        var Camera = function (opts) {
            opts = opts || {};
            Entity.call(this, opts);
            this.type = 'camera';

            this.up = Vector3.UP.clone();
            this.right = Vector3.RIGHT.clone();
            this.forward = Vector3.FORWARD.clone();

            this.viewTransform = Matrix4.create();
            this.projectionTransform = Matrix4.create();
        };

        Camera.create = function (opts) {
            return new Camera(opts);
        };

        Camera.prototype = Object.create(Entity.prototype);

        Camera.prototype.lookAt = function (target) {
            
            var eye = this.worldPosition;
            var transform = this.viewTransform;

            var up = this.up.copy(Vector3.UP);
            var forward = this.forward.copy(eye).subtract(target).normalise();  // z-axis
            var right = this.right.copy(up).normal(forward);                    // x-axis
            up = up.copy(forward).normal(right);                                // y-axis

            transform.a = right.x; transform.b = right.y; transform.c = right.z;
            transform.d = -right.dotProduct(eye);

            transform.e = up.x; transform.f = up.y; transform.g = up.z;
            transform.h = -up.dotProduct(eye);

            transform.i = forward.x; transform.j = forward.y; transform.k = forward.z;
            transform.l = -forward.dotProduct(eye);

            transform.m = 0; transform.n = 0; transform.o = 0; transform.p = 1;
        };

        // Camera.prototype.update = function (delta) {
        //     Entity.prototype.update.call(this, delta);
        //     this.lookAt(this.target);
        // };

        return Camera;
    }
);