define(
    ['polygonjs/Material', 'polygonjs/math/Color'],
    function (Material, Color) {
    
        describe('Material', function () {

            describe('create', function () {

                it('should be able to create new instances', function () {
                    var material = Material.create();
                    expect(material).toBeInstanceOf(Material);
                });

                it('should default diffuse color to white, specular color to low intensity white with shininess of 10, and emissive color to black', function () {
                    var material = Material.create();
                    expect(material.color).toEqualColor(Color.WHITE);
                    expect(material.emissive).toEqualColor(Color.BLACK);
                    expect(material.specular).toEqualColor(Color.create({r: 1, g: 0.1, b: 0.1}));
                    expect(material.shininess).toEqual(5);
                });

                it('should be able to initialise with a diffuse color, specular color with shininess (specular exponent), and emissive color', function () {
                    var color = Color.create();
                    var emissive = Color.create();
                    var specular = Color.create();
                    var material = Material.create({
                        color: color,
                        emissive: emissive,
                        specular: specular,
                        shininess: 50
                    });
                    expect(material.color).toBe(color);
                    expect(material.emissive).toBe(emissive);
                    expect(material.specular).toBe(specular);
                    expect(material.shininess).toBe(50);
                });
            });
        });
    }
);