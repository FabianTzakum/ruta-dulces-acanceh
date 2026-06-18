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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var route_store_1 = require("@/app/stores/route.store");
var LoadingRoute_vue_1 = require("@/components/common/LoadingRoute.vue");
var routeStore = (0, route_store_1.useRouteStore)();
var heroStats = (0, vue_1.computed)(function () { return [
    {
        label: 'Puntos',
        value: routeStore.stats.total,
        icon: 'location_on',
    },
    {
        label: 'Disponibles',
        value: routeStore.stats.available,
        icon: 'inventory_2',
    },
    {
        label: 'Eventos',
        value: routeStore.stats.events,
        icon: 'celebration',
    },
]; });
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_intrinsics;
var __VLS_directives;
if (__VLS_ctx.routeStore.isLoading) {
    var __VLS_0 = LoadingRoute_vue_1.default;
    // @ts-ignore
    var __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
    var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_1), false));
    var __VLS_5;
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)(__assign({ class: "home-view" }));
    /** @type {__VLS_StyleScopedClasses['home-view']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "home-view__hero" }));
    /** @type {__VLS_StyleScopedClasses['home-view__hero']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "home-view__sky" }));
    /** @type {__VLS_StyleScopedClasses['home-view__sky']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "home-view__bat home-view__bat--one" }));
    /** @type {__VLS_StyleScopedClasses['home-view__bat']} */ ;
    /** @type {__VLS_StyleScopedClasses['home-view__bat--one']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "home-view__bat home-view__bat--two" }));
    /** @type {__VLS_StyleScopedClasses['home-view__bat']} */ ;
    /** @type {__VLS_StyleScopedClasses['home-view__bat--two']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "home-view__ghost" }));
    /** @type {__VLS_StyleScopedClasses['home-view__ghost']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "home-view__pumpkin" }));
    /** @type {__VLS_StyleScopedClasses['home-view__pumpkin']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "home-view__content" }));
    /** @type {__VLS_StyleScopedClasses['home-view__content']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "home-view__edition" }));
    /** @type {__VLS_StyleScopedClasses['home-view__edition']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "home-view__actions" }));
    /** @type {__VLS_StyleScopedClasses['home-view__actions']} */ ;
    var __VLS_6 = void 0;
    /** @ts-ignore @type { | typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
    RouterLink;
    // @ts-ignore
    var __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6(__assign({ class: "home-view__primary" }, { to: "/mapa" })));
    var __VLS_8 = __VLS_7.apply(void 0, __spreadArray([__assign({ class: "home-view__primary" }, { to: "/mapa" })], __VLS_functionalComponentArgsRest(__VLS_7), false));
    /** @type {__VLS_StyleScopedClasses['home-view__primary']} */ ;
    var __VLS_11 = __VLS_9.slots.default;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "material-symbols-outlined" }));
    /** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
    // @ts-ignore
    [routeStore,];
    var __VLS_9;
    var __VLS_12 = void 0;
    /** @ts-ignore @type { | typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
    RouterLink;
    // @ts-ignore
    var __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12(__assign({ class: "home-view__secondary" }, { to: "/puntos" })));
    var __VLS_14 = __VLS_13.apply(void 0, __spreadArray([__assign({ class: "home-view__secondary" }, { to: "/puntos" })], __VLS_functionalComponentArgsRest(__VLS_13), false));
    /** @type {__VLS_StyleScopedClasses['home-view__secondary']} */ ;
    var __VLS_17 = __VLS_15.slots.default;
    // @ts-ignore
    [];
    var __VLS_15;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "home-view__stats" }));
    /** @type {__VLS_StyleScopedClasses['home-view__stats']} */ ;
    for (var _i = 0, _a = __VLS_vFor((__VLS_ctx.heroStats)); _i < _a.length; _i++) {
        var stat = _a[_i][0];
        __VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)(__assign({ key: (stat.label) }, { class: "home-view__stat" }));
        /** @type {__VLS_StyleScopedClasses['home-view__stat']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "material-symbols-outlined" }));
        /** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
        (stat.icon);
        __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
        (stat.value);
        __VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({});
        (stat.label);
        // @ts-ignore
        [heroStats,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)(__assign({ class: "home-view__panel" }));
    /** @type {__VLS_StyleScopedClasses['home-view__panel']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
}
// @ts-ignore
[];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
