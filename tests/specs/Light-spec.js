define(
    [
        'polygonjs/lights/Light',
        'polygonjs/Entity',
        'polygonjs/math/Color'
    ],
    function (Light, Entity, Color) {

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

                it('should have a default white color and specular color', function () {
                    var light = Light.create();
                    expect(light.color).toEqualColor(Color.WHITE);
                    expect(light.specular).toEqualColor(Color.WHITE);
                });

                it('should be able to initialise color and specular color', function () {
                    var light = Light.create({
                        color: Color.BLUE.clone(),
                        specular: Color.RED.clone()
                    });
                    expect(light.color).toEqualColor(Color.BLUE);
                    expect(light.specular).toEqualColor(Color.RED);
                });

                it('should have a default intensity of one (full brightness)', function () {
                    var light = Light.create();
                    expect(light.intensity).toEqual(1.0);
                    light = Light.create({intensity: 0.0});
                    expect(light.intensity).toEqual(0.0);
                    light = Light.create({intensity: 0.5});
                    expect(light.intensity).toEqual(0.5);
                });
            });
        });
    }
);
