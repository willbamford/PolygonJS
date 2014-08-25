define(
    ['polygonjs/math/Color'],
    function (Color) {

        var Material = function (opts) {
            opts = opts || {};
            this.color = opts.color || Color.WHITE.clone();
            this.emissive = opts.emissive || Color.BLACK.clone();

            this.specular = opts.specular || Color.create({r: 1, g: 0.1, b: 0.1});

            // Specular exponent
            this.shininess = opts.shininess !== undefined ? opts.shininess : 5.0;
        };

        Material.create = function (opts) {
            return new Material(opts);
        };

        return Material;
    }
);
