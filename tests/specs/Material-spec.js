define(
    ['polygonjs/Material', 'polygonjs/math/Color'],
    function (Material, Color) {
    
        describe('Material', function () {

            describe('create', function () {

                it('should be able to create new instances', function () {
                    var material = Material.create();
                    expect(material).toBeInstanceOf(Material);
                });

                it('should default color to white and emissive to black', function () {
                    var material = Material.create();
                    expect(material.color).toEqualColor(Color.WHITE);
                    expect(material.emissive).toEqualColor(Color.BLACK);
                });

                it('should be able to initialise with a (diffuse) color and emissive color', function () {
                    var color = Color.create();
                    var emissive = Color.create();
                    var material = Material.create({
                        color: color,
                        emissive: emissive
                    });
                    expect(material.color).toBe(color);
                    expect(material.emissive).toBe(emissive);
                });
            });
        });
    }
);