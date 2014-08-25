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
                var displacement = Math.sin((distance * 2 + time / 800) * 3) / 4;
                return displacement;
            }
        };

        var SeaModel = function (opts) {
            opts = opts || {};

            this.ripple = new Ripple(Vector3.create(0, 0, 0));
            this.time = 0;

            var mesh = TrianglePlane.create({
                triangleHeight: 0.8,
                numWidthSegments: 12,
                numHeightSegments: 12
            });

            var makeColor = function () {
                var r = Math.random() / 5;
                r *= r;
                var g = 0.5 + Math.random() / 5;
                // g *= g;
                var b = 0.3 + (1 - g) + 0.5 * Math.random(); //0.8 + Math.random() / 5;
                return {
                    r: r,
                    g: g,
                    b: b
                };
            };

            opts = Fn.merge(Model.getOptsForMesh(mesh), opts);
            Model.call(this, opts);
            Fn.each(this.polygons, function (polygon) {
                polygon.material = Material.create({
                    color: Color.create(makeColor()).clamp(),
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
