define(
    [
        'polygonjs/Fn',
        'polygonjs/math/Vector3',
        'polygonjs/math/Matrix3',
        'polygonjs/math/Matrix4'
    ],
    function (Fn, Vector3, Matrix3, Matrix4) {

        "use strict";

        var Entity = function (opts) {
            opts = opts || {};
            this.type = 'entity';
            this.parent = null;
            this.position = opts.position || Vector3.create(0, 0, 0);
            this.rotation = opts.rotation || Matrix3.IDENTITY.clone();
            this.scale    = opts.scale    || Vector3.create(1, 1, 1);
            this.children = [];
            this.tags = opts.tags || [];

            this.up = opts.up || Vector3.UP.clone();
            this.right = opts.right || Vector3.RIGHT.clone();
            this.forward = opts.forward || Vector3.FORWARD.clone();

            this.localTransform = Matrix4.IDENTITY.clone();
            this.worldTransform = Matrix4.IDENTITY.clone();
            this.worldPosition = Vector3.ZERO.clone();
        };

        Entity.create = function (opts) {
            return new Entity(opts);
        };

        Entity.prototype = {

            find: function (tag) {
                var found = [];
                if (Fn.contains(this.tags, tag)) found.push(this);
                Fn.each(this.children, function (entity) {
                    found = found.concat(entity.find(tag));
                });
                return found;
            },

            findFirst: function (tag) {
                var all = this.find(tag);
                return all.length > 0 ? all[0] : null;
            },

            update: function (delta) {

                this.updateLocalTransform();
                this.updateWorldTransform();
                this.worldPosition.applyPosition(this.worldTransform);

                var children = this.children;
                var i = children.length;
                var entity;
                while (--i >= 0) {
                    entity = children[i];
                    entity.update(delta);
                }
            },

            updateLocalTransform: function () {
                this.localTransform.setPositionRotationAndScale(
                    this.position,
                    this.rotation,
                    this.scale
                );
            },

            updateWorldTransform: function () {
                var lt = this.localTransform;
                var wt = this.worldTransform;
                var p = this.parent;
                return p ? wt.copy(p.worldTransform).multiply(lt) : lt;
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
            }
        };

        return Entity;
    }
);