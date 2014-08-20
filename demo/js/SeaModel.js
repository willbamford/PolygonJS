define(
    [
        'polygonjs/entities/Model',
        'polygonjs/meshes/TrianglePlane',
        'polygonjs/Fn'
    ],
    function (Model, TrianglePlane, Fn) {

        var SeaModel = function (opts) {
            opts = opts || {};

            var mesh = TrianglePlane.create({
                triangleHeight: 0.5,
                numWidthSegments: 10,
                numHeightSegments: 10
            });

            opts = Fn.merge(Model.getOptsForMesh(mesh), opts);
            Model.call(this, opts);
        };

        SeaModel.create = function (opts) {
            return new SeaModel(opts);
        };

        SeaModel.prototype = Object.create(Model.prototype);

        return SeaModel;
    }
)
