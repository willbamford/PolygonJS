define(
    [
        'polygonjs/cameras/Camera',
        'polygonjs/geom/Matrix4'
    ],
    function (Camera, Matrix4) {

        "use strict";

        var OrthographicCamera = function (opts) {
            opts = opts || {};
            Camera.call(this, opts);

            this.width = opts.width || 6.4;
            this.height = opts.height || 4.8;
            this.nearZ = opts.nearZ || 0;
            this.farZ = opts.farZ || 100;

            this.updateProjectionTransform();
        };

        OrthographicCamera.create = function (opts) {
            return new OrthographicCamera(opts);
        };

        OrthographicCamera.createProjectionTransform = function (width, height, nearZ, farZ, transform) {
            var m = transform || Matrix4.create();
            var depthZ = farZ - nearZ;
            m.a = 2 / width; m.b = 0;          m.c = 0;          m.d = 0;
            m.e = 0;         m.f = 2 / height; m.g = 0;          m.h = 0;
            m.i = 0;         m.j = 0;          m.k = -2 / depthZ; m.l = -(farZ + nearZ) / depthZ;
            m.m = 0;         m.n = 0;          m.o = 0;          m.p = 1;
            return m;
        };

        OrthographicCamera.prototype = Object.create(Camera.prototype);

        OrthographicCamera.prototype.updateProjectionTransform = function () {
            this.projectionTransform = OrthographicCamera.createProjectionTransform(
                this.width, this.height,
                this.nearZ, this.farZ,
                this.projectionTransform
            );
        };

        return OrthographicCamera;
    }
);