define(['polygonjs/math/MissingMath'], function (MissingMath) { 

    "use strict";

    describe('MissingMath', function () {

        describe('equals', function () {
            it('should return true if the difference between two values is within precision tolerance', function () {
                expect(MissingMath.equals(0, 0)).toBe(true);
                expect(MissingMath.equals(1, 1)).toBe(true);
                expect(MissingMath.equals(10, 11, 1.01)).toBe(true);
                expect(MissingMath.equals(-50, -50.1, 0.2)).toBe(true);
            });
        });

        describe('clamp', function () {
            it('should clamp the value between the given min and max', function () {
                expect(MissingMath.clamp(3, 4, 5)).toBe(4);
                expect(MissingMath.clamp(4, 3, 5)).toBe(4);
                expect(MissingMath.clamp(5, 1, 2)).toBe(2);
            });
        });
    });
});