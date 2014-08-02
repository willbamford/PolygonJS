define(
    [
        'polygonjs/math/Vector2',
        'polygonjs/math/Vector3',
        'polygonjs/math/Matrix3',
        'polygonjs/math/Matrix4'
    ],
    function (Vector2, Vector3, Matrix3, Matrix4) {

        "use strict";

        var Profiler = function (opts) {

            var measurables = [
                { name: 'Vector2', class: Vector2 },
                { name: 'Vector3', class: Vector3 },
                { name: 'Matrix3', class: Matrix3 },
                { name: 'Matrix4', class: Matrix4 }
            ];

            measurables.forEach(function (measurable) {
                measurable.lastCount = 0;
                measurable.count = 0;
                measurable.delta = 0;
            });

            this.scene = opts.scene || null;
            this.measurables = measurables;
        };

        Profiler.create = function (opts) {
            return new Profiler(opts);
        };

        Profiler.prototype.measure = function () {
            this.measurables.forEach(function (measurable) {
                measurable.lastCount = measurable.count;
                measurable.count = measurable.class.instanceCount;
                measurable.delta = measurable.count - measurable.lastCount;
            });
            return this;
        };

        var createTitle = function (title) {
            var dashes = '';
            var i = title.length + 4;
            while (--i >= 0) dashes += '-';
            return dashes + '\n| ' + title + ' |\n' + dashes;
        };

        Profiler.prototype.toConsole = function () {
            console.log(createTitle('Object counts'));
            this.measurables.forEach(function (measurable) {
                console.log(measurable.name + ': ' + measurable.delta);
            });
            if (this.scene) {
                console.log(createTitle('Scene stats'));
                console.log('Polygon count: ' + this.scene.polygons.length);
                var polygons = this.scene.polygons;
                var i = polygons.length;
                var polygon;
                var culled = 0;
                var visible = 0;
                while (--i >= 0) {
                    polygon = polygons[i];
                    if (polygon.isCulled) {
                        culled++;
                    } else {
                        visible++;
                    }
                }
                console.log('Polygons culled: ' + culled + ', visible: ' + visible);
            }
            return this;
        };

        return Profiler;
    }
);