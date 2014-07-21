define(['polygonjs/surfaces/WebGLSurface'], function (Surface) { 

    "use strict";

    describe('WebGLSurface', function () {
        
        describe('create', function () {
            it('should be able to create new instances', function () {
                var s = Surface.create({});
                expect(s).not.toBeNull();
            });
        });
    });
});