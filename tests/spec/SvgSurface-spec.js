define(['polygonjs/surfaces/SvgSurface'], function (Surface) { 

    "use strict";

    describe('SvgSurface', function () {
        
        describe('create', function () {
            it('should be able to create new instances', function () {
                var s = Surface.create({});
                expect(s).not.toBeNull();
            });
        });
    });
});