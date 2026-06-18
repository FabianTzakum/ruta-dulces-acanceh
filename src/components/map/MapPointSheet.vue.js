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
var PointStatusBadge_vue_1 = require("@/components/points/PointStatusBadge.vue");
var props = defineProps();
var emit = defineEmits();
var updatedAt = (0, vue_1.computed)(function () {
    if (!props.point)
        return '';
    return new Date(props.point.updated_at).toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
    });
});
var __VLS_ctx = __assign(__assign(__assign(__assign(__assign({}, {}), {}), {}), {}), {});
var __VLS_components;
var __VLS_intrinsics;
var __VLS_directives;
var __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.Transition | typeof __VLS_components.Transition} */
Transition;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    name: "sheet-slide",
}));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
        name: "sheet-slide",
    }], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_5 = __VLS_3.slots.default;
if (__VLS_ctx.point) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.aside, __VLS_intrinsics.aside)(__assign({ class: "map-sheet" }));
    /** @type {__VLS_StyleScopedClasses['map-sheet']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            if (!(__VLS_ctx.point))
                return;
            __VLS_ctx.emit('close');
            // @ts-ignore
            [point, emit,];
        } }, { class: "map-sheet__close" }), { type: "button", 'aria-label': "Cerrar punto" }));
    /** @type {__VLS_StyleScopedClasses['map-sheet__close']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "material-symbols-outlined" }));
    /** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
    var __VLS_6 = void 0;
    /** @ts-ignore @type { | typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
    RouterLink;
    // @ts-ignore
    var __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6(__assign({ class: "map-sheet__image" }, { to: ("/puntos/".concat(__VLS_ctx.point.slug)) })));
    var __VLS_8 = __VLS_7.apply(void 0, __spreadArray([__assign({ class: "map-sheet__image" }, { to: ("/puntos/".concat(__VLS_ctx.point.slug)) })], __VLS_functionalComponentArgsRest(__VLS_7), false));
    /** @type {__VLS_StyleScopedClasses['map-sheet__image']} */ ;
    var __VLS_11 = __VLS_9.slots.default;
    __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
        src: (__VLS_ctx.point.main_image),
        alt: (__VLS_ctx.point.name),
        loading: "lazy",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "map-sheet__image-shade" }));
    /** @type {__VLS_StyleScopedClasses['map-sheet__image-shade']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "map-sheet__badges" }));
    /** @type {__VLS_StyleScopedClasses['map-sheet__badges']} */ ;
    var __VLS_12 = PointStatusBadge_vue_1.default;
    // @ts-ignore
    var __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({
        status: (__VLS_ctx.point.status),
        label: (__VLS_ctx.point.status_label),
    }));
    var __VLS_14 = __VLS_13.apply(void 0, __spreadArray([{
            status: (__VLS_ctx.point.status),
            label: (__VLS_ctx.point.status_label),
        }], __VLS_functionalComponentArgsRest(__VLS_13), false));
    // @ts-ignore
    [point, point, point, point, point,];
    var __VLS_9;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "map-sheet__body" }));
    /** @type {__VLS_StyleScopedClasses['map-sheet__body']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "map-sheet__category" }));
    /** @type {__VLS_StyleScopedClasses['map-sheet__category']} */ ;
    (__VLS_ctx.point.category_label);
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
    (__VLS_ctx.point.name);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "map-sheet__description" }));
    /** @type {__VLS_StyleScopedClasses['map-sheet__description']} */ ;
    (__VLS_ctx.point.short_description);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "map-sheet__meta" }));
    /** @type {__VLS_StyleScopedClasses['map-sheet__meta']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "material-symbols-outlined" }));
    /** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.updatedAt);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "map-sheet__actions" }));
    /** @type {__VLS_StyleScopedClasses['map-sheet__actions']} */ ;
    var __VLS_17 = void 0;
    /** @ts-ignore @type { | typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
    RouterLink;
    // @ts-ignore
    var __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17(__assign({ class: "map-sheet__button map-sheet__button--ghost" }, { to: ("/puntos/".concat(__VLS_ctx.point.slug)) })));
    var __VLS_19 = __VLS_18.apply(void 0, __spreadArray([__assign({ class: "map-sheet__button map-sheet__button--ghost" }, { to: ("/puntos/".concat(__VLS_ctx.point.slug)) })], __VLS_functionalComponentArgsRest(__VLS_18), false));
    /** @type {__VLS_StyleScopedClasses['map-sheet__button']} */ ;
    /** @type {__VLS_StyleScopedClasses['map-sheet__button--ghost']} */ ;
    var __VLS_22 = __VLS_20.slots.default;
    // @ts-ignore
    [point, point, point, point, updatedAt,];
    var __VLS_20;
    __VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)(__assign({ class: "map-sheet__button" }, { href: (__VLS_ctx.point.google_maps_url), target: "_blank", rel: "noreferrer" }));
    /** @type {__VLS_StyleScopedClasses['map-sheet__button']} */ ;
}
// @ts-ignore
[point,];
var __VLS_3;
// @ts-ignore
[];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
exports.default = {};
