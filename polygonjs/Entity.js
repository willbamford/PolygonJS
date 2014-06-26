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
            this.parent = null;
            this.position = opts.position || Vector3.create(0, 0, 0);
            this.rotation = opts.rotation || Matrix3.IDENTITY.copy();
            this.scale    = opts.scale    || Vector3.create(1, 1, 1);
            this.children = [];
        };

        Entity.create = function (opts) {
            return new Entity(opts);
        };

        Entity.prototype = {

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

            getLocalTransform: function () { // Optimise by caching?
                var p = this.position;
                var r = this.rotation;
                var s = this.scale;
                return Matrix4.create([
                    [r.a * s.x, r.b,       r.c,       p.x],
                    [r.d,       r.e * s.y, r.f,       p.y],
                    [r.g,       r.h,       r.i * s.z, p.z],
                    [0,         0,         0,         1  ]
                ]);
            },

            getTransform: function () { // Optimise by caching?
                return this.parent ?
                    this.getLocalTransform().multiply(this.parent.getTransform()) :
                    this.getLocalTransform();
            }
        };

        return Entity;
    }
);