define(
    [
        'polygonjs/entities/Polygon',
        'polygonjs/Entity',
        'polygonjs/geom/Vector3'
    ],
    function (Polygon, Entity, Vector3) {

        "use strict";

        describe('Polygon', function () {

            it('should "extend" Entity', function () {
                var p = Polygon.create();
                expect(p instanceof Polygon).toBe(true);
                expect(p instanceof Entity).toBe(true);
            });

            describe('create', function () {

                it('should have an entity type of "polygon"', function () {
                    var polygon = Polygon.create();
                    expect(polygon.type).toBe('polygon');
                });

                it('should be able initialise with vertices and normal', function () {
                    var polygon = Polygon.create({
                        vertices: [Vector3.create(0, 0, 1), Vector3.create(0, 1, 0), Vector3.create(0, 1, 1)],
                        normal: Vector3.create(1, 0, 0)
                    });
                    expect(polygon.vertices.length).toBe(3);
                    expect(polygon.normal.equals(Vector3.create(1, 0, 0))).toBe(true);
                });
            });
        });
    }
);