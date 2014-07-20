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

        return Material;
    }
);