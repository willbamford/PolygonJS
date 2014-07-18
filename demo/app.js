require(
    [
        'polygonjs/Fn',
        'polygonjs/surfaces/WebGL',
        'polygonjs/cameras/OrthographicCamera',
        'polygonjs/cameras/PerspectiveCamera',
        'polygonjs/Scene',
        'polygonjs/Renderer',
        'polygonjs/Mesh',
        'polygonjs/math/Matrix3',
        'polygonjs/meshes/Icosahedron',
        'polygonjs/meshes/Cube',
        'polygonjs/meshes/Sphere',
        'polygonjs/formats/ObjectFileFormat',
        'polygonjs/Entity',
        'polygonjs/Engine',
        'polygonjs/entities/Model',
        'polygonjs/math/Vector3',
        'polygonjs/Profiler'
    ],
    function (
        Fn,
        Surface,
        OrthographicCamera,
        PerspectiveCamera,
        Scene,
        Renderer,
        Mesh,
        Matrix3,
        Icosahedron,
        Cube,
        Sphere,
        ObjectFileFormat,
        Entity,
        Engine,
        Model,
        Vector3,
        Profiler
    ) {
        // var model = Model.createFromMesh(Cube.create());
        var model = Model.createFromMesh(Sphere.create({
            levelOfDetail: 4,
            spikiness: 0.0
        }));

        model.tags = ['sphere'];
        model.scale = Vector3.create(2, 2, 2);
        var surface = Surface.create({});
        var scene = Scene.create({});
        var camera = PerspectiveCamera.create({});

        var root = Entity.create();
        root.addChild(model);
        // root.addChild(sphere);
        root.addChild(camera);
        scene.root = root;
        scene.revalidate();

        // Test style
        var colourIndex = 0;
        scene.polygons.forEach(function (polygon) {
            var colours = [
                'aliceblue',
                'antiquewhite',
                'aqua',
                'aquamarine',
                'azure',
                'beige',
                'bisque',
                'black',
                'blanchedalmond',
                'blue',
                'blueviolet',
                'brown',
                'burlywood',
                'cadetblue',
                'chartreuse',
                'chocolate',
                'coral',
                'cornflowerblue',
                'cornsilk',
                'crimson',
                'cyan',
                'darkblue',
                'darkcyan',
                'darkgoldenrod',
                'darkgray',
                'darkgreen',
                'darkkhaki',
                'darkmagenta',
                'darkolivegreen',
                'darkorange',
                'darkorchid',
                'darkred',
                'darksalmon',
                'darkseagreen',
                'darkslateblue',
                'darkslategray',
                'darkturquoise',
                'darkviolet',
                'deeppink',
                'deepskyblue',
                'dimgray',
                'dodgerblue',
                'firebrick',
                'floralwhite',
                'forestgreen',
                'fuchsia',
                'gainsboro',
                'ghostwhite',
                'gold',
                'goldenrod',
                'gray',
                'green',
                'greenyellow',
                'honeydew',
                'hotpink',
                'indianred',
                'indigo',
                'ivory',
                'khaki',
                'lavender',
                'lavenderblush',
                'lawngreen',
                'lemonchiffon',
                'lightblue',
                'lightcoral',
                'lightcyan',
                'lightgoldenrodyellow',
                'lightgray',            // IE6 breaks on this color
                'lightgreen',
                'lightpink',
                'lightsalmon',
                'lightseagreen',
                'lightskyblue',
                'lightslategray',
                'lightsteelblue',
                'lightyellow',
                'lime',
                'limegreen',
                'linen',
                'magenta',
                'maroon',
                'mediumaquamarine',
                'mediumblue',
                'mediumorchid',
                'mediumpurple',
                'mediumseagreen',
                'mediumslateblue',
                'mediumspringgreen',
                'mediumturquoise',
                'mediumvioletred',
                'midnightblue',
                'mintcream',
                'mistyrose',
                'moccasin',
                'navajowhite',
                'navy',
                'oldlace',
                'olive',
                'olivedrab',
                'orange',
                'orangered',
                'orchid',
                'palegoldenrod',
                'palegreen',
                'paleturquoise',
                'palevioletred',
                'papayawhip',
                'peachpuff',
                'peru',
                'pink',
                'plum',
                'powderblue',
                'purple',
                'red',
                'rosybrown',
                'royalblue',
                'saddlebrown',
                'salmon',
                'sandybrown',
                'seagreen',
                'seashell',
                'sienna',
                'silver',
                'skyblue',
                'slateblue',
                'slategray',
                'snow',
                'springgreen',
                'steelblue',
                'tan',
                'teal',
                'thistle',
                'tomato',
                'turquoise',
                'violet',
                'wheat',
                'white',
                'whitesmoke',
                'yellow',
                'yellowgreen'
            ];
            colourIndex = (++colourIndex) % colours.length;
            polygon.style = colours[colourIndex]; //Math.floor(Math.random() * colours.length)];
        });

        var renderer = Renderer.create({
            surface: surface,
            scene: scene
        });

        var eye = Vector3.create(5, 5, 5);
        var target = Vector3.create(0, 0, 0);
        
        var angle = 0.00;

        var profiler = Profiler.create({scene: scene});

        profiler.measure();
        profiler.toConsole();

        var engine = Engine.create({
            onTick: function (delta) {
                scene.update(delta);
                
                angle += delta / 10000;
                if (angle > 360) angle -= 360;

                // profiler.measure();
                // profiler.toConsole();

                model.rotation.setRotationY(angle);

                camera.position = eye;
                camera.lookAt(target);

                renderer.render(delta);
            }
        });
        engine.start();

        window.setTimeout(function () {
            engine.stop();
        }, 10000);
    }
);