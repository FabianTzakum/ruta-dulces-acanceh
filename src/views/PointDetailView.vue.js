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
var vue_router_1 = require("vue-router");
var route_store_1 = require("@/app/stores/route.store");
var PointStatusBadge_vue_1 = require("@/components/points/PointStatusBadge.vue");
var route = (0, vue_router_1.useRoute)();
var routeStore = (0, route_store_1.useRouteStore)();
var point = (0, vue_1.computed)(function () {
    var slug = String(route.params.slug);
    return routeStore.findPointBySlug(slug);
});
var updatedAt = (0, vue_1.computed)(function () {
    if (!point.value)
        return '';
    return new Date(point.value.updated_at).toLocaleString('es-MX', {
        dateStyle: 'medium',
        timeStyle: 'short',
    });
});
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_intrinsics;
var __VLS_directives;
if (__VLS_ctx.point) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)(__assign({ class: "point-detail" }));
    /** @type {__VLS_StyleScopedClasses['point-detail']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "point-detail__hero" }));
    /** @type {__VLS_StyleScopedClasses['point-detail__hero']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
        src: (__VLS_ctx.point.main_image),
        alt: (__VLS_ctx.point.name),
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "point-detail__shade" }));
    /** @type {__VLS_StyleScopedClasses['point-detail__shade']} */ ;
    var __VLS_0 = void 0;
    /** @ts-ignore @type { | typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
    RouterLink;
    // @ts-ignore
    var __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0(__assign({ class: "point-detail__back" }, { to: "/puntos", 'aria-label': "Volver a puntos" })));
    var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign({ class: "point-detail__back" }, { to: "/puntos", 'aria-label': "Volver a puntos" })], __VLS_functionalComponentArgsRest(__VLS_1), false));
    /** @type {__VLS_StyleScopedClasses['point-detail__back']} */ ;
    var __VLS_5 = __VLS_3.slots.default;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "material-symbols-outlined" }));
    /** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
    // @ts-ignore
    [point, point, point,];
    var __VLS_3;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "point-detail__title" }));
    /** @type {__VLS_StyleScopedClasses['point-detail__title']} */ ;
    var __VLS_6 = PointStatusBadge_vue_1.default;
    // @ts-ignore
    var __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        status: (__VLS_ctx.point.status),
        label: (__VLS_ctx.point.status_label),
    }));
    var __VLS_8 = __VLS_7.apply(void 0, __spreadArray([{
            status: (__VLS_ctx.point.status),
            label: (__VLS_ctx.point.status_label),
        }], __VLS_functionalComponentArgsRest(__VLS_7), false));
    __VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({});
    (__VLS_ctx.point.name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.point.category_label);
    (__VLS_ctx.point.address);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "point-detail__actions" }));
    /** @type {__VLS_StyleScopedClasses['point-detail__actions']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)(__assign({ class: "point-detail__main-action" }, { href: (__VLS_ctx.point.google_maps_url), target: "_blank", rel: "noreferrer" }));
    /** @type {__VLS_StyleScopedClasses['point-detail__main-action']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "material-symbols-outlined" }));
    /** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
    var __VLS_11 = void 0;
    /** @ts-ignore @type { | typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
    RouterLink;
    // @ts-ignore
    var __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11(__assign({ class: "point-detail__secondary-action" }, { to: "/mapa" })));
    var __VLS_13 = __VLS_12.apply(void 0, __spreadArray([__assign({ class: "point-detail__secondary-action" }, { to: "/mapa" })], __VLS_functionalComponentArgsRest(__VLS_12), false));
    /** @type {__VLS_StyleScopedClasses['point-detail__secondary-action']} */ ;
    var __VLS_16 = __VLS_14.slots.default;
    // @ts-ignore
    [point, point, point, point, point, point,];
    var __VLS_14;
    __VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)(__assign({ class: "point-detail__card" }));
    /** @type {__VLS_StyleScopedClasses['point-detail__card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.point.description);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "point-detail__update" }));
    /** @type {__VLS_StyleScopedClasses['point-detail__update']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "material-symbols-outlined" }));
    /** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
    (__VLS_ctx.updatedAt);
    if (__VLS_ctx.point.gallery.length) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)(__assign({ class: "point-detail__gallery" }));
        /** @type {__VLS_StyleScopedClasses['point-detail__gallery']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "point-detail__gallery-grid" }));
        /** @type {__VLS_StyleScopedClasses['point-detail__gallery-grid']} */ ;
        for (var _i = 0, _a = __VLS_vFor((__VLS_ctx.point.gallery)); _i < _a.length; _i++) {
            var image = _a[_i][0];
            __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
                key: (image),
                src: (image),
                alt: ("Foto de ".concat(__VLS_ctx.point.name)),
                loading: "lazy",
            });
            // @ts-ignore
            [point, point, point, point, updatedAt,];
        }
    }
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)(__assign({ class: "empty-state" }));
    /** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    var __VLS_17 = void 0;
    /** @ts-ignore @type { | typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
    RouterLink;
    // @ts-ignore
    var __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
        to: "/puntos",
    }));
    var __VLS_19 = __VLS_18.apply(void 0, __spreadArray([{
            to: "/puntos",
        }], __VLS_functionalComponentArgsRest(__VLS_18), false));
    var __VLS_22 = __VLS_20.slots.default;
    // @ts-ignore
    [];
    var __VLS_20;
}
// @ts-ignore
[];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
