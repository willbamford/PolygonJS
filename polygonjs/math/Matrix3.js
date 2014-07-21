define(
    ['polygonjs/math/PMath', 'polygonjs/math/Vector3'],
    function (PMath, Vector3) {

        "use strict";

        var identity = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1]
        ];

        var Matrix3 = function (a) {
            Matrix3.instanceCount++;
            var t = this;
            a = a || identity;
            if (a) {
                t.a = a[0][0]; t.b = a[0][1]; t.c = a[0][2];
                t.d = a[1][0]; t.e = a[1][1]; t.f = a[1][2];
                t.g = a[2][0]; t.h = a[2][1]; t.i = a[2][2];
            }
        };

        Matrix3.instanceCount = 0;

        Matrix3.create = function (a) {
            return new Matrix3(a);
        };

        Matrix3.prototype = {

            toString: function () {
                var s = '';
                this.toArrays().forEach(function (row) {
                    s += row.join(', ') + '\n';
                });
                return s;
            },

            clone: function () {
                return Matrix3.create(this.toArrays());
            },

            copy: function (m) {
                this.a = m.a; this.b = m.b; this.c = m.c;
                this.d = m.d; this.e = m.e; this.f = m.f;
                this.g = m.g; this.h = m.h; this.i = m.i;
                return this;
            },

            toArrays: function () {
                return [
                    [this.a, this.b, this.c],
                    [this.d, this.e, this.f],
                    [this.g, this.h, this.i],
                ];
            },

            equals: function (m) {
                return PMath.equals(this.a, m.a) && PMath.equals(this.b, m.b) && PMath.equals(this.c, m.c) &&
                    PMath.equals(this.d, m.d) && PMath.equals(this.e, m.e) && PMath.equals(this.f, m.f) &&
                    PMath.equals(this.g, m.g) && PMath.equals(this.h, m.h) && PMath.equals(this.i, m.i);
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
            },

            multiplyVector: function (p) {
                var t = this;
                var x, y, z;
                x = p.x * t.a + p.y * t.b + p.z * t.c;
                y = p.x * t.d + p.y * t.e + p.z * t.f;
                z = p.x * t.g + p.y * t.h + p.z * t.i;
                return Vector3.create(x, y, z);
            },

            inverse: function () {

                var t = this,
                    m = Matrix3.create();

                var det =
                    t.a * (t.e * t.i - t.h * t.f) -
                    t.b * (t.d * t.i - t.f * t.g) +
                    t.c * (t.d * t.h - t.e * t.g);

                if (det === 0) return null;
                
                var idet = 1 / det;
                m.a = (t.e * t.i - t.h * t.f) * idet;
                m.b = (t.c * t.h - t.b * t.i) * idet;
                m.c = (t.b * t.f - t.c * t.e) * idet;
                m.d = (t.f * t.g - t.d * t.i) * idet;
                m.e = (t.a * t.i - t.c * t.g) * idet;
                m.f = (t.d * t.c - t.a * t.f) * idet;
                m.g = (t.d * t.h - t.g * t.e) * idet;
                m.h = (t.g * t.b - t.a * t.h) * idet;
                m.i = (t.a * t.e - t.d * t.b) * idet;

                return m;
            },

            tranpose: function () {
                var t = this,
                    m = t.clone();
                m.b = t.d; m.d = t.b;
                m.c = t.g; m.g = t.c;
                m.f = t.h; m.h = t.f;
                return m;
            },

            setRotationX: function (ax) {
                var c = Math.cos(ax), s = Math.sin(ax);
                this.a = 1; this.b = 0; this.c =  0;
                this.d = 0; this.e = c; this.f = -s;
                this.g = 0; this.h = s; this.i =  c;
                return this;
            },

            setRotationY: function (ay) {
                var c = Math.cos(ay), s = Math.sin(ay);
                this.a =  c; this.b = 0; this.c = s;
                this.d =  0; this.e = 1; this.f = 0;
                this.g = -s; this.h = 0; this.i = c;
                return this;
            },

            setRotationZ: function (az) {
                var c = Math.cos(az), s = Math.sin(az);
                this.a = c; this.b = -s; this.c = s;
                this.d = s; this.e =  c; this.f = 0;
                this.g = 0; this.h =  0; this.i = 1;
                return this;
            }
        };

        Matrix3.IDENTITY = Matrix3.create(identity);

        return Matrix3;
    }
);