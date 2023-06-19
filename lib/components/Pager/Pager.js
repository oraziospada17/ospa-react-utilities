"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pager = void 0;
var react_1 = require("react");
var Pager = function (_a) {
    var renderContainer = _a.renderContainer, pageSize = _a.pageSize, items = _a.items, renderItem = _a.renderItem;
    var _b = react_1.default.useState(0), page = _b[0], setPage = _b[1];
    var handleScroll = function (e) {
        var el = e.target;
        var scroll_limit = el.scrollHeight - document.body.clientHeight;
        if (e.target.scrollTop >= scroll_limit - 200) {
            setPage(page + 1);
        }
    };
    var _c = react_1.default.useState(items.slice(page, (page + 1) * pageSize)), visibleItems = _c[0], setVisibleItems = _c[1];
    react_1.default.useEffect(function () {
        setVisibleItems(items.slice(0, (page + 1) * pageSize));
    }, [page, items]);
    return renderContainer(visibleItems.map(function (x) { return renderItem(x); }), handleScroll);
};
exports.Pager = Pager;
