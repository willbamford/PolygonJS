define(
    [
        'polygonjs/Entity',
        'polygonjs/entities/Polygon',
        'polygonjs/lib'
    ],
    function (Entity, Polygon, lib) {

        var Model = function (opts) {
            opts = opts || {};
            Entity.call(this, opts);
            this.type = 'model';

            // Set from opts or null    
            this.vertices = [];           // Object Space
            this.worldVertices;      // World Space
            this.viewVertices;       // View Space
            this.projectionVertices; // 
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
            var model = Model.create(opts);

            

            // mesh.eachFace(function (vertices, normal) {
            //     model.vertices = model.vertices.concat(vertices);
            //     // var polygon = Polygon.create({
            //     //     vertices: vertices,
            //     //     normal: normal
            //     // });
            //     // model.addChild(polygon);
            // });
            // console.log(model.vertices);

            return model;
        };

        Model.prototype = Object.create(Entity.prototype);

        return Model;
    }
);