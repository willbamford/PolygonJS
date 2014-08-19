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

            var a, b, c;

            for (i = 0; i < numWidthSegments + 1; i++) {

                isOdd = (i % 2) === 1;

                if (isOdd) {
                    jlen = numHeightSegments - 1;
                    z = 0; //triangleHeight / 2;
                } else {
                    jlen = numHeightSegments;
                    z = 0;
                }

                console.log('Starting Z: ' + z);

                for (j = 0; j < jlen; j++) {
                    var v = Vector3.create(x, 0, z);
                    vertices.push(v);
                    z += triangleHeight;
                }

                x += triangleHeight;

                // if (prevStrip) {
                //     if (isOdd) {
                //         for (j = 0; j < (jlen - 1); j++) {
                //             a = strip[j];
                //             b = strip[j + 1];
                //             c = prevStrip[j];
                //         }
                //     } else {

                //     }
                // }
            }

            var instance = Mesh.create({
                vertices: [
                    Vector3.create(0, 0, 0),
                    Vector3.create(1, 0, 0),
                    Vector3.create(1, 0, 1),
                    Vector3.create(0, 0, 1)
                ],
                faces: [
                    [2, 1, 0]
                ]
            });

            return instance;

            // var vertices = Vector3.createFromArrays([
            //     [ 1,  1,  1], // 0
            //     [ 1,  1, -1], // 1
            //     [ 1, -1,  1], // 2
            //     [ 1, -1, -1], // 3
            //     [-1,  1,  1], // 4
            //     [-1,  1, -1], // 5
            //     [-1, -1,  1], // 6
            //     [-1, -1, -1]  // 7
            // ]);
            //
            // var instance = Mesh.create({
            //     vertices: vertices,
            //     faces: [
            //         [0, 2, 3, 1], // Right
            //         [5, 7, 6, 4], // Left
            //         [4, 6, 2, 0], // Front
            //         [1, 3, 7, 5], // Back
            //         [0, 1, 5, 4], // Top
            //         [7, 3, 2, 6], // Bottom
            //     ]
            // });
            //
            // return instance;
        };

        return TrianglePlane;
    }
);
