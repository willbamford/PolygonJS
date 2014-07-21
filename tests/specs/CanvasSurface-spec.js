define(['polygonjs/surfaces/CanvasSurface'], function (Surface) { 

    "use strict";

    describe('CanvasSurface', function () {
        
        describe('create', function () {
            it('should be able to create new instances', function () {
                var s = Surface.create({});
                expect(s).not.toBeNull();
            });
        });
    });
});