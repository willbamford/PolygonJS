define(
    [
        'polygonjs/entities/Model',
        'polygonjs/Entity',
        'polygonjs/meshes/Cube'
    ],
    function (Model, Entity, Cube) {

        "use strict";

        describe('Model', function () {

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