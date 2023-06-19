"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
// Hook
var useWindowSize = function (props) {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    var _a = (0, react_1.useState)({
        width: undefined,
        height: undefined,
        mainContentWidth: undefined,
        mainContentHeight: undefined,
        sidebarWidth: undefined,
        sidebarHeight: undefined,
        topbarWidth: undefined,
        topbarHeight: undefined,
        bottombarWidth: undefined,
        bottombarHeight: undefined,
    }), windowSize = _a[0], setWindowSize = _a[1];
    (0, react_1.useEffect)(function () {
        // Handler to call on window resize
        function handleResize() {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            // Set window width/height to state
            var mainContentRect = (_b = document.getElementById((_a = props.mainContentId) !== null && _a !== void 0 ? _a : "mainContent")) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect();
            var sidebarRect = (_d = document.getElementById((_c = props.sidebarId) !== null && _c !== void 0 ? _c : "sidebar")) === null || _d === void 0 ? void 0 : _d.getBoundingClientRect();
            var topbarRect = (_f = document.getElementById((_e = props.topbarId) !== null && _e !== void 0 ? _e : "topbar")) === null || _f === void 0 ? void 0 : _f.getBoundingClientRect();
            var bottombarRect = (_h = document.getElementById((_g = props.bottombarId) !== null && _g !== void 0 ? _g : "bottombar")) === null || _h === void 0 ? void 0 : _h.getBoundingClientRect();
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
                mainContentWidth: mainContentRect === null || mainContentRect === void 0 ? void 0 : mainContentRect.width,
                mainContentHeight: mainContentRect === null || mainContentRect === void 0 ? void 0 : mainContentRect.height,
                sidebarWidth: sidebarRect === null || sidebarRect === void 0 ? void 0 : sidebarRect.width,
                sidebarHeight: sidebarRect === null || sidebarRect === void 0 ? void 0 : sidebarRect.height,
                topbarHeight: topbarRect === null || topbarRect === void 0 ? void 0 : topbarRect.height,
                topbarWidth: topbarRect === null || topbarRect === void 0 ? void 0 : topbarRect.width,
                bottombarHeight: bottombarRect === null || bottombarRect === void 0 ? void 0 : bottombarRect.height,
                bottombarWidth: bottombarRect === null || bottombarRect === void 0 ? void 0 : bottombarRect.width,
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return function () { return window.removeEventListener("resize", handleResize); };
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
};
exports.default = useWindowSize;
