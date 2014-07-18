define(
    [
        'polygonjs/lights/Light',
        'polygonjs/Entity'
    ],
    function (Light, Entity) {

        "use strict";

        describe('Light', function () {

            it('should "extend" Entity', function () {
                var light = Light.create();
                expect(light).toBeInstanceOf(Entity);
            });

            describe('create', function () {

                it('should have an entity type of "light"', function () {
                    var light = Light.create();
                    expect(light).toBeInstanceOf(Light);
                    expect(light.type).toBe('light');
                });
            });
        });
    }
);