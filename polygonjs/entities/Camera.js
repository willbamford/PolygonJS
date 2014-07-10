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

            this.up = Vector3.UP.copy();
            this.viewTransform = Matrix4.create();
        };

        Camera.create = function (opts) {
            return new Camera(opts);
        };

        // TODO: test
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


        // TODO: test
        Camera.createOrthographicProjectionTransform = function (width, height, near, far) {
            var m = Matrix4.create();
            var depth = far - near;
            m.a = 2 / width; m.b = 0;          m.c = 0;          m.d = 0;
            m.e = 0;         m.f = 2 / height; m.g = 0;          m.h = 0;
            m.i = 0;         m.j = 0;          m.k = -2 / depth; m.l = -(far + near) / depth;
            m.m = 0;         m.n = 0;          m.o = 0;          m.p = 1;
            return m;
        };

        // TODO: test
        Camera.createFrustum = function (left, right, bottom, top, nearZ, farZ) {

            var m = Matrix4.create();
            var w = right - left;
            var h = top - bottom;
            var d = farZ - nearZ;

            m.a = 2 * nearZ / w;
            m.b = 0;
            m.c = 0;
            m.d = 0;

            m.e = 0;
            m.f = 2 * nearZ / h;
            m.g = 0;
            m.h = 0;

            m.i = (right + left) / w;
            m.j = (top + bottom) / h;
            m.k = -(farZ + nearZ) / d;
            m.l = -1;

            m.m = 0;
            m.n = 0;
            m.o = -2 * farZ * nearZ / d;
            m.p = 0;

            return m;
        };

        // TODO: test
        Camera.createPerspectiveProjectionTransform = function (fieldOfViewY, aspectRatio, nearZ, farZ) {

            var maxY = nearZ * Math.tan(fieldOfViewY * Math.PI / 360.0);
            var minY = -maxY;
            var minX = minY * aspectRatio;
            var maxX = -minX;
            return Camera.createFrustum(minX, maxX, minY, maxY, nearZ, farZ);
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
        //     this.worldPosition
        //     this.lookAt(this.target)
        // };

        return Camera;
    }
);