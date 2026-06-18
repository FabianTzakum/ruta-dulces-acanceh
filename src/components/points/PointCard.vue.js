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
var PointCategoryIcon_vue_1 = require("@/components/points/PointCategoryIcon.vue");
var PointStatusBadge_vue_1 = require("@/components/points/PointStatusBadge.vue");
var __VLS_props = defineProps();
var __VLS_ctx = __assign(__assign(__assign({}, {}), {}), {});
var __VLS_components;
var __VLS_intrinsics;
var __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)(__assign({ class: "point-card" }));
/** @type {__VLS_StyleScopedClasses['point-card']} */ ;
var __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
RouterLink;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0(__assign({ class: "point-card__media" }, { to: ("/puntos/".concat(__VLS_ctx.point.slug)) })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign({ class: "point-card__media" }, { to: ("/puntos/".concat(__VLS_ctx.point.slug)) })], __VLS_functionalComponentArgsRest(__VLS_1), false));
/** @type {__VLS_StyleScopedClasses['point-card__media']} */ ;
var __VLS_5 = __VLS_3.slots.default;
__VLS_asFunctionalElement1(__VLS_intrinsics.img)({
    src: (__VLS_ctx.point.main_image),
    alt: (__VLS_ctx.point.name),
    loading: "lazy",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "point-card__shade" }));
/** @type {__VLS_StyleScopedClasses['point-card__shade']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "point-card__top" }));
/** @type {__VLS_StyleScopedClasses['point-card__top']} */ ;
var __VLS_6 = PointCategoryIcon_vue_1.default;
// @ts-ignore
var __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
    category: (__VLS_ctx.point.category),
}));
var __VLS_8 = __VLS_7.apply(void 0, __spreadArray([{
        category: (__VLS_ctx.point.category),
    }], __VLS_functionalComponentArgsRest(__VLS_7), false));
var __VLS_11 = PointStatusBadge_vue_1.default;
// @ts-ignore
var __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
    status: (__VLS_ctx.point.status),
    label: (__VLS_ctx.point.status_label),
}));
var __VLS_13 = __VLS_12.apply(void 0, __spreadArray([{
        status: (__VLS_ctx.point.status),
        label: (__VLS_ctx.point.status_label),
    }], __VLS_functionalComponentArgsRest(__VLS_12), false));
// @ts-ignore
[point, point, point, point, point, point,];
var __VLS_3;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "point-card__body" }));
/** @type {__VLS_StyleScopedClasses['point-card__body']} */ ;
var __VLS_16;
/** @ts-ignore @type { | typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
RouterLink;
// @ts-ignore
var __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16(__assign({ class: "point-card__title" }, { to: ("/puntos/".concat(__VLS_ctx.point.slug)) })));
var __VLS_18 = __VLS_17.apply(void 0, __spreadArray([__assign({ class: "point-card__title" }, { to: ("/puntos/".concat(__VLS_ctx.point.slug)) })], __VLS_functionalComponentArgsRest(__VLS_17), false));
/** @type {__VLS_StyleScopedClasses['point-card__title']} */ ;
var __VLS_21 = __VLS_19.slots.default;
(__VLS_ctx.point.name);
// @ts-ignore
[point, point,];
var __VLS_19;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "point-card__description" }));
/** @type {__VLS_StyleScopedClasses['point-card__description']} */ ;
(__VLS_ctx.point.short_description);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "point-card__meta" }));
/** @type {__VLS_StyleScopedClasses['point-card__meta']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "material-symbols-outlined" }));
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.point.category_label);
(__VLS_ctx.point.address);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "point-card__actions" }));
/** @type {__VLS_StyleScopedClasses['point-card__actions']} */ ;
var __VLS_22;
/** @ts-ignore @type { | typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
RouterLink;
// @ts-ignore
var __VLS_23 = __VLS_asFunctionalComponent1(__VLS_22, new __VLS_22(__assign({ class: "point-card__button point-card__button--ghost" }, { to: ("/puntos/".concat(__VLS_ctx.point.slug)) })));
var __VLS_24 = __VLS_23.apply(void 0, __spreadArray([__assign({ class: "point-card__button point-card__button--ghost" }, { to: ("/puntos/".concat(__VLS_ctx.point.slug)) })], __VLS_functionalComponentArgsRest(__VLS_23), false));
/** @type {__VLS_StyleScopedClasses['point-card__button']} */ ;
/** @type {__VLS_StyleScopedClasses['point-card__button--ghost']} */ ;
var __VLS_27 = __VLS_25.slots.default;
// @ts-ignore
[point, point, point, point,];
var __VLS_25;
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)(__assign({ class: "point-card__button" }, { href: (__VLS_ctx.point.google_maps_url), target: "_blank", rel: "noreferrer" }));
/** @type {__VLS_StyleScopedClasses['point-card__button']} */ ;
// @ts-ignore
[point,];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    __typeProps: {},
});
exports.default = {};
