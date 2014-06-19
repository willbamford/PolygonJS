define(['iso-svg/geom/Vector2'], function (Vector2) { 

    "use strict";

    describe('Vector2', function () {
        
        describe('create', function () {
            it('should be able to create new instances', function () {
                var v = Vector2.create(3, 4);
                expect(v.x).toEqual(3);
                expect(v.y).toEqual(4);
            });
        });

        describe('copy', function () {
            it('should return a copy of the vector', function () {
                var original = Vector2.create(10, 20);
                var copy = original.copy();
                expect(copy).not.toBe(original);
                expect(copy.toArray()).toEqual(original.toArray());
            });
        });

        describe('toArray', function () {
            it('should return a one-dimensional array representation of the vector', function () {
                var v = Vector2.create(55, 44);
                expect(v.toArray()).toEqual([55, 44]);
            });
        });

        describe('constants', function () {
            it('should define the constants ZERO, ONE, X and Y', function () {
                expect(Vector2.ZERO.toArray()).toEqual([0, 0]);
                expect(Vector2.ONE.toArray()).toEqual([1, 1]);
                expect(Vector2.X.toArray()).toEqual([1, 0]);
                expect(Vector2.Y.toArray()).toEqual([0, 1]);
            });
        });

        describe('add', function () {
            it('should be add a vector', function () {
                var v1 = Vector2.create(4, -2);
                var v2 = Vector2.create(3, 5);
                var v3 = v1.add(v2);
                expect(v1.x).toEqual(4); // Should not mutate
                expect(v3.toArray()).toEqual([7, 3]);
            });
        });

        describe('addTo', function () {
            it('should be add a vector (mutates)', function () {
                var v1 = Vector2.create(4, -2);
                var v2 = Vector2.create(3, 5);
                var v3 = v1.addTo(v2);
                expect(v1).toBe(v3); // Should mutate
                expect(v3.toArray()).toEqual([7, 3]);
            });
        });

        describe('subtract', function () {
            it('should be able to subtract one vector from another', function () {
                var v1 = Vector2.create(4, -2);
                var v2 = Vector2.create(3, 5);
                var v3 = v1.subtract(v2);
                expect(v1.x).toEqual(4); // Should not mutate
                expect(v3.toArray()).toEqual([1, -7]);
            });
        });

        describe('subtractBy', function () {
            it('should be able to subtract one vector from another (mutates)', function () {
                var v1 = Vector2.create(4, -2);
                var v2 = Vector2.create(3, 5);
                var v3 = v1.subtractBy(v2);
                expect(v3).toBe(v1); // Should mutate
                expect(v3.toArray()).toEqual([1, -7]);
            });
        });

        describe('multiply', function () {
            it('should be able to multiply a vector by a scalar', function () {
                var v1 = Vector2.create(4, -2);
                var k = 10;
                var v2 = v1.multiply(k);
                expect(v1.x).toEqual(4); // Should not mutate
                expect(v2.toArray()).toEqual([40, -20]);
            });
        });

        describe('multiplyBy', function () {
            it('should be able to multiply a vector by a scalar (mutates)', function () {
                var v1 = Vector2.create(4, -2);
                var k = 10;
                var v2 = v1.multiplyBy(k);
                expect(v1).toBe(v2); // Should mutate
                expect(v2.toArray()).toEqual([40, -20]);
            });
        });

        describe('distanceTo', function () {
            it('should return the distance (scalar) between this vector and the input', function () {
                var a = Vector2.create(3, 4);
                var b = Vector2.create(10, 20);
                expect(a.distanceTo(b)).toBeCloseTo(17.464);
            });
        });

        describe('distanceToSquared', function () {
            it('should return the distance squared (scalar) between this vector and the input', function () {
                var a = Vector2.create(20, 10);
                var b = Vector2.create(-20, -10);
                expect(a.distanceToSquared(b)).toEqual(2000);
            });
        });

        describe('magnitude', function () {
            it('should return the magnitude of the vector', function () {
                var v = Vector2.create(3, 4);
                expect(v.magnitude()).toEqual(5);
            });
        });


        describe('magnitudeSquared', function () {
            it('should return the magnitude squared of the vector', function () {
                var v = Vector2.create(3, 4);
                expect(v.magnitudeSquared()).toEqual(25);
            });
        });
    });
});