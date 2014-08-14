define(
    ['polygonjs/math/Color'],
    function (Color) {

        var Material = function (opts) {
            opts = opts || {};
            this.color = opts.color || Color.WHITE.clone();
            this.emissive = opts.emissive || Color.BLACK.clone();

            this.specular = opts.specular || Color.WHITE.clone();
            this.shininess = 1.0; // Specular exponent
        };

        Material.create = function (opts) {
            return new Material(opts);
        };

        return Material;
    }
);