define(
    [
        'polygonjs/entities/Model',
        'polygonjs/meshes/TrianglePlane',
        'polygonjs/Fn',
        'polygonjs/math/Vector3'
    ],
    function (Model, TrianglePlane, Fn, Vector3) {

        var Ripple = function (origin) {
            this.origin = origin;
            this.delta = Vector3.create(0, 0, 0);
        };

        Ripple.prototype = {
            displacementAt: function (time, position) {
                this.delta.copy(position).subtract(this.origin);
                var distance = this.delta.magnitude();
                var displacement = Math.sin(distance * 2 + time / 400) / 2;
                return displacement;
            }
        };

        var SeaModel = function (opts) {
            opts = opts || {};

            this.ripple = new Ripple(Vector3.create(0, 0, 0));
            this.time = 0;

            var mesh = TrianglePlane.create({
                triangleHeight: 0.5,
                numWidthSegments: 12,
                numHeightSegments: 12
            });

            opts = Fn.merge(Model.getOptsForMesh(mesh), opts);
            Model.call(this, opts);
        };

        SeaModel.create = function (opts) {
            return new SeaModel(opts);
        };

        SeaModel.prototype = Object.create(Model.prototype);

        SeaModel.prototype.update = function (delta) {

            this.time += delta;

            var ripple = this.ripple,
                time = this.time,
                displacement;

            Fn.each(this.vertices, function (vertex) {
                displacement = ripple.displacementAt(time, vertex);
                vertex.y = displacement;
            });

            Fn.each(this.polygons, function (polygon) {
                polygon.updateNormal();
            });

            Model.prototype.update.call(this, delta);
        };

        return SeaModel;
    }
)
