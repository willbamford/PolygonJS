define(
    [
        'polygonjs/entities/Polygon',
        'polygonjs/Entity'
    ],
    function (Polygon, Entity) {

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
            });
        });
    }
);