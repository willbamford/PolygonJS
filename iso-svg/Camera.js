define(
    [
        'iso-svg/lib',
        'iso-svg/geom/Vector2',
        'iso-svg/geom/Vector3',
        'iso-svg/math',
        'iso-svg/Entity'
    ],
    function (lib, Vector2, Vector3, math, Entity) {

        var Camera = function (opts) {

            this.zoom = opts.zoom || 1;
            this.mode = opts.mode || Camera.ISOMETRIC;

            switch (this.mode) {
                case Camera.ORTHOGRAPHIC:
                    this.facingVector = Vector3.create(-1, 0, 0);
                    this.projectToScreen = Camera.orthographicProjection;
                    break;
                case Camera.ISOMETRIC:
                    this.facingVector = Vector3.create(-1, -1, -1);
                    this.projectToScreen = Camera.isometricProjection;
                    break;
            }

            this.facingVector.normalise();
        };

        Camera.ORTHOGRAPHIC = 'orthographic';
        Camera.ISOMETRIC = 'isometric';

        Camera.orthographicProjection = function (v) {
            return Vector2.create(v.y, -v.z);
        };

        Camera.isometricProjection = function (v) {
            var vx = v.x, vy = v.y, vz = -v.z;
            var alpha = Math.PI / 6; // 30 degrees
            var beta = alpha;
            var x = (vx * Math.cos(alpha)) - (vy * Math.cos(beta));
            var y = (vx * Math.sin(alpha)) + (vy * Math.sin(beta)) + vz;
            return Vector2.create(x, y);
        };

        Camera.create = function (opts) {
            return new Camera(opts);
        };

        Camera.prototype.project = function (v) {
            var point = this.projectToScreen(v);
            point = point.multiply(this.zoom); // math.scale(point, this.zoom);
            return point;
        };

        Camera.prototype.distanceSort = function (vertices) {
            var self = this;
            var eye = math.scale(this.facingVector, 100);
            var sorted = vertices.map(function (v, i) { return {v: v, i: i}; });
            // sorted.sort(function (a, b) {
            //     return math.distanceSquared(b.v, eye) - math.distanceSquared(a.v, eye);
            // });
            sorted.sort(function (a, b) {
                return a.v.dotProduct(self.facingVector) - b.v.dotProduct(self.facingVector);
                //return math.dotProduct(a.v, self.facingVector) - math.dotProduct(b.v, self.facingVector);
            });
            return sorted.map(function (o) { return o.i; });
        };

        return Camera;
    }
);