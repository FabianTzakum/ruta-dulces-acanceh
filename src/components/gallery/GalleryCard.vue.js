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
var __VLS_props = defineProps();
var __VLS_ctx = __assign(__assign(__assign({}, {}), {}), {});
var __VLS_components;
var __VLS_intrinsics;
var __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)(__assign({ class: "gallery-card" }));
/** @type {__VLS_StyleScopedClasses['gallery-card']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.img)({
    src: (__VLS_ctx.item.image_url),
    alt: (__VLS_ctx.item.caption),
    loading: "lazy",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "gallery-card__body" }));
/** @type {__VLS_StyleScopedClasses['gallery-card__body']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "gallery-card__author" }));
/** @type {__VLS_StyleScopedClasses['gallery-card__author']} */ ;
(__VLS_ctx.item.author);
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "gallery-card__caption" }));
/** @type {__VLS_StyleScopedClasses['gallery-card__caption']} */ ;
(__VLS_ctx.item.caption);
// @ts-ignore
[item, item, item, item,];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    __typeProps: {},
});
exports.default = {};
