define(['iso-svg/Surface'], function (Surface) { 

    "use strict";

    describe('Surface', function () {
        
        describe('create', function () {
            it('should be able to create new instances', function () {
                var s = Surface.create({});
                expect(s).not.toBeNull();
            });
        });
    });
});