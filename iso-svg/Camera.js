define(['iso-svg/lib', 'iso-svg/math', 'iso-svg/Entity'], function (lib, math, Entity) {

    var Camera = function (opts) {

        this.zoom = opts.zoom || 1;
        this.mode = opts.mode || Camera.ISOMETRIC;

        switch (this.mode) {
            case Camera.ORTHOGRAPHIC:
                this.facingVector = [-1, 0, 0];
                this.projectToScreen = Camera.orthographicProjection;
                break;
            case Camera.ISOMETRIC:
                this.facingVector = [-1, -1, -1];
                this.projectToScreen = Camera.isometricProjection;
                break;
        }

        math.normalise(this.facingVector);
    };

    Camera.ORTHOGRAPHIC = 'orthographic';
    Camera.ISOMETRIC = 'isometric';

    Camera.orthographicProjection = function (v) {
        return [v[1], -v[2]]; // (y, z)
    };

    Camera.isometricProjection = function (v) {
        var vx = v[0], vy = v[1], vz = -v[2];
        var alpha = Math.PI / 6; // 30 degrees
        var beta = alpha;
        var x = (vx * Math.cos(alpha)) - (vy * Math.cos(beta));
        var y = (vx * Math.sin(alpha)) + (vy * Math.sin(beta)) + vz;
        return [x, y];
    };

    Camera.create = function (opts) {
        return new Camera(opts);
    };

    Camera.prototype.project = function (v) {
        var point = this.projectToScreen(v);
        point = math.scale(point, this.zoom);
        return point;
    };

    Camera.prototype.distanceSort = function (vertices) {

        

    };

    return Camera;
});