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
var route_store_1 = require("@/app/stores/route.store");
var GalleryCard_vue_1 = require("@/components/gallery/GalleryCard.vue");
var routeStore = (0, route_store_1.useRouteStore)();
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_intrinsics;
var __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)(__assign({ class: "gallery-view" }));
/** @type {__VLS_StyleScopedClasses['gallery-view']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "view-heading" }));
/** @type {__VLS_StyleScopedClasses['view-heading']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "gallery-view__intro" }));
/** @type {__VLS_StyleScopedClasses['gallery-view__intro']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "gallery-view__grid" }));
/** @type {__VLS_StyleScopedClasses['gallery-view__grid']} */ ;
for (var _i = 0, _a = __VLS_vFor((__VLS_ctx.routeStore.gallery)); _i < _a.length; _i++) {
    var item = _a[_i][0];
    var __VLS_0 = GalleryCard_vue_1.default;
    // @ts-ignore
    var __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        key: (item.id),
        item: (item),
    }));
    var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
            key: (item.id),
            item: (item),
        }], __VLS_functionalComponentArgsRest(__VLS_1), false));
    // @ts-ignore
    [routeStore,];
}
// @ts-ignore
[];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
