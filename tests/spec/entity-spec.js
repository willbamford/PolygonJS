define(['iso-svg/Entity'], function (Entity) { 

    "use strict";

    describe('Entity', function () {

        describe('create', function () {

            var e = Entity.create({});

            it('should be able to create new instances', function () {
                expect(e).not.toBeNull();
            });
            
            it('should initially have no children', function () {
                expect(e.children.length).toBe(0);
            });
        });

        describe('transform', function () {

            it('should ')
        });
    });
});