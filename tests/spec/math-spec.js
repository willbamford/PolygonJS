define(['iso-svg/math'], function (math) { 

    "use strict";

    describe('math', function () {

        describe('clamp', function () {
            it('should clamp the value between the given min and max', function () {
                expect(math.clamp(3, 4, 5)).toBe(4);
                expect(math.clamp(4, 3, 5)).toBe(4);
                expect(math.clamp(5, 1, 2)).toBe(2);
            });
        });

        describe('scale', function () {
            it('should scale a vector by a given scalar value', function () {
                expect(math.scale([10], 2)).toEqual([20]);
                expect(math.scale([-5, 2], 0.5)).toEqual([-2.5, 1]);
                expect(math.scale([1, 2, 3], 4)).toEqual([4, 8, 12]);
            });
        }),

        describe('distance', function () {
            it('should return the distance between two points', function () {
                expect(math.distance([1, 2, 3], [10, 9, 8])).toBeCloseTo(12.449);
            });
        });

        describe('distanceSquared', function () {
            it('should return the square of the distance between two points', function () {
                expect(math.distanceSquared([1, 2, 3], [10, 9, 8])).toBe(155);
            });
        });

        describe('magnitude', function () {
            it('should return the magnitude of a 3D vector', function () {
                expect(math.magnitude([1, 1, 1])).toBeCloseTo(1.732, 3);
                expect(math.magnitude([-2, 2, -2])).toBeCloseTo(3.464, 3);
            });
        });

        describe('magSquared', function () {
            it('should return the square of a 3D vector\'s magnitude', function () {
                expect(math.magSquared([2, 3, 4])).toBe(29);
            });
        }),

        describe('crossProduct', function () {
            it('should return the cross product of two 3D vectors', function () {
                expect(math.crossProduct([1, 1, 0], [1, 0, 1])).toEqual([1, -1, -1]);
                expect(math.crossProduct([3, -2, 5], [2, 5, 10])).toEqual([-45, -20, 19]);
            });
        });

        describe('dotProduct', function () {
            it('should return the dot product (scalar) of two n-dimensional vectors', function () {
                expect(math.dotProduct([1, 0, 0], [0, 0, 1])).toBe(0);
                expect(math.dotProduct([1, 0, 0], [1, 0, 0])).toBe(1);
                expect(math.dotProduct([0, 0, -1], [0, 0, 1])).toBe(-1);
            });
        });

        describe('subtract', function () {
            it('should return the difference between two 3D vectors', function () {
                expect(math.subtract([10, 9, 8], [20, 21, 22])).toEqual([10, 12, 14]);
            });
        });

        describe('mean', function () {
            it('should return the mean vector', function () {
                var a = math.mean([
                    [0,  10, 12],
                    [2, -10, 15],
                    [4, -20, 14],
                    [8,  20, 13]
                ]);
                expect(a).toEqual([3.5, 0, 13.5]);
            });
        });

        describe('normalise', function () {
            it('should normalise a 3D vector', function () {
                var a = [1, 1, 1];
                a = math.normalise(a);
                expect(a).toEqual([0.5773502691896258, 0.5773502691896258, 0.5773502691896258]);
            });
            it('should return null if magnitude is zero', function () {
                expect(math.normalise([0, 0, 0])).toBeNull();
            });
        });

        describe('normal', function () {
            it('should return the normal vector for two input vectors', function () {
                expect(math.normal([10, 0, 0], [0, 10, 0])).toEqual([0, 0, 1]);
            });
        });

        describe('normalFromVertices', function () {
            it('should calculate the normal from three 3D vertices', function () {
                var v1 = [5, 5, 5];
                var v2 = [6, 5, 5];
                var v3 = [5, 10, 5];
                var n = math.normalFromVertices(v1, v2, v3);
                expect(n).toEqual([0, 0, 1]);
            });
        });
    });
});