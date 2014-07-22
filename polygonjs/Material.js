define(
    ['polygonjs/math/Color'],
    function (Color) {

        var Material = function (opts) {
            opts = opts || {};
            this.color = opts.color || Color.WHITE.clone();
            this.emissive = opts.emissive || Color.BLACK.clone();
        };

        Material.create = function (opts) {
            return new Material(opts);
        };

        return Material;
    }
);