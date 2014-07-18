define(
    [
        'polygonjs/Entity',
        'polygonjs/cameras/Camera',
        'polygonjs/cameras/PerspectiveCamera'
    ],
    function (Entity, Camera, PerspectiveCamera) { 

        "use strict";

        describe('PerspectiveCamera', function () {

            it('should "extend" Camera', function () {
                var camera = PerspectiveCamera.create();
                expect(camera).toBeInstanceOf(Camera);
            });

            describe('create', function () {

                it('should be able to create new instances', function () {
                    var camera = PerspectiveCamera.create();
                    expect(camera).toBeInstanceOf(PerspectiveCamera);
                });

                it('should have an entity type of \'camera\'', function () {
                    var camera = Camera.create();
                    expect(camera.type).toBe('camera');
                });
            });
        });
    }
);