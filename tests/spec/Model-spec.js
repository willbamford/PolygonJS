define(
    [
        'polygonjs/entities/Model',
        'polygonjs/Entity',
        'polygonjs/meshes/Cube',
        'polygonjs/geom/Vector3'
    ],
    function (Model, Entity, Cube, Vector3) {

        "use strict";

        describe('Model', function () {

            var vertices = [Vector3.create(0, 0, 1), Vector3.create(0, 1, 0), Vector3.create(0, 1, 1)];
            var normals = [Vector3.create(1, 0, 0)];

            it('should "extend" Entity', function () {
                var p = Model.create();
                expect(p instanceof Model).toBe(true);
                expect(p instanceof Entity).toBe(true);
            });

            describe('create', function () {

                it('should create a new model entity', function () {
                    var model = Model.create();
                    expect(model instanceof Model).toBe(true);
                    expect(model instanceof Entity).toBe(true);
                });

                it('should have an entity type of "model"', function () {
                    var model = Model.create();
                    expect(model.type).toBe('model');
                });

                it('should be able to set vertices and normals', function () {
                    var opts = {
                        vertices: vertices,
                        normals: normals
                    };
                    var model = Model.create(opts);
                    expect(model.vertices).toBe(vertices);
                    expect(model.normals).toBe(normals);
                });

                it('should initialise world, view and screen vertices', function () {
                    var opts = {
                        vertices: vertices,
                        normals: normals
                    };
                    var model = Model.create(opts);
                    expect(model.worldVertices.length).toBe(vertices.length);
                    expect(model.viewVertices.length).toBe(vertices.length);
                    expect(model.screenVertices.length).toBe(vertices.length);
                });
            });

            describe('createFromMesh', function () {

                var cube = Cube.create();
                var model = Model.createFromMesh(cube);

                // it('should initialise the world vertices to zero vectors', function () {
                //     model.worldVet
                // });

                // it('should create a child polygon entity for each face in the mesh', function () {
                //     expect(model.children.length).toBe(6);
                // });
            });
        });
    }
);