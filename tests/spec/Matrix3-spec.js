define(
    ['iso-svg/geom/Matrix3'],
    function (Matrix3) { 

    "use strict";

    describe('Matrix3', function () {
        
        describe('create', function () {
            it('should be able to create new instances', function () {
                var m = Matrix3.create();
                expect(m).not.toBeNull();
            });
        });
    });
});