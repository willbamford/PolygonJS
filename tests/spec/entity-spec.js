define(['iso-svg/Entity'], function (Entity) { 

    "use strict";

    describe('Entity', function () {

        describe('create', function () {
            
            it('should be able to create new instances', function () {
                var e = Entity.create({});
                expect(e).not.toBeNull();
            });

        });

    });
});