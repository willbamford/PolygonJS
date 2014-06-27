define(
    [
        'polygonjs/entities/Polygon',
        'polygonjs/Entity'
    ],
    function (Polygon, Entity) {

        describe('Polygon', function () {

            it('should "extend" Entity', function () {
                var p = Polygon.create();
                expect(p instanceof Polygon).toBe(true);
                expect(p instanceof Entity).toBe(true);
            });

            describe('create', function () {

            });

            describe('normal', function () {

            });
        });
    }
);