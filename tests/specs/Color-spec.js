define(
    [
        'polygonjs/math/Color'
    ],
    function (Color) {

        "use strict";

        describe('Color', function () {

            describe('create', function () {

                it('should be able to create new instances', function () {
                    var color = Color.create();
                    expect(color).toBeInstanceOf(Color);
                });

                it('should default to zero red, green and blue', function () {
                    var color = Color.create();
                    expect(color.r).toBe(0);
                    expect(color.g).toBe(0);
                    expect(color.b).toBe(0);
                });

                it('should be able to initialise red, green and blue', function () {
                    var color = Color.create();
                    color = Color.create({
                        r: 0.1,
                        g: 0.2,
                        b: 0.3
                    });
                    expect(color.r).toBe(0.1);
                    expect(color.g).toBe(0.2);
                    expect(color.b).toBe(0.3);
                });
            });

            describe('equals', function () {
                it('should return true if the two color components are identical', function () {
                    var a = Color.create({r: 0.1, g: 0.2, b: 0.3});
                    var b = Color.create({r: 0.1, g: 0.2, b: 0.3});
                    var c = Color.create({r: 0.9, g: 0.2, b: 0.3});
                    expect(a.equals(a)).toBeTruthy();
                    expect(a.equals(b)).toBeTruthy();
                    expect(b.equals(a)).toBeTruthy();
                    expect(a.equals(c)).toBeFalsy();
                });
            });

            describe('clone', function () {
                it('should create a clone of this color', function () {
                    var color = Color.create({r: 0.4, g: 1.0, b: 0.2});
                    var clone = color.clone();
                    expect(clone).not.toBe(color);
                    expect(clone).toEqualColor(color);
                });
            });

            describe('copy', function () {
                it('should copy another color\'s components to this color', function () {
                    var a = Color.create({r: 0.7, b: 0.6, g: 0.5});
                    var b = Color.create({r: 0.3, b: 0.2, g: 0.1});
                    var r = a.copy(b);
                    expect(r).toBe(a);
                    expect(a).toEqualColor(b);
                });
            });

            describe('add', function () {
                it('should add a color\'s components to this color', function () {
                    var color = Color.create({r: 0.5, g: 0.9, b: 1.0});
                    var r = color.add(Color.create({r: 0.4, g: 0.9, b: -2.0}));
                    expect(r).toBe(color);
                    expect(r).toEqualColor(Color.create({r: 0.9, g: 1.8, b: -1.0}));
                });
            });

            describe('subtract', function () {
                it('should subtract the input color components from this color', function () {
                    var color = Color.create({r: 0.5, g: 0.9, b: 1.0});
                    var r = color.subtract(Color.create({r: 0.4, g: 0.9, b: -2.0}));
                    expect(r).toBe(color);
                    expect(r).toEqualColor(Color.create({r: 0.1, g: 0.0, b: 3.0}));
                });
            });

            describe('multiply', function () {
                it('should multiply the input color components with this color', function () {
                    var a = Color.create({r: 0.5, g: 0.9, b: 1.0});
                    var b = Color.create({r: 0.2, g: 0.3, b: 0.4});
                    var r = a.multiply(b);
                    expect(r).toBe(a);
                    expect(r).toEqualColor(Color.create({r: 0.1, g: 0.27, b: 0.4}));
                });
            });

            describe('multiplyScalar', function () {
                it('should multiply the input color components with a scalar', function () {
                    var a = Color.create({r: 0.5, g: 0.9, b: 1.0});
                    var r = a.multiplyScalar(0.5);
                    expect(r).toBe(a);
                    expect(r).toEqualColor(Color.create({r: 0.25, g: 0.45, b: 0.5}));
                });
            });

            describe('clamp', function () {
                it('should clamp the components between zero and one', function () {
                    var color = Color.create({r: -10, g: 0.5, b: 1.01});
                    var r = color.clamp();
                    expect(r).toBe(color);
                    expect(r).toEqualColor(Color.create({r: 0, g: 0.5, b: 1.0}));
                });
            });

            describe('setRGB', function () {
                it('should be able to set the red, green and blue components of a color', function () {
                    var color = Color.create({r: 0, g: 0, b: 0});
                    var r = color.setRGB(1, 0.9, 0.8);
                    expect(r).toBe(color);
                    expect(r).toEqualColor(Color.create({r: 1, g: 0.9, b: 0.8}));
                });
            });

            describe('getHex', function () {
                it('should return the hex value of this color', function () {
                    expect(Color.create({r: 0, g: 0, b: 0}).getHex()).toEqual(0x000000);
                    expect(Color.create({r: 1, g: 1, b: 1}).getHex()).toEqual(0xffffff);
                    expect(Color.create({r: 0.1, g: 0.2, b: 0.3}).getHex()).toEqual(0x19334c);
                });
            });

            describe('setHex', function () {
                it('should set this color based on a single hex value', function () {
                    var color = Color.create();
                    var r = color.setHex(0xffffff);
                    expect(r).toBe(color);
                    expect(r).toEqualColor(Color.create({r: 1, g: 1, b: 1}));
                    r = color.setHex(0x000000);
                    expect(r).toEqualColor(Color.create({r: 0, g: 0, b: 0}));
                    r = color.setHex(0x66CCFF);
                    expect(r).toEqualColor(Color.create({r: 0.4, g: 0.8, b: 1.0}));
                });
            });
        });
    }
);