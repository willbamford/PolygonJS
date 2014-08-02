define(
    [
        'polygonjs/entities/Model',
        'polygonjs/entities/Polygon',
        'polygonjs/math/Vector3',
        'polygonjs/math/Color',
        'polygonjs/Material'
    ],
    function (Model, Polygon, Vector3, Color, Material) {

        "use strict";

        var FootballPitchModel = function (opts) {
            opts = opts || {};
            this.buildOpts(opts);
            Model.call(this, opts);
        };

        FootballPitchModel.create = function (opts) {
            return new FootballPitchModel(opts);
        };

        FootballPitchModel.prototype = Object.create(Model.prototype);

        FootballPitchModel.prototype.buildOpts = function (opts) {

            // Measurements are in yards
            // http://en.wikipedia.org/wiki/Association_football_pitch

            var vh = function (x, z) {
                return Vector3.create(x, 0.1, z);
            };

            var vl = function (x, z) {
                return Vector3.create(x, 0.0, z);
            };

            var vp = function (v) {

                wv.push(Vector3.create());
                vv.push(Vector3.create());
                sv.push(Vector3.create());

                return (vs.push(v) - 1);
            };

            var p = function (va, material) {
                var i, len = va.length, vi;
                var pvs = [], pwv = [], pvv = [], psv = [];
                for (i = 0; i < len; i++) {
                    vi = va[i];
                    pvs.push(vs[vi]);
                    pwv.push(wv[vi]);
                    pvv.push(vv[vi]);
                    psv.push(sv[vi]);
                }
                return Polygon.create({
                    vertices: pvs,
                    worldVertices: pwv,
                    viewVertices: pvv,
                    screenVertices: psv,
                    normal: Vector3.create(0, 1, 0),
                    material: material,
                    shouldSort: false
                });
            };

            var numberOfStripes = 8;

            var width = 70;
            var depth = 110;
            var halfWidth = width * 0.5;
            var halfDepth = depth * 0.5;
            var hw = halfWidth;
            var hd = halfDepth;
            
            var centreCircleRadius = 10;
            var centerCircleSegments = 20;
            
            var penaltySpotDistance = 12;
            var penaltySpotCircleRadius = 10;

            var eighteenYardBoxDepth = 18;
            var eighteenYardBoxWidth = 44;
            var halfEighteenYardBoxWidth = eighteenYardBoxWidth * 0.5;

            var sixYardBoxDepth = 6;
            var sixYardBoxWidth = 20;
            var halfSixYardBoxWidth = sixYardBoxWidth  * 0.5;

            var pitchBoundary = 2;
            var penaltyBoundarySegments = 8;

            var lineWidth = 0.8;
            var lw = lineWidth;
            var hlw = lw * 0.5;

            var whiteLineMaterial = Material.create({
                color: Color.WHITE.clone()
            });

            var darkGrassMaterial = Material.create({
                color: Color.create({r: 67 / 255, g: 120 / 255, b: 55 / 255})
            });

            var lightGrassMaterial = Material.create({
                color: Color.create({r: 81 / 255, g: 158 / 255, b: 65 / 255})
            });

            var pitchBaseMaterial = Material.create({
                emissive: Color.create({r: 63, g: 0, b: 0})
            });

            var vs = [];
            var wv = [];
            var vv = [];
            var sv = [];
            var polygons = [];

            var buildBoundaryLine = function () {
                var v00 = vp(vh(hw + hlw, hd + hlw));
                var v01 = vp(vh(hw + hlw, -(hd + hlw)));
                var v02 = vp(vh(-(hw + hlw), -(hd + hlw)));
                var v03 = vp(vh(-(hw + hlw), hd + hlw));
                var v04 = vp(vh(hw - hlw, hd - hlw));
                var v05 = vp(vh(hw - hlw, -(hd - hlw)));
                var v06 = vp(vh(-(hw - hlw), -(hd - hlw)));
                var v07 = vp(vh(-(hw - hlw), hd - hlw));

                polygons.push(p([v00, v01, v05, v04], whiteLineMaterial));
                polygons.push(p([v01, v02, v06, v05], whiteLineMaterial)),
                polygons.push(p([v02, v03, v07, v06], whiteLineMaterial)),
                polygons.push(p([v03, v00, v04, v07], whiteLineMaterial))
            };

            var buildCenterLine = function () {
                var v00 = vp(vh(hw, hlw));
                var v01 = vp(vh(hw, -hlw));
                var v02 = vp(vh(-hw, -hlw));
                var v03 = vp(vh(-hw, hlw));

                polygons.push(p([v00, v01, v02, v03], whiteLineMaterial));
            };

            var buildEighteenYardBoxes = function () {
                var v00 = vp(vh(-(halfEighteenYardBoxWidth + hlw), hd));
                var v01 = vp(vh(-(halfEighteenYardBoxWidth + hlw), hd - eighteenYardBoxDepth - hlw));
                var v02 = vp(vh(halfEighteenYardBoxWidth + hlw, hd - eighteenYardBoxDepth - hlw));
                var v03 = vp(vh(halfEighteenYardBoxWidth + hlw, hd));
                var v04 = vp(vh(halfEighteenYardBoxWidth - hlw, hd));
                var v05 = vp(vh(halfEighteenYardBoxWidth - hlw, hd - eighteenYardBoxDepth + hlw));
                var v06 = vp(vh(-(halfEighteenYardBoxWidth - hlw), hd - eighteenYardBoxDepth + hlw));
                var v07 = vp(vh(-(halfEighteenYardBoxWidth - hlw), hd));
                var v08 = vp(vh(-(halfEighteenYardBoxWidth + hlw), -hd));
                var v09 = vp(vh(-(halfEighteenYardBoxWidth + hlw), -(hd - eighteenYardBoxDepth - hlw)));
                var v10 = vp(vh(halfEighteenYardBoxWidth + hlw, -(hd - eighteenYardBoxDepth - hlw)));
                var v11 = vp(vh(halfEighteenYardBoxWidth + hlw, -hd));
                var v12 = vp(vh(halfEighteenYardBoxWidth - hlw, -hd));
                var v13 = vp(vh(halfEighteenYardBoxWidth - hlw, -(hd - eighteenYardBoxDepth + hlw)));
                var v14 = vp(vh(-(halfEighteenYardBoxWidth - hlw), -(hd - eighteenYardBoxDepth + hlw)));
                var v15 = vp(vh(-(halfEighteenYardBoxWidth - hlw), -hd));

                polygons.push(p([v00, v01, v02, v03, v04, v05, v06, v07], whiteLineMaterial));
                polygons.push(p([v08, v09, v10, v11, v12, v13, v14, v15], whiteLineMaterial));
            };

            var buildSixYardBoxes = function () {
                var v00 = vp(vh(-(halfSixYardBoxWidth + hlw), hd));
                var v01 = vp(vh(-(halfSixYardBoxWidth + hlw), hd - sixYardBoxDepth - hlw));
                var v02 = vp(vh(halfSixYardBoxWidth + hlw, hd - sixYardBoxDepth - hlw));
                var v03 = vp(vh(halfSixYardBoxWidth + hlw, hd));
                var v04 = vp(vh(halfSixYardBoxWidth - hlw, hd));
                var v05 = vp(vh(halfSixYardBoxWidth - hlw, hd - sixYardBoxDepth + hlw));
                var v06 = vp(vh(-(halfSixYardBoxWidth - hlw), hd - sixYardBoxDepth + hlw));
                var v07 = vp(vh(-(halfSixYardBoxWidth - hlw), hd));
                var v08 = vp(vh(-(halfSixYardBoxWidth + hlw), -hd));
                var v09 = vp(vh(-(halfSixYardBoxWidth + hlw), -(hd - sixYardBoxDepth - hlw)));
                var v10 = vp(vh(halfSixYardBoxWidth + hlw, -(hd - sixYardBoxDepth - hlw)));
                var v11 = vp(vh(halfSixYardBoxWidth + hlw, -hd));
                var v12 = vp(vh(halfSixYardBoxWidth - hlw, -hd));
                var v13 = vp(vh(halfSixYardBoxWidth - hlw, -(hd - sixYardBoxDepth + hlw)));
                var v14 = vp(vh(-(halfSixYardBoxWidth - hlw), -(hd - sixYardBoxDepth + hlw)));
                var v15 = vp(vh(-(halfSixYardBoxWidth - hlw), -hd));

                polygons.push(p([v00, v01, v02, v03, v04, v05, v06, v07], whiteLineMaterial));
                polygons.push(p([v08, v09, v10, v11, v12, v13, v14, v15], whiteLineMaterial));
            };

            var buildPenaltySpots = function () {
                var v00 = vp(vh(0, hd - penaltySpotDistance + lw));
                var v01 = vp(vh(lw, hd - penaltySpotDistance));
                var v02 = vp(vh(0, hd - penaltySpotDistance - lw));
                var v03 = vp(vh(-lw, hd - penaltySpotDistance));
                var v04 = vp(vh(0, -(hd - penaltySpotDistance + lw)));
                var v05 = vp(vh(lw, -(hd - penaltySpotDistance)));
                var v06 = vp(vh(0, -(hd - penaltySpotDistance - lw)));
                var v07 = vp(vh(-lw, -(hd - penaltySpotDistance)));

                polygons.push(p([v00, v01, v02, v03], whiteLineMaterial));
                polygons.push(p([v04, v05, v06, v07], whiteLineMaterial));
            };

            var buildArc = function (segments, arc, offset, radius, lineWidth, px, pz) {

                var angle, x, z, hlw = lineWidth * 0.5;
                var vis = [];
                for (var i = 0; i <= segments; i++) {
                    angle = offset + (arc * 0.5) - (i * arc / segments);
                    x = (radius + hlw) * Math.sin(angle);
                    z = (radius + hlw) * -Math.cos(angle);
                    vis.push(vp(vh(x + px, z + pz)));
                }

                for (var i = segments; i >= 0; i--) {
                    angle = offset + (arc * 0.5) - (i * arc / segments);
                    x = (radius - hlw) * Math.sin(angle);
                    z = (radius - hlw) * -Math.cos(angle);
                    vis.push(vp(vh(x + px, z + pz)));
                }

                polygons.push(p(vis, whiteLineMaterial));
            };

            var buildCenterCircle = function () {
                buildArc(centerCircleSegments, 2 * Math.PI, 0, centreCircleRadius, lineWidth, 0, 0);
            };

            var buildPenaltyBoundaries = function () {
                var arc = Math.PI / 2 + 0.3;
                buildArc(penaltyBoundarySegments, arc, 0, penaltySpotCircleRadius, lineWidth, 0, hd - penaltySpotDistance);
                buildArc(penaltyBoundarySegments, arc, Math.PI, penaltySpotCircleRadius, lineWidth, 0, -(hd - penaltySpotDistance));
            };

            var buildPitchGrass = function () {

                var totalDepth = depth + 2 * pitchBoundary, htd = totalDepth * 0.5;
                var vis = [];
                for (var i = 0; i <= numberOfStripes; i++) {
                    vis.push(vp(vl(hw + pitchBoundary, -htd + (i * totalDepth) / numberOfStripes)));
                    vis.push(vp(vl(-(hw + pitchBoundary), -htd + (i * totalDepth) / numberOfStripes)));
                }

                var material, idx = 0;
                for (var i = 0; i < numberOfStripes; i++) {
                    material = (i % 2 === 0) ? lightGrassMaterial : darkGrassMaterial;
                    polygons.push(p([vis[idx + 0], vis[idx + 2], vis[idx + 3], vis[idx + 1]], material));
                    idx += 2;
                }
            };

            var buildStadium = function () {

            };

            buildPitchGrass();
            buildBoundaryLine();
            buildCenterLine();
            buildEighteenYardBoxes();
            buildSixYardBoxes();
            buildPenaltySpots();
            buildCenterCircle();
            buildPenaltyBoundaries();

            opts.vertices = vs;
            opts.worldVertices = wv;
            opts.viewVertices = vv;
            opts.screenVertices = sv;

            opts.polygons = polygons;
        };

        return FootballPitchModel;
    }
);