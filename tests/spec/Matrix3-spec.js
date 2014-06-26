define(
    ['polygonjs/geom/Matrix3'],
    function (Matrix3) { 

    "use strict";

    describe('Matrix3', function () {
        
        describe('create', function () {

            it('should be able to create new instance with identity matrix as default', function () {
                var m = Matrix3.create();
                expect(m.equals(Matrix3.IDENTITY)).toBe(true);
            });

            it('should be able to initialise with arrays', function () {
                var a = [
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9]
                ];
                var m = Matrix3.create([
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9]
                ]);
                expect(m.toArrays()).toEqual(a);
            });
        });

        describe('createRotationX', function () {
            it('should be able to create a matrix for rotation in the X axis', function () {
                var m = Matrix3.createRotationX(Math.PI);
                expect(m.equals(Matrix3.create([
                    [1,  0,  0],
                    [0, -1,  0],
                    [0,  0, -1]
                ]))).toBe(true);
            });
        });

        describe('createRotationY', function () {
            it('should be able to create a matrix for rotation in the Y axis', function () {
                var m = Matrix3.createRotationY(Math.PI);
                expect(m.equals(Matrix3.create([
                    [-1,  0,  0],
                    [ 0,  1,  0],
                    [ 0,  0, -1]
                ]))).toBe(true);
            });
        });

        describe('createRotationZ', function () {
            it('should be able to create a matrix for rotation in the Z axis', function () {
                var m = Matrix3.createRotationZ(Math.PI);
                expect(m.equals(Matrix3.create([
                    [-1,  0,  0],
                    [ 0, -1,  0],
                    [ 0,  0,  1]
                ]))).toBe(true);
            });
        });

        describe('copy', function () {
            it('should copy this matrix to a new matrix', function () {
                var m1 = Matrix3.create([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
                var m2 = m1.copy();
                expect(m1).not.toBe(m2);
                expect(m1.equals(m2)).toBe(true);
            });
        });

        describe('equals', function () {
            it('should return true if elements are identical', function () {
                var a = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
                var b = [[1, 2, 3], [4, 0, 6], [7, 8, 9]];
                var m1 = Matrix3.create(a);
                var m2 = Matrix3.create(a);
                expect(m1.equals(m2)).toBe(true);
                m2 = Matrix3.create(b);
                expect(m1.equals(m2)).toBe(false);
            });
        });

        describe('multiply', function () {
            it('should return the result of multiplying this matrix with another', function () {
                var e = [
                    [84,  90,  96],
                    [201, 216, 231],
                    [318, 342, 366]
                ];
                var m = Matrix3.create([
                    [1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9]
                ]);
                var p = m.multiply(Matrix3.create([
                    [10, 11, 12],
                    [13, 14, 15],
                    [16, 17, 18]
                ]));
                expect(p.equals(Matrix3.create(e))).toBe(true);
            });
        });

        describe('inverse', function () {
            it('should return the inverse of the matrix', function () {
                var d = [
                    [2, 0, 0],
                    [0, 2, 0],
                    [0, 0, 2]
                ];
                var e = [
                    [0.5, 0, 0],
                    [0, 0.5, 0],
                    [0, 0, 0.5]
                ];
                var m = Matrix3.create(d);
                expect(m.inverse().equals(Matrix3.create(e))).toBe(true);
            });
        });
    });
});