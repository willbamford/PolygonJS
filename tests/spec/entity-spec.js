define(
    [
        'iso-svg/geom/Vector3',
        'iso-svg/geom/Matrix3',
        'iso-svg/Entity'
    ],
    function (Vector3, Matrix3, Entity) { 

        "use strict";

        describe('Entity', function () {

            describe('create', function () {

                var e = Entity.create({});

                it('should be able to create new instances', function () {
                    expect(e).not.toBeNull();
                });
                
                it('should initially have no children', function () {
                    expect(e.children.length).toBe(0);
                });

                it('should initially have no parent', function () {
                    expect(e.parent).toBeNull();
                });

                it('should initially have a position at (0, 0)', function () {
                    expect(e.position.equals(Vector3.ZERO)).toBe(true);
                });

                it('should initially have a scale of (1, 1, 1)', function () {
                    expect(e.scale.equals(Vector3.ONE)).toBe(true);
                });

                it('should initially have a 3x3 identity rotation matrix', function () {
                    expect(e.rotation.equals(Matrix3.IDENTITY)).toBe(true);
                });
            });

            describe('transform', function () {

                // var e = Entity.create({});

                // it('should contain a transform that is initialised an identity matrix', function () {
                //     expect(e.transform).toEqual([
                //         [1, 0, 0],
                //         [0, 1, 0],
                //         [0, 0, 1]
                //     ]);
                // });
            });
        });
    }
);