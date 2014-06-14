define(['iso-svg/lib', 'entity'], function (lib, entity) {

    var camera = {

        create: function (opts) {
            var instance = lib.create(entity, {
                vector: [1, 1, 1],
                project: function () {

                }
            });
        };

        vector: [1, 1, 1], // Isometric

        project: function () {
            
        }
    };

    return camera;
});