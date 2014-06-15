define(['iso-svg/Camera'], function (Camera) { 

    "use strict";

    describe('Camera', function () {

        describe('create', function () {
            
            it('should be able to create new instances', function () {
                var camera = Camera.create({});
                expect(camera).not.toBeNull();
            });

            it('should by default create an isometric mode instance', function () {
                var camera = Camera.create({});
                expect(camera.mode).toBe(Camera.ISOMETRIC);
            });

        });

        describe('orthographic mode', function () {
            it('should return correct 3D to screen projection', function () {
                var camera = Camera.create({
                    mode: Camera.ORTHOGRAPHIC,
                    zoom: 1
                });

                var p = camera.project([0, 0, 0]);
                expect(p[0]).toBe(0);
                expect(p[1]).toBe(0);

                p = camera.project([1, 0, 0]);
                expect(p[0]).toBe(0);
                expect(p[1]).toBe(0);

                p = camera.project([0, 1, 0]);
                expect(p[0]).toBe(1);
                expect(p[1]).toBe(0);

                p = camera.project([0, 0, 1]);
                expect(p[0]).toBe(0);
                expect(p[1]).toBe(-1);
            })
        });

        describe('isometric mode', function () {
            it('should project 3D vertex to point on the screen', function () {
                var camera = Camera.create({
                    mode: Camera.ISOMETRIC,
                    zoom: 1
                });

                var p = camera.project([0, 0, 0]);
                expect(p[0]).toBeCloseTo(0);
                expect(p[1]).toBeCloseTo(0);

                p = camera.project([1, 1, 1]);
                expect(p[0]).toBeCloseTo(0);
                expect(p[1]).toBeCloseTo(0);

                p = camera.project([20, 30, 40]);
                expect(p[0]).toBeCloseTo(-8.660, 3);
                expect(p[1]).toBeCloseTo(-15);
            })
        });

        describe('distanceSort', function () {
            it('should be a able to sort vertices by distance from the camera', function () {
                var camera = Camera.create({
                    mode: Camera.ISOMETRIC,
                    zoom: 1
                });

                var sortedIndices = camera.distanceSort([
                    [0, 0, 0],
                    [-1, -1, -1],
                    [5, 3, 2],
                    [1, 1, 1]
                ]);
                expect(sortedIndices.length).toBe(4);
                expect(sortedIndices[0]).toBe(2);
                expect(sortedIndices[1]).toBe(3);
                expect(sortedIndices[2]).toBe(0);
                expect(sortedIndices[3]).toBe(1);

                camera = Camera.create({
                    mode: Camera.ORTHOGRAPHIC,
                    zoom: 1
                });

                sortedIndices = camera.distanceSort([
                    [10, 9, 8],
                    [8, 100, 100],
                    [1000, -100, -100],
                    [-10, 900, 900]
                ]);
                expect(sortedIndices.length).toBe(4);
                expect(sortedIndices[0]).toBe(2);
                expect(sortedIndices[1]).toBe(0);
                expect(sortedIndices[2]).toBe(1);
                expect(sortedIndices[3]).toBe(3);
            });
        });
    });
});