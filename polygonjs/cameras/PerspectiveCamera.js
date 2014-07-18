define(
    [
        'polygonjs/cameras/Camera',
        'polygonjs/math/Matrix4'
    ],
    function (Camera, Matrix4) {

        "use strict";

        var PerspectiveCamera = function (opts) {
            opts = opts || {};
            Camera.call(this, opts);

            this.fieldOfViewY = opts.fieldOfViewY || 60;
            this.aspectRatio = opts.aspectRatio || 1.25;
            this.nearZ = opts.nearZ || 1;
            this.farZ = opts.farZ || 100;

            this.updateProjectionTransform();
        };

        PerspectiveCamera.create = function (opts) {
            return new PerspectiveCamera(opts);
        };

        PerspectiveCamera.createProjectionTransform = function (fieldOfViewY, aspectRatio, nearZ, farZ, transform) {
            var maxY = nearZ * Math.tan(fieldOfViewY * Math.PI / 360.0);
            var minY = -maxY;
            var minX = minY * aspectRatio;
            var maxX = -minX;
            return PerspectiveCamera.createFrustum(minX, maxX, minY, maxY, nearZ, farZ, transform);
        };

        PerspectiveCamera.createFrustum = function (left, right, bottom, top, nearZ, farZ, transform) {

            var m = transform || Matrix4.create();
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

        PerspectiveCamera.prototype = Object.create(Camera.prototype);

        PerspectiveCamera.prototype.updateProjectionTransform = function () {
            this.projectionTransform = PerspectiveCamera.createProjectionTransform(
                this.fieldOfViewY,
                this.aspectRatio,
                this.nearZ, this.farZ,
                this.projectionTransform
            );
        };

        return PerspectiveCamera;
    }
);