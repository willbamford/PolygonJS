define(['iso-svg/lib', 'iso-svg/sylvester'], function (lib, sylvester) {

    console.log(sylvester);

    var entity = {

        create: function (opts) {
            return lib.create(this, opts);
        }
        

    };
 
    return entity;

});