define(
    [
        'polygonjs/lib',
        'polygonjs/geom/Vector3',
        'polygonjs/geom/Matrix3',
        'polygonjs/geom/Matrix4'
    ],
    function (lib, Vector3, Matrix3, Matrix4) {

        "use strict";

        var Entity = function (opts) {
            opts = opts || {};
            this.type = 'entity';
            this.parent = null;
            this.position = opts.position || Vector3.create(0, 0, 0);
            this.rotation = opts.rotation || Matrix3.IDENTITY.copy();
            this.scale    = opts.scale    || Vector3.create(1, 1, 1);
            this.children = [];
            this.tags = opts.tags || [];
        };

        Entity.create = function (opts) {
            return new Entity(opts);
        };

        Entity.prototype = {

            findWithTag: function (tag) {
                var self = this, found = [];
                if (lib.contains(this.tags, tag))
                    found.push(self);
                lib.each(this.children, function (entity) {
                    found = found.concat(entity.findWithTag(tag));
                });
                return found;
            },

            update: function (delta) {
                lib.each(this.children, function (entity) {
                    entity.update(delta);
                });
            },

            root: function () {
                var e = this;
                while (e.parent) e = e.parent;
                return e;
            },

            addChild: function (entity) {
                if (!entity.parent) {
                    entity.parent = this;
                    this.children.push(entity);
                }
                return this;
            },

            removeChild: function (entity) {
                if (entity.parent === this) {
                    var i = this.children.indexOf(entity);
                    if (i !== -1) {
                        this.children.splice(i, 1);
                        entity.parent = null;
                    }
                }
                return this;
            },

            getTransform: function () { // Optimise
                var p = this.position;
                var r = this.rotation;
                var s = this.scale;
                return Matrix4.create([
                    [s.x * r.a, s.x * r.b, s.x * r.c, p.x],
                    [s.y * r.d, s.y * r.e, s.y * r.f, p.y],
                    [s.z * r.g, s.z * r.h, s.z * r.i, p.z],
                    [ 0,    0,   0,   1]
                ]);
            },

            getWorldTransform: function () { // Optimise
                return this.parent ?
                    this.parent.getWorldTransform().multiply(this.getTransform()) :
                    this.getTransform();
            }
        };

        return Entity;
    }
);