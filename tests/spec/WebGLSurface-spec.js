define(['polygonjs/surfaces/WebGL'], function (Surface) { 

    "use strict";

    describe('WebGL Surface', function () {
        
        describe('create', function () {
            it('should be able to create new instances', function () {
                var s = Surface.create({});
                expect(s).not.toBeNull();
            });
        });
    });
});