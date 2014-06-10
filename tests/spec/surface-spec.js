define(['iso-svg/surface'], function (surface) { 

    "use strict";

    describe('surface', function () {
        
        describe('create', function () {
            it('should be able to create new instances', function () {
                var s = surface.create({});
                expect(s).not.toBeNull();
            });
        });
    });
});