define(
    [
        'polygonjs/entities/Polygon',
        'polygonjs/Entity',
        'polygonjs/math/Vector3',
        'polygonjs/Material',
        'polygonjs/math/Color'
    ],
    function (Polygon, Entity, Vector3, Material, Color) {

        "use strict";

        describe('Polygon', function () {

            it('should "extend" Entity', function () {
                var polygon = Polygon.create();
                expect(polygon).toBeInstanceOf(Entity);
            });

            describe('create', function () {

                var vertices = [Vector3.create(0, 0, 1), Vector3.create(0, 1, 0), Vector3.create(0, 1, 1)];
                var worldVertices = [Vector3.create(0, 0, 2), Vector3.create(0, 2, 0), Vector3.create(0, 2, 2)];
                var viewVertices = [Vector3.create(0, 0, 3), Vector3.create(0, 3, 0), Vector3.create(0, 3, 3)];
                var screenVertices = [Vector3.create(0, 0, 4), Vector3.create(0, 4, 0), Vector3.create(0, 4, 4)];
                var normal = Vector3.create(1, 0, 0);

                it('should be able to create instances', function () {
                    var polygon = Polygon.create();
                    expect(polygon).toBeInstanceOf(Polygon);
                });

                it('should have an entity type of "polygon"', function () {
                    var polygon = Polygon.create();
                    expect(polygon.type).toBe('polygon');
                });

                it('should be able to initialise with a material', function () {
                    var material = Material.create();
                    var polygon = Polygon.create({material: material});
                    expect(polygon.material).toBe(material);
                });

                it('should be able initialise with vertices and normal', function () {
                    var polygon = Polygon.create({
                        vertices: vertices,
                        worldVertices: worldVertices,
                        viewVertices: viewVertices,
                        screenVertices: screenVertices,
                        normal: normal
                    });
                    expect(polygon.vertices).toBe(vertices);
                    expect(polygon.worldVertices).toBe(worldVertices);
                    expect(polygon.viewVertices).toBe(viewVertices);
                    expect(polygon.screenVertices).toBe(screenVertices);
                    expect(polygon.normal).toBe(normal);
                    expect(polygon.worldNormal).not.toBe(polygon.normal);
                    expect(polygon.worldNormal.equals(polygon.normal)).toBeTruthy();
                });

                it('should not be culled initially', function () {
                    var polygon = Polygon.create();
                    expect(polygon.isCulled).toBeFalsy();
                });

                it('should have a distance to camera value of zero initially', function () {
                    var polygon = Polygon.create();
                    expect(polygon.distanceToCamera).toBe(0);
                });

                it('should have a default color of black', function () {
                    var polygon = Polygon.create();
                    expect(polygon.color).toEqualColor(Color.BLACK);
                });
            });
        });
    }
);