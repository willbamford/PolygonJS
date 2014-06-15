define(
    ['iso-svg/lib', 'iso-svg/math', 'iso-svg/Mesh', 'iso-svg/meshes/Icosahedron'],
    function (lib, math, Mesh, Icosahedron) {

        "use strict";

        var Sphere = function (opts) {

            var icosahedron = Icosahedron.create();
            var vs = icosahedron.vertices;
            var fs = icosahedron.faces;
            var vertices = vs;
            var faces = fs;
            var levelOfDetail = 2;
            var a, b, c, ab, bc, ca, ai, bi, ci, abi, bci, cai, abk, bck, cak;
            var map = {};
            var key = function (i1, i2) {
                return i1 < i2 ? i1 + ',' + i2 : i2 + ',' + i1;
            };

            while (--levelOfDetail >= 0) {

                faces = [];

                lib.each(fs, function (face, faceIndex) {

                    a = vs[face[0]];
                    b = vs[face[1]];
                    c = vs[face[2]];

                    ai = face[0];
                    bi = face[1];
                    ci = face[2];

                    abk = key(ai, bi);
                    bck = key(bi, ci);
                    cak = key(ci, ai);

                    if (map[abk]) {
                        abi = map[abk];
                    } else {
                        ab = math.normalise(math.mean([vs[face[0]], vs[face[1]]]));
                        // if (levelOfDetail === 0) math.scale(ab, 0.9);
                        abi = vertices.length; vertices.push(ab);
                        map[abk] = abi;
                    }

                    if (map[bck]) {
                        bci = map[bck];
                    } else {
                        bc = math.normalise(math.mean([vs[face[1]], vs[face[2]]]));
                        // if (levelOfDetail === 0) math.scale(bc, 0.9);
                        bci = vertices.length; vertices.push(bc);
                        map[bck] = bci;
                    }

                    if (map[cak]) {
                        cai = map[cak];
                    } else {
                        ca = math.normalise(math.mean([vs[face[2]], vs[face[0]]]));
                        // if (levelOfDetail === 0) math.scale(ca, 0.9);
                        cai = vertices.length; vertices.push(ca);
                        map[cak] = cai;
                    }

                    faces.push([ai, abi, cai]);
                    faces.push([abi, bi, bci]);
                    faces.push([cai, bci, ci]);
                    faces.push([cai, abi, bci]);
                });

                fs = faces;
            }

            return Mesh.create({
                vertices: vertices,
                faces: faces
            });
        };

        Sphere.create = function () {
            return new Sphere({
                levelOfDetail: 1
            });
        };

        return Sphere;
    }
);