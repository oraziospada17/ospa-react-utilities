"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQuery = void 0;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
function useQuery() {
    var search = (0, react_router_dom_1.useLocation)().search;
    return react_1.default.useMemo(function () { return new URLSearchParams(search); }, [search]);
}
exports.useQuery = useQuery;
