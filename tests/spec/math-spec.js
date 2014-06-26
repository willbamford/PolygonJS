define(['polygonjs/math'], function (math) { 

    "use strict";

    describe('math', function () {

        describe('equals', function () {
            it('should return true if the difference between two values is within precision tolerance', function () {
                expect(math.equals(0, 0)).toBe(true);
                expect(math.equals(1, 1)).toBe(true);
                expect(math.equals(10, 11, 1.01)).toBe(true);
                expect(math.equals(-50, -50.1, 0.2)).toBe(true);
            });
        });

        describe('clamp', function () {
            it('should clamp the value between the given min and max', function () {
                expect(math.clamp(3, 4, 5)).toBe(4);
                expect(math.clamp(4, 3, 5)).toBe(4);
                expect(math.clamp(5, 1, 2)).toBe(2);
            });
        });
    });
});