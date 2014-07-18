define(
    [
        'polygonjs/lights/Light',
        'polygonjs/Entity'
    ],
    function (Light, Entity) {

        "use strict";

        describe('Light', function () {

            it('should "extend" Entity', function () {
                var p = Light.create();
                expect(p instanceof Light).toBe(true);
                expect(p instanceof Entity).toBe(true);
            });

            describe('create', function () {

                it('should have an entity type of "light"', function () {
                    var polygon = Light.create();
                    expect(polygon.type).toBe('light');
                });
            });
        });
    }
);