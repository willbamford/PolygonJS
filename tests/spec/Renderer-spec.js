define(
    [
        'polygonjs/Renderer',
        'polygonjs/surfaces/Canvas',
        'polygonjs/Scene'
    ],
    function (Renderer, Surface, Scene) {

        "use strict";

        describe('Renderer', function () {

            describe('create', function () {
                it('should create a new instance with the given scene and surface', function () {
                    var surface = Surface.create();
                    var scene = Scene.create();
                    var renderer = Renderer.create({
                        surface: surface,
                        scene: scene
                    });
                    expect(renderer.surface).toEqual(surface);
                    expect(renderer.scene).toEqual(scene);
                });
            });

            xdescribe('render', function () {});
        });
    }
);