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

            describe('root', function () {
                it('should return the root entity (may be itself)', function () {

                    var entity = Entity.create({});
                    var parent = Entity.create({});
                    var grandparent = Entity.create({});

                    expect(entity.root()).toBe(entity);
                    entity.parent = parent;
                    expect(entity.root()).toBe(parent);
                    entity.parent.parent = grandparent;
                    expect(entity.root()).toBe(grandparent);
                });
            });

            describe('addChild', function () {
                it('should be able to add child entities', function () {
                    var entity = Entity.create({});
                    var childA = Entity.create({});
                    var childB = Entity.create({});
                    expect(entity.children.length).toEqual(0);
                    entity.addChild(childA);
                    expect(childA.parent).toBe(entity);
                    expect(entity.children[0]).toBe(childA);
                    entity.addChild(childA); // Already exists
                    expect(entity.children[0]).toBe(childA);
                    entity.addChild(childB);
                    expect(entity.children[1]).toBe(childB);
                });
            });

            describe('removeChild', function () {
                it('should be able to remove child entities', function () {
                    var entity = Entity.create({});
                    var childA = Entity.create({});
                    var childB = Entity.create({});
                    entity.addChild(childA).addChild(childB);
                    entity.removeChild(childA);
                    expect(childA.parent).toBe(null);
                    expect(entity.children.length).toEqual(1);
                    expect(entity.children[0]).toBe(childB);
                    entity.removeChild(childB).removeChild(childB).removeChild(childB);
                    expect(entity.children.length).toEqual(0);
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