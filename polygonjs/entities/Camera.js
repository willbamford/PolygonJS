define(
    ['polygonjs/Entity'],
        function (Entity) {

        var Camera = function (opts) {
            opts = opts || {};
            Entity.call(this, opts);

            this.upVector;
            this.targetVector;
            this.viewTransform;
        };

        Camera.create = function (opts) {
            return new Camera(opts);
        };

        Camera.prototype = Object.create(Entity.prototype);

        Camera.prototype.update = function (delta) {
            Entity.prototype.update.call(this, delta);
            console.log('Camera update: ' + delta);
        };

        return Camera;
    }
);