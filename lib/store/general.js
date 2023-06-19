"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCtx = void 0;
var react_1 = require("react");
function createCtx(reducer, initialState) {
    var defaultDispatch = function () { return initialState; }; // we never actually use this
    var ctx = react_1.default.createContext({
        state: initialState,
        dispatch: defaultDispatch, // just to mock out the dispatch type and make it not optioanl
    });
    function Provider(props) {
        var _a = react_1.default.useReducer(reducer, initialState), state = _a[0], dispatch = _a[1];
        return <ctx.Provider value={{ state: state, dispatch: dispatch }} {...props}/>;
    }
    return [ctx, Provider];
}
exports.createCtx = createCtx;
