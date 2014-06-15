define(
    ['iso-svg/lib', 'iso-svg/math', 'iso-svg/Mesh', 'iso-svg/meshes/icosahedron'],
    function (lib, math, Mesh, icosahedron) {

        "use strict";

        var Sphere = function (opts) {

            
            
            // this.map = {};
            // this.levelOfDetail = opts.levelOfDetail || 0;

            // var self = this;
            // var vertices = [];
            // var faces = [];
            // var i;
            // var faceLength;
            // var mapIndex;
            // var va, vb;

            // lib.each(icosahedron.vertices, function (vertex, vertexIndex) {
            //     self.map['(' + vertexIndex + ')'] = vertex;
            // });

            // lib.each(icosahedron.faces, function (face, faceIndex) {
                
            //     faceLength = face.length;
            //     for (i = 0; i < faceLength; i++) {
            //         if (i + 1 < faceLength) {
            //             mapIndex = '(' + face[i] + '|' + face[i + 1] + ')';
            //             if (!self.map[mapIndex]) {
            //                 va = icosahedron.vertices[face[i]];
            //                 vb = icosahedron.vertices[face[i +1]];
            //                 console.log(va);
            //                 self.map[mapIndex] = math.mean([va, vb]);
            //                 console.log(mapIndex);
            //                 console.log(self.map[mapIndex]);
            //             }
            //         }
            //     }
            // });
        };

        Sphere.create = function () {
            return new Sphere({
                levelOfDetail: 1
            });
        };

        return Sphere;
    }
);