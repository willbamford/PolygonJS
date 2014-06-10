define(['iso-svg/math'], function (math) { 

    "use strict";

    describe('math', function () {

        describe('scale', function () {

            it('should scale a vector by a given scalar value', function () {
                var v = math.scale([10], 2);
                expect(v[0]).toBe(20);
                v = math.scale([-5, 2], 0.5);
                expect(v[0]).toBe(-2.5);
                expect(v[1]).toBe(1);
                v = math.scale([1, 2, 3], 4);
                expect(v[0]).toBe(4);
                expect(v[1]).toBe(8);
                expect(v[2]).toBe(12);
            });
        }),

        describe('magSquared', function () {

            it('should return the square of a 3D vector\'s magnitude', function () {
                expect(math.magSquared([2, 3, 4])).toBe(29);
            });
        }),

        describe('magnitude', function () {

            it('should return the magnitude of a 3D vector', function () {
                expect(math.magnitude([1, 1, 1])).toBeCloseTo(1.732, 3);
                expect(math.magnitude([-2, 2, -2])).toBeCloseTo(3.464, 3);
            });
        });

        describe('crossProduct', function () {

            it('should return the cross product of two 3D vectors', function () {
                var a = [1, 1, 0];
                var b = [1, 0, 1];
                var v = math.crossProduct(a, b);
                expect(v[0]).toBe(1);
                expect(v[1]).toBe(-1);
                expect(v[2]).toBe(-1);

                a = [3, -2, 5];
                b = [2, 5, 10];
                v = math.crossProduct(a, b);
                expect(v[0]).toBe(-45);
                expect(v[1]).toBe(-20);
                expect(v[2]).toBe(19);
            });
        });

        describe('subtract', function () {

            it('should return the difference between two 3D vectors', function () {
                var a = [10, 9, 8];
                var b = [20, 21, 22];
                var v = math.subtract(a, b);
                expect(v[0]).toBe(10);
                expect(v[1]).toBe(12);
                expect(v[2]).toBe(14);
            });
        });

        describe('normalise', function () {

            it('should normalise a 3D vector', function () {
                var a = [1, 1, 1];
                a = math.normalise(a);
                expect(a[0]).toBeCloseTo(0.577, 3);
                expect(a[1]).toBeCloseTo(0.577, 3);
                expect(a[2]).toBeCloseTo(0.577, 3);
            });

            it('should return null if magnitude is zero', function () {
                var a = [0, 0, 0];
                expect(math.normalise(a)).toBeNull();
            });
        });

        describe('normal', function () {

            it('should return the normal vector for two input vectors', function () {
                var a = [10, 0, 0];
                var b = [0, 10, 0];
                var n = math.normal(a, b);
                expect(n[0]).toBe(0);
                expect(n[1]).toBe(0);
                expect(n[2]).toBe(1);
            });
        });

        describe('normalFromVertices', function () {

            it('should calculate the normal from three 3D vertices', function () {

                var v1 = [5, 5, 5];
                var v2 = [6, 5, 5];
                var v3 = [5, 10, 5];
                var n = math.normalFromVertices(v1, v2, v3);
                expect(n[0]).toBe(0);
                expect(n[1]).toBe(0);
                expect(n[2]).toBe(1);
            });
        });

        describe('isoProject', function () {

            it('should project a 3D vertex to 2D isometric (30 degrees)', function () {

                var v = math.isoProject([0, 0, 0]);
                expect(v[0]).toBe(0);
                expect(v[1]).toBe(0);

                v = math.isoProject([1, 1, 1]);
                expect(v[0]).toBe(0);
                expect(v[1]).toBe(2);

                v = math.isoProject([20, 30, 40]);
                expect(v[0]).toBeCloseTo(-8.660, 3);
                expect(v[1]).toBe(65);
            });
        });

        describe('isoGameProject', function () {

            it('should project a 3D vertex to 2D game isometric (one up, two across)', function () {
                
                var v = math.isoGameProject([0, 0, 0]);
                expect(v[0]).toBe(0);
                expect(v[1]).toBe(0);

                v = math.isoGameProject([1, 1, 1]);
                expect(v[0]).toBe(0);
                expect(v[1]).toBe(2);

                v = math.isoGameProject([20, 30, 40]);
                expect(v[0]).toBe(-20, 3);
                expect(v[1]).toBe(60);
            });
        });
    });
});