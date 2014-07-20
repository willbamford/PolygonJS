beforeEach(function () {
    jasmine.addMatchers({
        toBeInstanceOf: function () {
            return {
                compare: function (actual, expected) {
                    return {
                        pass: (actual instanceof expected)
                    };
                }
            };
        },
        toEqualColor: function () {
            return {
                compare: function (actual, expected) {
                    return {
                        pass: (actual.equals(expected))
                    };
                }
            }
        }
    });
});