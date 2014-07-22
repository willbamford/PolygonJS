define(
    ['polygonjs/Material', 'polygonjs/math/Color'],
    function (Material, Color) {
    
        describe('Material', function () {

            describe('create', function () {

                it('should be able to create new instances', function () {
                    var material = Material.create();
                    expect(material).toBeInstanceOf(Material);
                });

                it('should default color to white', function () {
                    var material = Material.create();
                    expect(material.color).toEqualColor(Color.WHITE);
                });

                it('should be able to initialise with a color', function () {
                    var color = Color.create();
                    var material = Material.create({
                        color: color
                    });
                    expect(material.color).toBe(color);
                });
            });
        });
    }
);