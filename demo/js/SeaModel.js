define(
    [
        'polygonjs/entities/Model'
    ],
    function (Model) {

        var SeaModel = function (opts) {
            opts = opts || {};
            this.buildOpts(opts);
            Model.call(this, opts);
        };

        SeaModel.create = function (opts) {
            return new SeaModel(opts);
        };

        SeaModel.prototype = Object.create(Model.prototype);

        SeaModel.prototype.buildOpts = function (opts) {
            console.log('Building opts!');
        };

        return SeaModel;
    }
)
