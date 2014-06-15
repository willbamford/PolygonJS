define(['iso-svg/lib'], function (lib) {

    "use strict";

    var Entity = function (opts) {
    };

    Entity.create = function (opts) {
        return new Entity(opts);
    };

    return Entity;
});