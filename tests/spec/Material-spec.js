define(
    ['polygonjs/Material', 'polygonjs/math/Color'],
    function (Material, Color) {
    
        describe('Material', function () {

            describe('create', function () {

                it('should be able to create new instances', function () {
                    var material = Material.create();
                    expect(material).toBeInstanceOf(Material);
                });

                it('should default diffuse and ambient colors to white and emissive to black', function () {
                    var material = Material.create();
                    expect(material.diffuse).toEqualColor(Color.WHITE);
                    expect(material.ambient).toEqualColor(Color.WHITE);
                    expect(material.emissive).toEqualColor(Color.BLACK);
                });

                it('should be able to initialise with a diffuse, ambient and emissive color', function () {
                    var ambient = Color.create();
                    var diffuse = Color.create();
                    var emissive = Color.create();
                    var material = Material.create({
                        ambient: ambient,
                        diffuse: diffuse,
                        emissive: emissive
                    });
                    expect(material.ambient).toBe(ambient);
                    expect(material.diffuse).toBe(diffuse);
                    expect(material.emissive).toBe(emissive);
                });
            });
        });
    }
);