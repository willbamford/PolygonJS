define(
    [
        'polygonjs/Scene',
        'polygonjs/Entity',
        'polygonjs/entities/Camera',
        'polygonjs/entities/Light',
        'polygonjs/entities/Polygon',
        'polygonjs/entities/Model'
    ],
    function (Scene, Entity, Camera, Light, Polygon, Model) {

        "use strict";

        describe('Scene', function () {

            describe('create', function () {

                it('should be able to create new instance', function () {
                    var scene = Scene.create();
                    expect(scene instanceof Scene).toBe(true);
                });

                it('should default to a null scene graph', function () {
                    var scene = Scene.create();
                    expect(scene.root).toBe(null);
                });
            });


            describe('revalidate', function () {
                it('should rebuild top-level entity lists based on the scene graph (root)', function () {
                    var scene = Scene.create();
                    var root = Entity.create();
                    scene.root = root;
                    expect(scene.cameras).toEqual([]);
                    expect(scene.lights).toEqual([]);
                    expect(scene.polygons).toEqual([]);
                    expect(scene.models).toEqual([]);
                    scene.revalidate();

                    var entity1 = Entity.create();
                    var entity2 = Entity.create();
                    var entity3 = Entity.create();
                    var model1 = Model.create();
                    model1.addChild(Polygon.create()).addChild(Polygon.create());
                    entity1.addChild(model1);
                    entity3.addChild(Light.create()).addChild(Light.create()).addChild(Camera.create());
                    entity2.addChild(entity3).addChild(Camera.create());
                    root.addChild(Camera.create()).addChild(Light.create());
                    root.addChild(entity1).addChild(entity2);

                    expect(scene.cameras.length).toEqual(0);
                    expect(scene.lights.length).toEqual(0);
                    expect(scene.polygons.length).toEqual(0);
                    expect(scene.models.length).toEqual(0);

                    scene.revalidate();

                    expect(scene.cameras.length).toEqual(3);
                    expect(scene.lights.length).toEqual(3);
                    expect(scene.polygons.length).toEqual(2);
                    expect(scene.models.length).toEqual(1);
                });
            });

            describe('update', function () {
                it('should call update on the scene graph root', function () {
                    var scene = Scene.create();
                    scene.root = Entity.create();
                    var delta = 100;
                    spyOn(scene.root, 'update');
                    scene.update(delta);
                    expect(scene.root.update).toHaveBeenCalledWith(delta);
                });
            });

            describe('mainCamera', function () {

                var scene = Scene.create();
                    scene.root = Entity.create();
                    var camera = Camera.create();
                    scene.root.addChild(camera);
                    scene.revalidate();

                it('should default to first camera found in scene graph if not already set', function () {
                    expect(scene.mainCamera).toBe(camera);
                });

                it('should be possible to set the main camera on the scene', function () {
                    scene.mainCamera = scene.cameras[0];
                    expect(scene.mainCamera).toBe(camera);
                });
            });
        });
    }
);