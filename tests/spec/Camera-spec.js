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
                    expect(camera).not.toBeNull();
                });
            });
        });
    }
);