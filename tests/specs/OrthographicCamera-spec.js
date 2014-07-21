define(
    [
        'polygonjs/Entity',
        'polygonjs/cameras/Camera',
        'polygonjs/cameras/OrthographicCamera'
    ],
    function (Entity, Camera, OrthographicCamera) { 

        "use strict";

        describe('OrthographicCamera', function () {

            it('should "extend" Camera', function () {
                var camera = OrthographicCamera.create();
                expect(camera).toBeInstanceOf(Camera);
            });

            describe('create', function () {

                it('should be able to create new instances', function () {
                    var camera = OrthographicCamera.create();
                    expect(camera).toBeInstanceOf(OrthographicCamera);
                });

                it('should have an entity type of \'camera\'', function () {
                    var camera = Camera.create();
                    expect(camera.type).toBe('camera');
                });
            });
        });
    }
);