define(['iso-svg/math'], function (math) {

    "use strict";

    var identity = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ];

    var Matrix3 = function (a) {
        a = a || identity;
        if (a) {
            this.a = a[0][0]; this.b = a[0][1]; this.c = a[0][2];
            this.d = a[1][0]; this.e = a[1][1]; this.f = a[1][2];
            this.g = a[2][0]; this.h = a[2][1]; this.i = a[2][2];
        }
    };

    Matrix3.create = function (a) {
        return new Matrix3(a);
    };

    Matrix3.createRotationX = function (ax) {
        var c = Math.cos(ax), s = Math.sin(ax);
        return Matrix3.create([
            [1,  0,  0],
            [0,  c, -s],
            [0,  s,  c]
        ]);
    };

    Matrix3.createRotationY = function (ay) {
        var c = Math.cos(ay), s = Math.sin(ay);
        return Matrix3.create([
            [ c,  0, s],
            [ 0,  1, 0],
            [-s,  0, c]
        ]);
    };

    Matrix3.createRotationZ = function (az) {
        var c = Math.cos(az), s = Math.sin(az);
        return Matrix3.create([
            [c, -s, 0],
            [s,  c, 0],
            [0,  0, 1]
        ]);
    };

    Matrix3.IDENTITY = Matrix3.create(identity);

    Matrix3.prototype = {

        copy: function () {
            return Matrix3.create(this.toArrays());
        },

        toArrays: function () {
            return [
                [this.a, this.b, this.c],
                [this.d, this.e, this.f],
                [this.g, this.h, this.i],
            ];
        },

        equals: function (m) {
            return math.equals(this.a, m.a) && math.equals(this.b, m.b) && math.equals(this.c, m.c)
                && math.equals(this.d, m.d) && math.equals(this.e, m.e) && math.equals(this.f, m.f)
                && math.equals(this.g, m.g) && math.equals(this.h, m.h) && math.equals(this.i, m.i);
        },

        multiply: function (m) {
            var p = Matrix3.create(),
                t = this;
            
            p.a = t.a * m.a + t.b * m.d + t.c * m.g;
            p.b = t.a * m.b + t.b * m.e + t.c * m.h;
            p.c = t.a * m.c + t.b * m.f + t.c * m.i;

            p.d = t.d * m.a + t.e * m.d + t.f * m.g;
            p.e = t.d * m.b + t.e * m.e + t.f * m.h;
            p.f = t.d * m.c + t.e * m.f + t.f * m.i;

            p.g = t.g * m.a + t.h * m.d + t.i * m.g;
            p.h = t.g * m.b + t.h * m.e + t.i * m.h;
            p.i = t.g * m.c + t.h * m.f + t.i * m.i;

            return p;
        }
    };

    return Matrix3;
});