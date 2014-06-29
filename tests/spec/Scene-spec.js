define(
    [
        'polygonjs/Scene',
        'polygonjs/Entity',
        'polygonjs/entities/Camera',
        'polygonjs/entities/Light',
        'polygonjs/entities/Polygon'
    ],
    function (Scene, Entity, Camera, Light, Polygon) {

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
                    scene.revalidate();

                    var entity1 = Entity.create();
                    var entity2 = Entity.create();
                    var entity3 = Entity.create();

                    entity1.addChild(Polygon.create()).addChild(Polygon.create());
                    entity3.addChild(Light.create()).addChild(Light.create()).addChild(Camera.create());
                    entity2.addChild(entity3).addChild(Camera.create());
                    root.addChild(Camera.create()).addChild(Light.create());
                    root.addChild(entity1).addChild(entity2);

                    expect(scene.cameras.length).toEqual(0);
                    expect(scene.lights.length).toEqual(0);
                    expect(scene.polygons.length).toEqual(0);

                    scene.revalidate();

                    expect(scene.cameras.length).toEqual(3);
                    expect(scene.lights.length).toEqual(3);
                    expect(scene.polygons.length).toEqual(2);
                });
            });
        });
    }
);