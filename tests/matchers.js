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
        },
        toEqualVector3: function () {
            return {
                compare: function (actual, expected) {
                    return {
                        pass: (actual.equals(expected))
                    }
                }
            }
        }
    });
});