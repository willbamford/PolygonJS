# PolygonJS

JavaScript 3D library where polygons are first class citizens.

Most 3D engines default to implementing a normal vector per vertex. In PolygonJS each face / polygon has a normal. This results in fewer normals and results in a flat-shaded, more geometric look.

## Guide

PolygonJS uses [AMD](http://requirejs.org/docs/whyamd.html) to organise the JS modules.

PolygonJS uses a right-hand coordinate system.

## 3D Primer

### Coordinate Systems

- **Object Space**
- **World Space** (Model Space)
- **Camera Space** (Eye / View Space)
- **Screen Space** (Clip Space)

#### World Transform Matrix (M)

Places objects within the world.

PolygonJS uses a **scene-graph** to define the heirarchy of objects in the world.

**Child**<sub>world</sub> = **Parent**<sub>world</sub> * **Child**<sub>local</sub>

**No parent**: **Child**<sub>world</sub> = **Child**<sub>local</sub>

#### Camera Transform Matrix (C)

Places the camera in the correct position (_eye_) and orientation in world space.

#### View Transform Matrix (V)

Matrix transforms vertices from world to view-space. This matrix is the **inverse** of the camera transform matrix (**Identity Matrix = VC**, or **V = C<sup>-1</sup>**). his is used to transform any object in the scene from world space into view space.

	This matrix is usually concatenated together with the object’s world matrix and the projection matrix so that vertices can be transformed from object-space directly to clip-space in the vertex program. [1]

```
MVP = P * V * M

v' = MVP * v
```

#### Projection Transform Matrix (P)

View-space to clip-space (final). **Orthographic** e.g. isometric or **Perspective**.

	Think of the projection matrix as describing the attributes of your camera, such as field of view, focal length, fish eye lens, etc. Think of the ModelView matrix as where you stand with the camera and the direction you point it. [3]
	
Relevant OpenGL functions:

```
gluPerspective/glFrustum/glOrtho/gluOrtho2
```

	Best place to achieve zoom is in the projection transform matrix [3].

### Materials

	Like lights, materials have different ambient, diffuse, and specular colors… In addition to ambient, diffuse, and specular colors, materials have an emissive color, which simulates light originating from an object. In the OpenGL lighting model, the emissive color of a surface adds intensity to the object, but is unaffected by any light sources. Also, the emissive color does not introduce any additional light into the overall scene. [16]

### Lighting

Lights are added as nodes in the scene graph. In addition, diffuse lights have a direction.

#### Ambient, Diffuse and Specular Lighting.

	A good set of settings for a light source would be to set the Diffuse and Specular components to the colour of the light source, and the Ambient to the same colour - but at MUCH reduced intensity, 10% to 40% seems reasonable in most cases... For the glMaterial, it's usual to set the Ambient and Diffuse colours to the natural colour of the object and to put the Specular colour to white. The emission colour is generally black for objects that do not shine by their own light. [17]

#### Specular Reflection

	You can assign a number in the range of [0.0, 128.0] to GL_SHININESS - the higher the value, the smaller and brighter (more focused) the highlight. [17]

### Credits

* [Pixi.js](http://www.pixijs.com/) - used to enable WebGL drawing surface (with 2D Canvas fallback).
* [three.js](https://github.com/mrdoob/three.js) - awesome 3D library. If I'd discovered this earlier PolygonJS may not exist!

### Notes

* Canvas inspector in FF worth exploring [14].

### References

1. [3D Game Engine Programming - Understanding the View Matrix](http://3dgep.com/?p=1700)
2. [Matrix44 - Coordinate Systems (in OpenGL)](http://www.matrix44.net/cms/notes/opengl-3d-graphics/coordinate-systems-in-opengl).
3. [Using Viewing and Camera Transforms, and gluLookAt() - OpenGL](http://www.opengl.org/archives/resources/faq/technical/viewing.htm)
4. [Help stamp out GL_PROJECTION abuse](http://sjbaker.org/steve/omniv/projection_abuse.html) - don't combine view and perspective transform matrices! Can screw up z-depth accuracy, lighting (normals), fog calculation etc. etc.
5. [Calculating the gluPerspective matrix and other OpenGL matrix maths](http://unspecified.wordpress.com/2012/06/21/calculating-the-gluperspective-matrix-and-other-opengl-matrix-maths/)
6. [OpenGL Projection Matrix - Song Ho Ahn](http://www.songho.ca/opengl/gl_projectionmatrix.html)
7. [c3DL - Canvas 3D JS Library](http://www.c3dl.org/)
8. [OpenGL - Transformations](http://www.opengl.org/archives/resources/faq/technical/transformations.htm)
9. [http://www.opengl.org/archives/resources/faq/technical/lookat.cpp](http://www.opengl.org/archives/resources/faq/technical/lookat.cpp)
10. [Cameras in OpenGL (ES 2.0)](http://blog.db-in.com/cameras-on-opengl-es-2-x/)
11. [http://www.songho.ca/opengl/gl_transform.html](http://www.songho.ca/opengl/gl_transform.html)
12. [http://user.xmission.com/~nate/tutors.html](http://user.xmission.com/~nate/tutors.html)
13. [www.scratchapixel.com - Transforming Points and Vectors](http://www.scratchapixel.com/lessons/3d-basic-lessons/lesson-4-geometry/transforming-points-and-vectors/)
14. [Angelina Fabbro: Improving 2D & 3D Canvas Performance on the Web, One Frame at a Time [JSConf2014]](https://www.youtube.com/watch?v=NG5uDXCOr8s) - Use off-screen canvas?
15. [Object properties vs. array - jsPerf test](http://jsperf.com/object-properties-vs-array)
16. [Lighting &amp; Material](http://www.glprogramming.com/red/chapter05.html)
17. [http://sjbaker.org/steve/omniv/opengl_lighting.html](http://sjbaker.org/steve/omniv/opengl_lighting.html)