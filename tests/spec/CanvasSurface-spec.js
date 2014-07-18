define(['polygonjs/surfaces/Canvas'], function (Surface) { 

    "use strict";

    describe('Canvas Surface', function () {
        
        describe('create', function () {
            it('should be able to create new instances', function () {
                var s = Surface.create({});
                expect(s).not.toBeNull();
            });
        });
    });
});