define(
    [
        'polygonjs/entities/Camera',
        'polygonjs/Entity',
        'polygonjs/geom/Vector2',
        'polygonjs/geom/Vector3'
    ],
    function (Camera, Entity, Vector2, Vector3) { 

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

                it('should have a default up vector along positive Y', function () {
                    var camera = Camera.create();
                    expect(camera.upVector.equals(Vector3.create(0, 1, 0))).toBeTruthy();
                });

                it('should be possible to initialise the up vector', function () {
                    var opts = { upVector: Vector3.create(0, 0, 1) };
                    var camera = Camera.create(opts);
                    expect(camera.upVector).toBe(opts.upVector);
                });

                it('should have a default origin vector target', function () {
                    var camera = Camera.create();
                    expect(camera.targetVector.equals(Vector3.ZERO)).toBeTruthy();
                });

                it('should be possible to initialise the target vector', function () {
                    var opts = { targetVector: Vector3.create(10, 9, 8) };
                    var camera = Camera.create(opts);
                    expect(camera.targetVector).toBe(opts.targetVector);
                });
            });

            describe('update', function () {
                it('should call Entity prototype update method', function () {
                    var camera = Camera.create();
                    var delta = 100;
                    spyOn(Entity.prototype, 'update');
                    camera.update(delta);
                    expect(Entity.prototype.update).toHaveBeenCalledWith(delta);
                });
            });
        });
    }
);