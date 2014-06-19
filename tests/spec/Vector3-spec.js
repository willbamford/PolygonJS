define(['iso-svg/geom/Vector3'], function (Vector3) { 

    "use strict";

    describe('Vector3', function () {
        
        describe('create', function () {
            it('should be able to create new instances', function () {
                expect(Vector3.create(3, 4, 5).toArray()).toEqual([3, 4, 5]);
            });
        });

        describe('createFromArray', function () {
            it('should be able to create new instances from an array', function () {
                expect(Vector3.createFromArray([3, 4, 5]).toArray()).toEqual([3, 4, 5]);
            });
        });

        describe('createFromArrays', function () {
            it('should be ablee to create an array of instances from a 2D input array', function () {
                var ia = [
                    [0, 1, 2],
                    [3, 4, 5],
                    [6, 7, 8]
                ];
                var oa = Vector3.createFromArrays(ia);
                expect(oa.length).toBe(3);
                expect(oa[0].toArray()).toEqual([0, 1, 2]);
                expect(oa[1].toArray()).toEqual([3, 4, 5]);
                expect(oa[2].toArray()).toEqual([6, 7, 8]);
            });
        });

        describe('mean', function () {
            it('should return the mean vector', function () {
                var arrs = [
                    [0,  10, 12],
                    [2, -10, 15],
                    [4, -20, 14],
                    [8,  20, 13]
                ];
                var a = Vector3.mean(Vector3.createFromArrays(arrs));
                expect(a.toArray()).toEqual([3.5, 0, 13.5]);
            });
        });

        describe('normalFromPositionVectors', function () {
            it('should calculate the normal from three position vectors', function () {
                var v1 = Vector3.create(5, 5, 5);
                var v2 = Vector3.create(6, 5, 5);
                var v3 = Vector3.create(5, 10, 5);
                var n = Vector3.normalFromPositionVectors(v1, v2, v3);
                expect(n.toArray()).toEqual([0, 0, 1]);
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
            it('should be able to add a vector', function () {
                var v1 = Vector3.create(4, -2, 9);
                var v2 = Vector3.create(3, 5, -10);
                var v3 = v1.add(v2);
                expect(v1.x).toEqual(4); // Should not mutate
                expect(v3.toArray()).toEqual([7, 3, -1]);
            });
        });

        describe('addTo', function () {
            it('should be able to add a vector (mutates)', function () {
                var v1 = Vector3.create(4, -2, 9);
                var v2 = Vector3.create(3, 5, -10);
                var v3 = v1.addTo(v2);
                expect(v3).toBe(v1); // Should mutate
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

        describe('subtractBy', function () {
            it('should be able to subtract one vector from another (mutates)', function () {
                var v1 = Vector3.create(4, -2, 9);
                var v2 = Vector3.create(3, 5, -10);
                var v3 = v1.subtractBy(v2);
                expect(v3).toBe(v1); // Should mutate
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

        describe('multiplyBy', function () {
            it('should be able to multiply a vector by a scalar (mutates)', function () {
                var v1 = Vector3.create(4, -2, 9);
                var k = 10;
                var v2 = v1.multiplyBy(k);
                expect(v1).toBe(v2); // Should mutate
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

        describe('magnitude', function () {
            it('should return the magnitude of the vector', function () {
                var v = Vector3.create(3, 4, 5);
                expect(v.magnitude()).toBeCloseTo(7.0711);
            });
        });

        describe('magnitudeSquared', function () {
            it('should return the magnitude squared of the vector', function () {
                var v = Vector3.create(3, 4, 5);
                expect(v.magnitudeSquared()).toEqual(50);
            });
        });

        describe('crossProduct', function () {
            it('should return the cross product of this vector and the input', function () {
                expect(
                    Vector3.create(1, 1, 0).crossProduct(
                        Vector3.create(1, 0, 1)
                    ).toArray()
                ).toEqual([1, -1, -1]);
                expect(
                    Vector3.create(3, -2, 5).crossProduct(
                        Vector3.create(2, 5, 10)
                    ).toArray()
                ).toEqual([-45, -20, 19]);
            });
        });

        describe('dotProduct', function () {
            it('should return the dot product of this vector and the input', function () {
                expect(Vector3.create(1, 0, 0).dotProduct(Vector3.create(0, 0, 1))).toBe(0);
                expect(Vector3.create(1, 0, 0).dotProduct(Vector3.create(1, 0, 0))).toBe(1);
                expect(Vector3.create(0, 0, -1).dotProduct(Vector3.create(0, 0, 1))).toBe(-1);
            });
        });

        describe('normalise', function () {
            it('should normalise this vector (mutable)', function () {
                var v1 = Vector3.create(1, 1, 1);
                var v2 = v1.normalise();
                expect(v1).toBe(v2);
                expect(v1.toArray()).toEqual([0.5773502691896258, 0.5773502691896258, 0.5773502691896258]);
            });
            it('should return unmodified array if magnitude is zero', function () {
                expect(Vector3.create(0, 0, 0).toArray()).toEqual([0, 0, 0]);
            });
        });

        describe('normalised', function () {
            it('should return a copy of the array normalised', function () {
                var v1 = Vector3.create(2, 2, 2);
                var v2 = v1.normalised();
                expect(v1).not.toBe(v2);
                expect(v2.toArray()).toEqual([0.5773502691896258, 0.5773502691896258, 0.5773502691896258]);
            });
        });

        describe('normal', function () {
            it('should return the normal of this vector with the input vector', function () {
                var v1 = Vector3.create(10, 0, 0);
                var v2 = Vector3.create(0, 10, 0);
                expect(v1.normal(v2).toArray()).toEqual([0, 0, 1]);
            });
        });
    });
});