define(
    ['polygonjs/math/Color'],
    function (Color) {

        var Material = function (opts) {
            opts = opts || {};
            this.diffuse = opts.diffuse || Color.WHITE.clone();
            this.ambient = opts.ambient || Color.WHITE.clone();
            this.emissive = opts.emissive || Color.BLACK.clone();
        };

        Material.create = function (opts) {
            return new Material(opts);
        };

        // // Note: wouldn't calculate here!
        // Material.prototype.getColor = function (lights) {

        //     // var color = Color.create();
        //     // lights.forEach(function (light)) {
        //     //     color.add(light.ambient.multiply(this.ambient));
        //     //     color.add(light.diffuse.multiply(this.diffuse));
        //     //     color.add(light.specular.multiply(this.specular));
        //     // };
        //     // color.add(this.emissive);
        //     // return color;
        // };

        return Material;
    }
);