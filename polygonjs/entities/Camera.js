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
            this.viewTransform = Matrix4.create();
            this.projectionTransform = Matrix4.create();
        };

        Camera.create = function (opts) {
            return new Camera(opts);
        };

        Camera.calculateLookAtViewTransform = function (transform, eye, up, target) {

            var forward = eye.subtract(target).normalised(); // z-axis
            var right = up.normal(forward); // x-axis
            up = forward.normal(right); // y-axis

            transform.a = right.x; transform.b = right.y; transform.c = right.z;
            transform.d = -right.dotProduct(eye);

            transform.e = up.x; transform.f = up.y; transform.g = up.z;
            transform.h = -up.dotProduct(eye);

            transform.i = forward.x; transform.j = forward.y; transform.k = forward.z;
            transform.l = -forward.dotProduct(eye);

            transform.m = 0; transform.n = 0; transform.o = 0; transform.p = 1;
        };

        Camera.prototype = Object.create(Entity.prototype);

        Camera.prototype.lookAt = function (target) {
            var eye = this.getWorldPosition();
            Camera.calculateLookAtViewTransform(
                this.viewTransform, eye, this.up, target
            );
        };

        // Camera.prototype.update = function (delta) {
        //     Entity.prototype.update.call(this, delta);
        //     this.lookAt(this.target);
        // };

        return Camera;
    }
);