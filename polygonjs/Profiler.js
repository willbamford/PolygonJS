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

            var measurables = [
                { name: 'Vector2', object: Vector2 },
                { name: 'Vector3', object: Vector3 },
                { name: 'Matrix3', object: Matrix3 },
                { name: 'Matrix4', object: Matrix4 }
            ];

            measurables.forEach(function (measurable) {
                measurable.lastCount = 0;
                measurable.count = 0;
                measurable.delta = 0;
            });

            this.measurables = measurables;
        };

        Profiler.prototype.measure = function () {
            this.measurables.forEach(function (measurable) {
                measurable.lastCount = measurable.count;
                measurable.count = measurable.object.instanceCount;
                measurable.delta = measurable.count - measurable.lastCount;
            });
        };

        Profiler.prototype.toConsole = function () {
            console.log('Profiler:');
            this.measurables.forEach(function (measurable) {
                console.log(measurable.name + ': ' + measurable.delta);
            });
        };

        return Profiler;
    }
);