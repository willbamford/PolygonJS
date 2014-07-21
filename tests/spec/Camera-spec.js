define(
    [
        'polygonjs/cameras/Camera',
        'polygonjs/Entity',
        'polygonjs/math/Vector2',
        'polygonjs/math/Vector3',
        'polygonjs/math/Matrix4'
    ],
    function (Camera, Entity, Vector2, Vector3, Matrix4) { 

        "use strict";

        describe('Camera', function () {

            it('should "extend" Entity', function () {
                var camera = Camera.create();
                expect(camera).toBeInstanceOf(Entity);
            });

            describe('create', function () {

                it('should be able to create new instances', function () {
                    var camera = Camera.create();
                    expect(camera).toBeInstanceOf(Camera);
                });

                it('should have an entity type of \'camera\'', function () {
                    var camera = Camera.create();
                    expect(camera.type).toBe('camera');
                });

                it('should be initialised with an identity view and projection transform', function () {
                    var camera = Camera.create();
                    expect(camera.viewTransform.equals(Matrix4.IDENTITY)).toBeTruthy();
                    expect(camera.projectionTransform.equals(Matrix4.IDENTITY)).toBeTruthy();
                });
            });

            describe('lookAt', function () {
                it('should calculate the "look at" view transform', function () {
                    var camera = Camera.create();
                    var target = Vector3.create(100, 100, 0);
                    var eye = Vector3.create(100, 100, -100);
                    camera.worldPosition = eye;
                    camera.lookAt(target);
                    var expected = [
                        [-1, 0,  0,  100],
                        [ 0, 1,  0, -100],
                        [ 0, 0, -1, -100],
                        [ 0, 0,  0,    1]
                    ];
                    expect(camera.viewTransform.equals(Matrix4.create(expected))).toBeTruthy();
                });
            });

            // describe('update', function () {
            //     it('should call Entity prototype update method', function () {
            //         var camera = Camera.create();
            //         var delta = 100;
            //         spyOn(Entity.prototype, 'update');
            //         camera.update(delta);
            //         expect(Entity.prototype.update).toHaveBeenCalledWith(delta);
            //     });
            // });
        });
    }
);