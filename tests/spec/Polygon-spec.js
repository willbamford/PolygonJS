define(
    [
        'polygonjs/entities/Polygon',
        'polygonjs/Entity'],
    function (Polygon, Entity) {

        describe('Polygon', function () {

            describe('create', function () {

                it('should return a new instance which extends an Entity', function () {
                    var p = Polygon.create();
                    expect(p instanceof Polygon).toBe(true);
                    expect(p instanceof Entity).toBe(true);
                });

                
            });

            describe('normal', function () {

            });
        });
    }
);