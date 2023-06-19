"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQueryValues = void 0;
var react_1 = require("react");
var useQuery_1 = require("../hooks/useQuery");
var useQueryValues = function (props) {
    var query = (0, useQuery_1.useQuery)();
    var queryValues = react_1.default.useMemo(function () {
        return Object.fromEntries(props.queryKeys.map(function (k) { var _a; return [k, (_a = query.get(k)) !== null && _a !== void 0 ? _a : null]; }));
    }, [query]);
    var encodeValues = react_1.default.useCallback(function (url, keys, values, onlyNewValues) {
        var result = '';
        var keysToEncode = keys ? keys : Object.keys(queryValues);
        keysToEncode.forEach(function (k, index) {
            var value = values && values[k] ? values[k] : queryValues[k];
            if (onlyNewValues && values) {
                value = values[k];
            }
            if (value) {
                if (!result) {
                    result = url.endsWith('?') ? url : "".concat(url, "?");
                }
                result += "".concat(k, "=").concat(value).concat(index < keysToEncode.length - 1 ? '&' : '');
            }
        });
        if (!result) {
            return url;
        }
        return result.endsWith('&') ? result.slice(0, -1) : result;
    }, [queryValues]);
    var replaceEncodedValue = react_1.default.useCallback(function (keys, values) {
        var used_keys = [];
        var used_values = [];
        Object.entries(queryValues).forEach(function (_a) {
            var k = _a[0], v = _a[1];
            var needed_key = keys.includes(k);
            if (v || needed_key) {
                used_keys.push(k);
                used_values.push(needed_key ? values[keys.indexOf(k)] : v);
            }
        });
        return encodeValues(window.location.pathname, used_keys, Object.fromEntries(used_values.map(function (x, i) { return [used_keys[i], x]; })));
    }, [encodeValues]);
    return {
        query: query,
        queryValues: queryValues,
        encodeValues: encodeValues,
        replaceEncodedValue: replaceEncodedValue,
    };
};
exports.useQueryValues = useQueryValues;
