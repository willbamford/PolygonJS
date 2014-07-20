define(
    ['polygonjs/Material', 'polygonjs/math/Color'],
    function (Material, Color) {
    
        describe('Material', function () {

            describe('create', function () {

                it('should be able to create new instances', function () {
                    var material = Material.create();
                    expect(material).toBeInstanceOf(Material);
                });

                it('should default diffuse and ambient colors to white', function () {
                    var material = Material.create();
                    expect(material.diffuse).toEqualColor(Color.WHITE);
                    expect(material.ambient).toEqualColor(Color.WHITE);
                });

                it('should be able to initialise with a diffuse and ambient color', function () {
                    var ambient = Color.create();
                    var diffuse = Color.create();
                    var material = Material.create({
                        ambient: ambient,
                        diffuse: diffuse
                    });
                    expect(material.ambient).toBe(ambient);
                    expect(material.diffuse).toBe(diffuse);
                });
            });
        });
    }
);