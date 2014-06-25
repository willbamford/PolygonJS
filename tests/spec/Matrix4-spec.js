define(
    ['iso-svg/geom/Matrix4'],
    function (Matrix4) { 

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
                console.log(p);
                expect(p.equals(Matrix4.create(e))).toBe(true);
            });
        });
    });
});