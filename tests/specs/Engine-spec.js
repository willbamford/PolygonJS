define(['polygonjs/Engine'], function (Engine) { 

    "use strict";

    describe('Engine', function () {
        
        describe('create', function () {
            it('should be able to create new instance', function () {
                var engine = Engine.create();
                expect(engine).toBeInstanceOf(Engine);
            });
        });
    });
});