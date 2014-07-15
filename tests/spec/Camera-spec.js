define(
    [
        'polygonjs/entities/Camera',
        'polygonjs/Entity',
        'polygonjs/geom/Vector2',
        'polygonjs/geom/Vector3',
        'polygonjs/geom/Matrix4'
    ],
    function (Camera, Entity, Vector2, Vector3, Matrix4) { 

        "use strict";

        describe('Camera', function () {

            it('should "extend" Entity', function () {
                var p = Camera.create();
                expect(p instanceof Camera).toBe(true);
                expect(p instanceof Entity).toBe(true);
            });

            describe('create', function () {

                it('should be able to create new instances', function () {
                    var camera = Camera.create();
                    expect(camera instanceof Camera).toBeTruthy();
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

                it('should have a default \'up\' vector pointing positively along y-axis', function () {
                    var camera = Camera.create();
                    expect(camera.up.equals(Vector3.create(0, 1, 0))).toBeTruthy();
                });
            });

            describe('calculateLookAtViewTransform', function () {
                it('should calculate the look at view transform', function () {
                    var eye = Vector3.create(100, 100, -100);
                    var up = Vector3.create(0, 1, 0);
                    var target = Vector3.create(100, 100, 0);

                    var m = Matrix4.create();
                    Camera.calculateLookAtViewTransform(m, eye, up, target);
                    var expected = [
                        [-1, 0,  0,  100],
                        [ 0, 1,  0, -100],
                        [ 0, 0, -1, -100],
                        [ 0, 0,  0,    1]
                    ];
                    expect(m.equals(Matrix4.create(expected))).toBeTruthy();
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