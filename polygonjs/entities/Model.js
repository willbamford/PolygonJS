define(
    [
        'polygonjs/Entity',
        'polygonjs/entities/Polygon',
        'polygonjs/lib',
        'polygonjs/geom/Vector3'
    ],
    function (Entity, Polygon, lib, Vector3) {

        var Model = function (opts) {
            opts = opts || {};
            Entity.call(this, opts);
            this.type = 'model';
  
            this.normals = opts.normals || [];
            this.vertices = opts.vertices || []; // Object Space
            this.worldVertices;                  // World Space
            this.viewVertices;                   // View Space
            this.screenVertices;                 // Clip Space
            this.initVertices();
        };

        Model.create = function (opts) {
            return new Model(opts);
        };

        // Polygon should be fairly dumb

        /*
            Polygon
            =======

            Shared properties (from ancestor):
            ----------------------------------
            - material (possibly unique)
            - transform
            - vertices
            - worldVertices
            - viewVertices
            - projectionVertices
            - normal

            Still receives an update? Yes (but don't transform unless instructed to do so).
            Transforms it's own vertices - generally no.

            Could consider introducing a "fracture" method to Polgons which turns each poly into it's own unique thing
        */

        Model.createFromMesh = function (mesh, opts) {

            var self = this;

            var vertices = mesh.vertices;

            opts = lib.merge(opts, {
                vertices: vertices
            });

            // TODO: create polygons in the constructor!!!

            return Model.create(opts);

            // // opts = lib.merge(opts, {
            // // });
            // // var model = Model.create(opts);
            // model.vertices = mesh.vertices;
            // // mesh.eachFace(function (vertices, normal) {
            // //     model.vertices = model.vertices.concat(vertices);
            // //     // var polygon = Polygon.create({
            // //     //     vertices: vertices,
            // //     //     normal: normal
            // //     // });
            // //     // model.addChild(polygon);
            // // });
            // // console.log(model.vertices);
            // return model;
        };

        Model.prototype = Object.create(Entity.prototype);

        Model.prototype.initVertices = function () {
            this.worldVertices = [];
            this.viewVertices = [];
            this.screenVertices = [];
            var i = this.vertices.length;
            while (--i >= 0) {
                this.worldVertices.push(Vector3.create(0, 0, 0));
                this.viewVertices.push(Vector3.create(0, 0, 0));
                this.screenVertices.push(Vector3.create(0, 0, 0));
            }
        };

        return Model;
    }
);