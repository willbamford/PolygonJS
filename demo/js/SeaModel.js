define(
    [
        'polygonjs/entities/Model',
        'polygonjs/meshes/TrianglePlane',
        'polygonjs/Fn',
        'polygonjs/math/Vector3',
        'polygonjs/math/Color',
        'polygonjs/Material'
    ],
    function (Model, TrianglePlane, Fn, Vector3, Color, Material) {

        var Ripple = function (origin) {
            this.origin = origin;
            this.delta = Vector3.create(0, 0, 0);
        };

        Ripple.prototype = {
            displacementAt: function (time, position) {
                this.delta.copy(position).subtract(this.origin);
                var distance = this.delta.magnitude();
                var displacement = Math.sin((distance + time / 800) * 3) / 3;
                return displacement;
            }
        };

        var SeaModel = function (opts) {
            opts = opts || {};

            this.ripple = new Ripple(Vector3.create(0, 0, 0));
            this.time = 0;

            var mesh = TrianglePlane.create({
                triangleHeight: 0.5,
                numWidthSegments: 14,
                numHeightSegments: 14
            });

            opts = Fn.merge(Model.getOptsForMesh(mesh), opts);
            Model.call(this, opts);
            Fn.each(this.polygons, function (polygon) {
                polygon.material = Material.create({
                    color: Color.create({r: 0.2, g: 0.2, b: 1.0}),
                    specular: Color.WHITE.clone(),
                    shininess: 10
                });
            });
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
