define(
    [
        'polygonjs/entities/Model',
        'polygonjs/entities/Polygon',
        'polygonjs/Entity',
        'polygonjs/meshes/Cube',
        'polygonjs/math/Vector3'
    ],
    function (Model, Polygon, Entity, Cube, Vector3) {

        "use strict";

        describe('Model', function () {

            var va = Vector3.create(0, 0, 1);
            var vb = Vector3.create(0, 1, 0);
            var vc = Vector3.create(0, 1, 1);
            var normal = Vector3.create(1, 0, 0);
            var vertices = [va, vb, vc];
            var worldVertices = [va, vb, vc];
            var viewVertices = [va, vb, vc];
            var screenVertices = [va, vb, vc];
            var polygons = [Polygon.create({
                vertices: vertices,
                normal: normal
            })];

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

                it('should be able to initialise vertices and polygons', function () {
                    var opts = {
                        vertices: vertices,
                        worldVertices: worldVertices,
                        viewVertices: viewVertices,
                        screenVertices: screenVertices,
                        polygons: polygons
                    };
                    var model = Model.create(opts);
                    expect(model.vertices).toBe(vertices);
                    expect(model.worldVertices).toBe(worldVertices);
                    expect(model.viewVertices).toBe(viewVertices);
                    expect(model.screenVertices).toBe(screenVertices);
                    expect(model.polygons).toBe(polygons);
                });

                it('should add polygons as children', function () {
                    var polygons = [
                        Polygon.create(),
                        Polygon.create()
                    ];
                    var model = Model.create({polygons: polygons});
                    expect(model.polygons).toBe(polygons);
                    expect(model.children.length).toBe(polygons.length);
                });
            });

            describe('createFromMesh', function () {

                var cube = Cube.create();

                it('should create model with zero world, view and screen vertex arrays', function () {
                    var model = Model.createFromMesh(cube);
                    expect(model.vertices).toBe(cube.vertices);
                    expect(model.worldVertices.length).toBe(8);
                    expect(model.viewVertices.length).toBe(8);
                    expect(model.screenVertices.length).toBe(8);
                });

                it('should create polygons and pass these along to the constructor', function () {
                    var model = Model.createFromMesh(cube);
                    expect(model.polygons.length).toBe(6);
                });
            });
        });
    }
);