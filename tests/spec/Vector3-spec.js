define(['iso-svg/geom/Vector3'], function (Vector3) { 

    "use strict";

    describe('Vector', function () {
        
        describe('create', function () {
            it('should be able to create new instances', function () {
                var v = Vector3.create(3, 4, 5);
                expect(v.x).toEqual(3);
                expect(v.y).toEqual(4);
                expect(v.z).toEqual(5);
            });
        });

        describe('copy', function () {
            it('should return a copy of the vector', function () {
                var original = Vector3.create(10, 20, 30);
                var copy = original.copy();
                expect(copy).not.toBe(original);
                expect(copy.toArray()).toEqual(original.toArray());
            });
        });

        describe('toArray', function () {
            it('should return a one-dimensional array representation of the vector', function () {
                var v = Vector3.create(55, 44, 33);
                expect(v.toArray()).toEqual([55, 44, 33]);
            });
        });

        describe('constants', function () {
            it('should define the constants ZERO, ONE, X and Y', function () {
                expect(Vector3.ZERO.toArray()).toEqual([0, 0, 0]);
                expect(Vector3.ONE.toArray()).toEqual([1, 1, 1]);
                expect(Vector3.X.toArray()).toEqual([1, 0, 0]);
                expect(Vector3.Y.toArray()).toEqual([0, 1, 0]);
                expect(Vector3.Z.toArray()).toEqual([0, 0, 1]);
            });
        });

        describe('add', function () {
            it('should be able to add two vectors together', function () {
                var v1 = Vector3.create(4, -2, 9);
                var v2 = Vector3.create(3, 5, -10);
                var v3 = v1.add(v2);
                expect(v1.x).toEqual(4); // Should not mutate
                expect(v3.toArray()).toEqual([7, 3, -1]);
            });
        });

        describe('subtract', function () {
            it('should be able to subtract one vector from another', function () {
                var v1 = Vector3.create(4, -2, 9);
                var v2 = Vector3.create(3, 5, -10);
                var v3 = v1.subtract(v2);
                expect(v1.x).toEqual(4); // Should not mutate
                expect(v3.toArray()).toEqual([1, -7, 19]);
            });
        });

        describe('multiply', function () {
            it('should be able to multiply a vector by a scalar', function () {
                var v1 = Vector3.create(4, -2, 9);
                var k = 10;
                var v2 = v1.multiply(k);
                expect(v1.x).toEqual(4); // Should not mutate
                expect(v2.x).toEqual(40);
                expect(v2.y).toEqual(-20);
                expect(v2.z).toEqual(90);
            });
        });

        describe('distanceTo', function () {
            it('should return the distance (scalar) between this vector and the input', function () {
                var a = Vector3.create(3, 4, 5);
                var b = Vector3.create(10, 20, 30);
                expect(a.distanceTo(b)).toBeCloseTo(30.496);
            });
        });

        describe('distanceToSquared', function () {
            it('should return the distance squared (scalar) between this vector and the input', function () {
                var a = Vector3.create(20, 10, 4);
                var b = Vector3.create(-20, -10, -2);
                expect(a.distanceToSquared(b)).toEqual(2036);
            });
        });
    });
});