define(['polygonjs/Fn'], function (Fn) { 

    "use strict";

    describe('Fn', function () {

        describe('each', function () {
            
            it('should do nothing if the input array is undefined or null', function () {
                var isCalled = false;
                Fn.each(null, function (el, i) { isCalled = true; });
                expect(isCalled).toBeFalsy();
            });

            it('should iterate over array and pass element and index to callback function', function () {
                var arr = ['twinsen', 'zoe', 'funfrock'],
                    trace = '';
                Fn.each(arr, function (el, i) {
                    trace += '[' + el + ':' + i + ']';
                });
                expect(trace).toEqual('[twinsen:0][zoe:1][funfrock:2]');
            });

            it('should do nothing if the input array is undefined or null', function () {
                var isCalled = false;
                Fn.reverseEach(null, function (el, i) { isCalled = true; });
                expect(isCalled).toBeFalsy();
            });
        });

        describe('reverseEach', function () {

            it('should perform as each but in reverse', function () {
                var arr = ['twinsen', 'zoe', 'funfrock'],
                    trace = '';
                Fn.reverseEach(arr, function (el, i) {
                    trace += '[' + el + ':' + i + ']';
                });
                expect(trace).toEqual('[funfrock:2][zoe:1][twinsen:0]');
            });
        });

        describe('eachPair', function () {

            it('should iterate over object and pass key, pair to callback function', function () {
                var obj = {
                    twinsen: 'Protagonist',
                    funfrock: 'Bad guy',
                    zoe: 'Wife'
                },
                found = [];
                Fn.eachPair(obj, function (key, value) {
                    found.push([key, value]);
                });
                expect(found.length).toEqual(3);
                expect(found[0][0]).toEqual('twinsen');
                expect(found[0][1]).toEqual('Protagonist');
                expect(found[1][0]).toEqual('funfrock');
                expect(found[1][1]).toEqual('Bad guy');
                expect(found[2][0]).toEqual('zoe');
                expect(found[2][1]).toEqual('Wife');
            });
        });

        describe('contains', function () {

            it('should return false if the input array is undefined or null', function () {
                expect(Fn.contains(null, 'a')).toBeFalsy();
            });

            it('should return true if the array contains the element', function () {
                var arr = ['a', 'b', 'c'];
                expect(Fn.contains(arr, 'b')).toBeTruthy();
            });

            it('should return false if the array does not contain the element', function () {
                var arr = ['a', 'b', 'c'];
                expect(Fn.contains(arr, 'd')).toBeFalsy();
            });
        });

        describe('remove', function () {

            it('should remove and element from the array if it exists', function () {
                var arr = ['cat', 'fat', 'bat'],
                    removed = Fn.remove(arr, 'fat');
                expect(removed).toEqual('fat');
                expect(arr).toEqual(['cat', 'bat']);
            });

            it('should return null if the element does not exist in the array', function () {
                var arr = ['cat', 'fat', 'bat'],
                    removed = Fn.remove(arr, 'hat');
                expect(removed).toBeNull();
                expect(arr).toEqual(['cat', 'fat', 'bat']);
            });


            it('should return null if the array is null', function () {
                var removed = Fn.remove(null, 'hat');
                expect(removed).toBeNull();
            });
        });

        describe('last', function () {

            it('should return null if the input array is undefined or null', function () {
                expect(Fn.last(null)).toBeNull();
            });

            it('should return the last element', function() {
                var arr = ['a', 'b', 'c'];
                expect(Fn.last(arr)).toEqual('c');
            });
        });

        describe('until', function () {

            it('should do nothing if the input array is undefined or null', function () {
                var isCalled = false;
                Fn.until(null, function (el, i) { isCalled = true; });
                expect(isCalled).toBeFalsy();
            });

            it('should call callback function until true returned', function () {
                var arr = ['one', 'two', 'three'],
                    callTrace = '';
                Fn.until(arr, function (element) {
                    callTrace += '[' + element + ']';
                    return element === 'two';
                });
                expect(callTrace).toEqual('[one][two]');
            });

            it('should call callback function until true returned (last element to first)', function () {
                var arr = ['one', 'two', 'three'],
                    callTrace = '';
                Fn.reverseUntil(arr, function (element) {
                    callTrace += '[' + element + ']';
                    return element === 'two';
                });
                expect(callTrace).toEqual('[three][two]');
            });
        });

        describe('trim', function () {
            it('should trim whitespace from the start / end of a string', function () {
                expect(Fn.trim('    hello    ')).toEqual('hello');
                expect(Fn.trim(' abc def')).toEqual('abc def');
            });
        });

        describe('merge', function () {
            it('should merge two objects', function () {
                expect(Fn.merge({a: 1}, {b: 2})).toEqual({a: 1, b: 2});
            });

            it('should override base properties with if override has identical keys', function () {
                expect(Fn.merge({a: 1}, {a: 2})).toEqual({a: 2});
            });

            it('should return empty object if inputs are null', function () {
                expect(Fn.merge(null, null)).toEqual({});
            });
        });
    });
});