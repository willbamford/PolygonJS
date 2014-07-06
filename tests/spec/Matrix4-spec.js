define(
    [
        'polygonjs/geom/Matrix4',
        'polygonjs/geom/Vector3'
    ],
    function (Matrix4, Vector3) { 

    "use strict";

    describe('Matrix4', function () {
        
        var a = [
            [ 1,  2,  3,  4],
            [ 5,  6,  7,  8],
            [ 9, 10, 11, 12],
            [13, 14, 15, 16]
        ];

        var b = [
            [17, 18, 19, 20],
            [21, 22, 23, 24],
            [25, 26, 27, 28],
            [29, 30, 31, 32]
        ];

        describe('create', function () {

            it('should be able to create new instance with identity matrix as default', function () {
                var m = Matrix4.create();
                expect(m.equals(Matrix4.IDENTITY)).toBe(true);
            });

            it('should be able to initialise with arrays', function () {
                var m = Matrix4.create(a);
                expect(m.toArrays()).toEqual(a);
            });
        });

        describe('toString', function () {
            it('should return a string representation of this matrix', function () {
                var m = Matrix4.create(a);
                expect(m.toString()).toEqual(
                    '1, 2, 3, 4\n5, 6, 7, 8\n9, 10, 11, 12\n13, 14, 15, 16\n'
                );
            });
        });

        describe('copy', function () {
            it('should copy this matrix to a new matrix', function () {
                var m1 = Matrix4.create(a);
                var m2 = m1.copy();
                expect(m1).not.toBe(m2);
                expect(m1.equals(m2)).toBe(true);
            });
        });

        describe('equals', function () {
            it('should return true if elements are identical', function () {
                var m1 = Matrix4.create(a);
                var m2 = Matrix4.create(a);
                expect(m1.equals(m2)).toBe(true);
                m2 = Matrix4.create(b);
                expect(m1.equals(m2)).toBe(false);
            });
        });

        describe('multiply', function () {
            it('should return the result of multiplying this matrix with another', function () {
                var e = [
                    [ 250,  260,  270,  280],
                    [ 618,  644,  670,  696],
                    [ 986, 1028, 1070, 1112],
                    [1354, 1412, 1470, 1528]
                ];
                var m = Matrix4.create(a);
                var p = m.multiply(Matrix4.create(b));
                expect(p.equals(Matrix4.create(e))).toBe(true);
            });
        });

        describe('multiplyPoint', function () {
            it('should return the result of multiplying a point by this matrix', function () {
                var m = Matrix4.create([
                    [1, 0, 0, 0],
                    [0, 1, 0, 0],
                    [0, 0, 1, 0],
                    [0, 0, 0, 1]
                ]);
                var a = Vector3.create(10, 20, 30);
                var b = m.multiplyPoint(a);
                expect(a).not.toBe(b);
                expect(a.equals(b)).toBe(true);

                m = Matrix4.create([
                    [1, 0, 0, 5],
                    [0, 1, 0, 6],
                    [0, 0, 1, 7],
                    [0, 0, 0, 1]
                ]);
                b = m.multiplyPoint(a);
                expect(b.equals(Vector3.create(15, 26, 37))).toBe(true);

                m = Matrix4.create([
                    [4,        0,         0, 10],
                    [0, 1.414214, -0.707107, 20],
                    [0, 0.707107,  2.121321, 30],
                    [0,        0,         0,  1]
                ]);
                b = m.multiplyPoint(a);
                expect(b.equals(Vector3.create(50, 27.07107, 107.78177))).toBe(true);
            });
        });

        describe('multiplyPointTo', function () {
            it('should return the result of multiplying a point by this matrix (mutable)', function () {
                var m = Matrix4.create();
                var v = Vector3.create(0, 0, 0);
                spyOn(m, 'multiplyPointTo');
                var p = m.multiplyPoint(v);
                expect(m.multiplyPointTo).toHaveBeenCalledWith(v, Vector3.create());
            });
        });
    });
});