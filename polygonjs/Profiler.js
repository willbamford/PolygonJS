define(
    [
        'polygonjs/geom/Vector2',
        'polygonjs/geom/Vector3',
        'polygonjs/geom/Matrix3',
        'polygonjs/geom/Matrix4'
    ],
    function (Vector2, Vector3, Matrix3, Matrix4) {

        "use strict";

        var Profiler = function () {

            this.measurables = {
                Vector2: {
                    constructor: Vector2
                },
                Vector3: {
                    constructor: Vector3
                },
                Matrix3: {
                    constructor: Matrix3
                },
                Matrix4: {
                    constructor: Matrix4
                }
            };

            this.measurables.forEach(function (measurable) {
                measurable.instanceCount = 0;
                measurable.instanceDelta = 0;
            });
        };

        Profiler.prototype.measure = function () {

            // this.

            // var lastVector2 = this.vector2;
            // var lastVector3 = this.vector3;
            // var lastMatrix3 = this.matrix3;
            // var lastMatrix4 = this.matrix4;

            // var vector2 = Vector2.numInstances;
            // var vector3 = Vector3.numInstances;
            // var matrix3 = Matrix3.numInstances;
            // var matrix4 = Matrix4.numInstances;
        };

        return Profiler;
    }
);