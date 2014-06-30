define(
    [
        'polygonjs/entities/Polygons',
        'polygonjs/Entity',
        'polygonjs/meshes/Cube'
    ],
    function (Polygons, Entity, Cube) {

        "use strict";

        describe('Polygons', function () {

            it('should "extend" Entity', function () {
                var p = Polygons.create();
                expect(p instanceof Polygons).toBe(true);
                expect(p instanceof Entity).toBe(true);
            });

            describe('createFromMesh', function () {

                var cube = Cube.create();
                var polygons = Polygons.createFromMesh(cube);

                it('should create a new polygons entity', function () {
                    expect(polygons instanceof Polygons).toBe(true);
                });

                it('should create a child polygon entity for each face in the mesh', function () {
                    expect(polygons.children.length).toBe(12);
                });
            });
        });
    }
);