define(
    [
        'polygonjs/geom/Vector3',
        'polygonjs/geom/Matrix3',
        'polygonjs/geom/Matrix4',
        'polygonjs/Entity'
    ],
    function (Vector3, Matrix3, Matrix4, Entity) { 

        "use strict";

        describe('Entity', function () {

            describe('create', function () {

                var e = Entity.create();

                it('should be able to create new instances', function () {
                    expect(e).not.toBeNull();
                });
                
                it('should have an entity type of "entity"', function () {
                    expect(e.type).toBe('entity');
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

                it('should be possible to initialise with tags', function () {
                    var entity = Entity.create({
                        tags: ['ai', 'enemy']
                    });
                    expect(entity.tags).toEqual(['ai', 'enemy']);
                });
            });

            describe('findWithTag', function () {

                it('should return all entities with a given tag in this entity or child entities', function () {
                    var a = Entity.create({tags: ['one', 'two', 'three']});
                    var b1 = Entity.create({tags: ['two', 'three']});
                    var b2 = Entity.create({tags: ['two']});
                    var c = Entity.create({tags: ['two', 'three']});

                    b2.addChild(c);
                    a.addChild(b1).addChild(b2);

                    expect(a.findWithTag('three')).toEqual([a, b1, c]);
                    expect(a.findWithTag('two')).toEqual([a, b1, b2, c]);
                    expect(a.findWithTag('twinsen')).toEqual([]);
                    expect(c.findWithTag('three')).toEqual([c]);
                });
            });

            describe('update', function () {
                it('should be a function that accepts a delta argument', function () {
                    var entity = Entity.create();
                    expect(typeof entity.update).toEqual('function');
                    entity.update(100);
                });

                it('should call update on all child entities (which in turn call update on their children)', function () {

                    var root = Entity.create();
                    var entity1 = Entity.create();
                    var entity2 = Entity.create();

                    root.addChild(entity1).addChild(entity2);

                    spyOn(entity1, 'update');
                    spyOn(entity2, 'update');

                    var delta = 88;
                    root.update(delta);

                    expect(entity1.update).toHaveBeenCalledWith(delta);
                    expect(entity2.update).toHaveBeenCalledWith(delta);
                });
            });

            describe('root', function () {
                it('should return the root entity (may be itself)', function () {
                    var entity = Entity.create();
                    var parent = Entity.create();
                    var grandparent = Entity.create();
                    expect(entity.root()).toBe(entity);
                    entity.parent = parent;
                    expect(entity.root()).toBe(parent);
                    entity.parent.parent = grandparent;
                    expect(entity.root()).toBe(grandparent);
                });
            });

            describe('addChild', function () {
                it('should be able to add child entities', function () {
                    var entity = Entity.create();
                    var childA = Entity.create();
                    var childB = Entity.create();
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
                    var entity = Entity.create();
                    var childA = Entity.create();
                    var childB = Entity.create();
                    entity.addChild(childA).addChild(childB);
                    entity.removeChild(childA);
                    expect(childA.parent).toBe(null);
                    expect(entity.children.length).toEqual(1);
                    expect(entity.children[0]).toBe(childB);
                    entity.removeChild(childB).removeChild(childB).removeChild(childB);
                    expect(entity.children.length).toEqual(0);
                });
            });

            describe('getTransform', function () {
                it('should return the local 4 x 4 homogeneous transformation matrix', function () {
                    var e = Entity.create({
                        position: Vector3.create(10, 20, 30),
                        rotation: Matrix3.createRotationX(Math.PI / 4),
                        scale: Vector3.create(4, 2, 3)
                    });
                    var actual = e.getTransform();
                    var expected = Matrix4.create([
                        [4,        0,         0, 10],
                        [0, 1.414214, -1.414214, 20],
                        [0, 2.121320, 2.1213203, 30],
                        [0,        0,         0,  1]
                    ]);
                    expect(expected.equals(actual)).toBe(true);
                });
            });

            describe('getWorldTransform', function () {
                it('should return the world 4 x 4 homogeneous transformation matrix', function () {
                    var grandparent = Entity.create({
                        position: Vector3.create(-1, -2, 30)
                    });
                    var parent = Entity.create({
                        position: Vector3.create(2, 15, 10)
                    });
                    var entity = Entity.create({
                        position: Vector3.create(10, 9, 8)
                    });
                    var t = entity.getWorldTransform();
                    expect(t.equals(Matrix4.create([
                        [1, 0, 0, 10],
                        [0, 1, 0,  9],
                        [0, 0, 1,  8],
                        [0, 0, 0,  1]
                    ]))).toBe(true);

                    parent.addChild(entity);
                    t = entity.getWorldTransform();
                    expect(t.equals(Matrix4.create([
                        [1, 0, 0, 12],
                        [0, 1, 0, 24],
                        [0, 0, 1, 18],
                        [0, 0, 0,  1]
                    ]))).toBe(true);

                    grandparent.addChild(parent);
                    t = entity.getWorldTransform();
                    expect(t.equals(Matrix4.create([
                        [1, 0, 0, 11],
                        [0, 1, 0, 22],
                        [0, 0, 1, 48],
                        [0, 0, 0,  1]
                    ]))).toBe(true);
                });
            });
        });
    }
);