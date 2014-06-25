define(['iso-svg/math'], function (math) {

    "use strict";

    var identity = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ];

    var Matrix4 = function (a) {
        var t = this;
        a = a || identity;
        if (a) {
            t.a = a[0][0]; t.b = a[0][1]; t.c = a[0][2]; t.d = a[0][3];
            t.e = a[1][0]; t.f = a[1][1]; t.g = a[1][2]; t.h = a[1][3];
            t.i = a[2][0]; t.j = a[2][1]; t.k = a[2][2]; t.l = a[2][3];
            t.m = a[3][0]; t.n = a[3][1]; t.o = a[3][2]; t.p = a[3][3];
        }
    };

    Matrix4.create = function (a) {
        return new Matrix4(a);
    };

    Matrix4.prototype = {

        copy: function () {
            return Matrix4.create(this.toArrays());
        },

        toArrays: function () {
            return [
                [this.a, this.b, this.c, this.d],
                [this.e, this.f, this.g, this.h],
                [this.i, this.j, this.k, this.l],
                [this.m, this.n, this.o, this.p]
            ];
        },

        equals: function (m) {
            return math.equals(this.a, m.a) && math.equals(this.b, m.b) && math.equals(this.c, m.c) && math.equals(this.d, m.d)
                && math.equals(this.e, m.e) && math.equals(this.f, m.f) && math.equals(this.g, m.g) && math.equals(this.h, m.h)
                && math.equals(this.i, m.i) && math.equals(this.j, m.j) && math.equals(this.k, m.k) && math.equals(this.l, m.l)
                && math.equals(this.m, m.m) && math.equals(this.n, m.n) && math.equals(this.o, m.o) && math.equals(this.p, m.p);
        },

        multiply: function (m) {
            var p = Matrix4.create(),
                t = this;
            
            p.a = t.a * m.a + t.b * m.e + t.c * m.i + t.d * m.m;
            p.b = t.a * m.b + t.b * m.f + t.c * m.j + t.d * m.n;
            p.c = t.a * m.c + t.b * m.g + t.c * m.k + t.d * m.o;
            p.d = t.a * m.d + t.b * m.h + t.c * m.l + t.d * m.p;

            p.e = t.e * m.a + t.f * m.e + t.g * m.i + t.h * m.m;
            p.f = t.e * m.b + t.f * m.f + t.g * m.j + t.h * m.n;
            p.g = t.e * m.c + t.f * m.g + t.g * m.k + t.h * m.o;
            p.h = t.e * m.d + t.f * m.h + t.g * m.l + t.h * m.p;

            p.i = t.i * m.a + t.j * m.e + t.k * m.i + t.l * m.m;
            p.j = t.i * m.b + t.j * m.f + t.k * m.j + t.l * m.n;
            p.k = t.i * m.c + t.j * m.g + t.k * m.k + t.l * m.o;
            p.l = t.i * m.d + t.j * m.h + t.k * m.l + t.l * m.p;

            p.m = t.m * m.a + t.n * m.e + t.o * m.i + t.p * m.m;
            p.n = t.m * m.b + t.n * m.f + t.o * m.j + t.p * m.n;
            p.o = t.m * m.c + t.n * m.g + t.o * m.k + t.p * m.o;
            p.p = t.m * m.d + t.n * m.h + t.o * m.l + t.p * m.p;

            return p;
        }
    };

    Matrix4.IDENTITY = Matrix4.create(identity);

    return Matrix4;
});