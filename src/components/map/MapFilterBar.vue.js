"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var route_store_1 = require("@/app/stores/route.store");
var routeStore = (0, route_store_1.useRouteStore)();
var filters = [
    {
        label: 'Todos',
        value: 'all',
        icon: 'travel_explore',
    },
    {
        label: 'Negocios',
        value: 'business',
        icon: 'storefront',
    },
    {
        label: 'Casas',
        value: 'house',
        icon: 'cottage',
    },
    {
        label: 'Instituciones',
        value: 'institution',
        icon: 'account_balance',
    },
    {
        label: 'Eventos',
        value: 'event',
        icon: 'festival',
    },
];
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_intrinsics;
var __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "map-filter-bar" }));
/** @type {__VLS_StyleScopedClasses['map-filter-bar']} */ ;
var _loop_1 = function (filter) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.routeStore.setCategory(filter.value);
            // @ts-ignore
            [filters, routeStore,];
        } }, { key: (filter.value) }), { class: "map-filter-bar__chip" }), { class: ({ 'map-filter-bar__chip--active': __VLS_ctx.routeStore.selectedCategory === filter.value }) }), { type: "button" }));
    /** @type {__VLS_StyleScopedClasses['map-filter-bar__chip']} */ ;
    /** @type {__VLS_StyleScopedClasses['map-filter-bar__chip--active']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "material-symbols-outlined" }));
    /** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
    (filter.icon);
    __VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({});
    (filter.label);
    // @ts-ignore
    [routeStore,];
};
for (var _i = 0, _a = __VLS_vFor((__VLS_ctx.filters)); _i < _a.length; _i++) {
    var filter = _a[_i][0];
    _loop_1(filter);
}
// @ts-ignore
[];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
