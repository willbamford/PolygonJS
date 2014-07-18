define(
    ['polygonjs/math', 'polygonjs/geom/Vector3'],
    function (math, Vector3) {

        "use strict";

        var identity = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];

        var Matrix4 = function (a) {
            Matrix4.instanceCount++;
            var t = this;
            a = a || identity;
            if (a) {
                t.a = a[0][0]; t.b = a[0][1]; t.c = a[0][2]; t.d = a[0][3];
                t.e = a[1][0]; t.f = a[1][1]; t.g = a[1][2]; t.h = a[1][3];
                t.i = a[2][0]; t.j = a[2][1]; t.k = a[2][2]; t.l = a[2][3];
                t.m = a[3][0]; t.n = a[3][1]; t.o = a[3][2]; t.p = a[3][3];
            }
        };

        Matrix4.instanceCount = 0;

        Matrix4.create = function (a) {
            return new Matrix4(a);
        };

        Matrix4.prototype = {

            toString: function () {
                var s = '';
                this.toArrays().forEach(function (row) {
                    s += row.join(', ') + '\n';
                });
                return s;
            },

            clone: function () {
                return Matrix4.create(this.toArrays());
            },

            copy: function (m) {
                this.a = m.a; this.b = m.b, this.c = m.c; this.d = m.d;
                this.e = m.e; this.f = m.f, this.g = m.g; this.h = m.h;
                this.i = m.i; this.j = m.j, this.k = m.k; this.l = m.l;
                this.m = m.m; this.n = m.n, this.o = m.o; this.p = m.p;
                return this;
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
                return math.equals(this.a, m.a) && math.equals(this.b, m.b) && math.equals(this.c, m.c) && math.equals(this.d, m.d) &&
                    math.equals(this.e, m.e) && math.equals(this.f, m.f) && math.equals(this.g, m.g) && math.equals(this.h, m.h) &&
                    math.equals(this.i, m.i) && math.equals(this.j, m.j) && math.equals(this.k, m.k) && math.equals(this.l, m.l) &&
                    math.equals(this.m, m.m) && math.equals(this.n, m.n) && math.equals(this.o, m.o) && math.equals(this.p, m.p);
            },

            multiply: function (m) {
                return this.multiplyMatrices(this, m);
            },

            multiplyMatrices: function (m, n) {

                var ma = m.a, mb = m.b, mc = m.c, md = m.d,
                    me = m.e, mf = m.f, mg = m.g, mh = m.h,
                    mi = m.i, mj = m.j, mk = m.k, ml = m.l, 
                    mm = m.m, mn = m.n, mo = m.o, mp = m.p;

                var na = n.a, nb = n.b, nc = n.c, nd = n.d,
                    ne = n.e, nf = n.f, ng = n.g, nh = n.h,
                    ni = n.i, nj = n.j, nk = n.k, nl = n.l,
                    nm = n.m, nn = n.n, no = n.o, np = n.p;

                this.a = ma * na + mb * ne + mc * ni + md * nm;
                this.b = ma * nb + mb * nf + mc * nj + md * nn;
                this.c = ma * nc + mb * ng + mc * nk + md * no;
                this.d = ma * nd + mb * nh + mc * nl + md * np;

                this.e = me * na + mf * ne + mg * ni + mh * nm;
                this.f = me * nb + mf * nf + mg * nj + mh * nn;
                this.g = me * nc + mf * ng + mg * nk + mh * no;
                this.h = me * nd + mf * nh + mg * nl + mh * np;

                this.i = mi * na + mj * ne + mk * ni + ml * nm;
                this.j = mi * nb + mj * nf + mk * nj + ml * nn;
                this.k = mi * nc + mj * ng + mk * nk + ml * no;
                this.l = mi * nd + mj * nh + mk * nl + ml * np;

                this.m = mm * na + mn * ne + mo * ni + mp * nm;
                this.n = mm * nb + mn * nf + mo * nj + mp * nn;
                this.o = mm * nc + mn * ng + mo * nk + mp * no;
                this.p = mm * nd + mn * nh + mo * nl + mp * np;

                return this;
            },

            setPositionRotationAndScale: function (position, rotation, scale) {
                var p = position;
                var r = rotation;
                var s = scale;

                this.setPosition(p);

                this.a = s.x * r.a;
                this.b = s.x * r.b;
                this.c = s.x * r.c;

                this.e = s.y * r.d;
                this.f = s.y * r.e;
                this.g = s.y * r.f;
                
                this.i = s.z * r.g;
                this.j = s.z * r.h;
                this.k = s.z * r.i;

                this.m = 0;
                this.n = 0;
                this.o = 0;
                this.p = 1;

                return this;
            },

            setPosition: function (position) {
                this.d = position.x;
                this.h = position.y;
                this.l = position.z;
                return this;
            }
        };

        Matrix4.IDENTITY = Matrix4.create(identity);

        return Matrix4;
    }
);