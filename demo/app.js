require(['iso-svg/surface'], function (surface) {
    var s = surface.create({});

    s.line(10, 10, 100, 100);
    s.circle(100, 100, 25);
});