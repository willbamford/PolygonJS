# PolygonJS

JavaScript 3D library where polygons are first class citizens.

## Guide

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

Best place to achieve **zoom** is in the projection transform matrix [3].

### References

1. [3D Game Engine Programming - Understanding the View Matrix](http://3dgep.com/?p=1700)
2. [Matrix44 - Coordinate Systems (in OpenGL)](http://www.matrix44.net/cms/notes/opengl-3d-graphics/coordinate-systems-in-opengl).
3. [Using Viewing and Camera Transforms, and gluLookAt() - OpenGL](http://www.opengl.org/archives/resources/faq/technical/viewing.htm)
4. [Help stamp out GL_PROJECTION abuse](http://sjbaker.org/steve/omniv/projection_abuse.html) - don't combine view and perspective transform matrices! Can screw up z-depth accuracy, lighting (normals), fog calculation etc. etc.
5. [Calculating the gluPerspective matrix and other OpenGL matrix maths](http://unspecified.wordpress.com/2012/06/21/calculating-the-gluperspective-matrix-and-other-opengl-matrix-maths/)