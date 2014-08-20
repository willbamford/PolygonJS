define(
    [
        'polygonjs/Fn',
        'polygonjs/math/Vector3',
        'polygonjs/Mesh'
    ],
    function (Fn, Vector3, Mesh) {

        "use strict";

        var TrianglePlane = {};

        TrianglePlane.create = function (opts) {

            opts = opts || {};

            var triangleHeight = opts.triangleHeight || 1;
            var numWidthSegments = opts.numWidthSegments || 4;
            var numHeightSegments = opts.numHeightSegments || 4;

            var i, j;
            var x = 0, y = 0, z = 0;
            var vertices = [];
            var jlen;
            var faces = [];
            var isOdd = false;
            var offsetX = 0;
            var cx = -triangleHeight * numWidthSegments / 2;
            var cz = -triangleHeight * numHeightSegments / 2;

            var a, b, c;

            for (i = 0; i < numHeightSegments + 1; i++) {

                isOdd = (i % 2) === 1;

                if (isOdd) {
                    jlen = numWidthSegments + 1;
                    offsetX = 0;
                } else {
                    jlen = numWidthSegments;
                    offsetX = triangleHeight / 2;
                }

                x = 0;
                for (j = 0; j < jlen; j++) {
                    x = j * triangleHeight + offsetX;
                    var v = Vector3.create(x + cx, 0, z + cz);
                    vertices.push(v);
                }

                z += triangleHeight;
            }

            isOdd = false;
            var startOfNextStrip = numWidthSegments;
            for (i = numWidthSegments; i < vertices.length; i++) {
                if (i === startOfNextStrip) {
                    if (isOdd) startOfNextStrip += numWidthSegments;
                    else startOfNextStrip += numWidthSegments + 1;
                    isOdd = !isOdd;
                }
                if (isOdd) {
                    if (i < startOfNextStrip - 1) faces.push([i, i + 1, i - numWidthSegments]);
                    if (i < startOfNextStrip - 2) faces.push([i + 1, i - numWidthSegments + 1, i - numWidthSegments]);
                } else {
                    if (i < startOfNextStrip) faces.push([i, i - numWidthSegments, i - numWidthSegments - 1]);
                    if (i < startOfNextStrip - 1) faces.push([i, i + 1, i - numWidthSegments]);
                }
            }

            var instance = Mesh.create({
                vertices: vertices,
                faces: faces
            });

            return instance;
        };

        return TrianglePlane;
    }
);
