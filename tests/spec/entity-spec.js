define(['iso-svg/entity'], function (entity) { 

    "use strict";

    describe('entity', function () {

        describe('create', function () {
            
            it('should be able to create new instances', function () {
                var e = entity.create({});
                expect(e).not.toBeNull();
            });

        });

    });
});