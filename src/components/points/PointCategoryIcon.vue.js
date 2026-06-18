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
var vue_1 = require("vue");
var props = defineProps();
var icon = (0, vue_1.computed)(function () {
    var icons = {
        business: 'storefront',
        house: 'cottage',
        institution: 'account_balance',
        event: 'festival',
    };
    return icons[props.category];
});
var __VLS_ctx = __assign(__assign(__assign(__assign({}, {}), {}), {}), {});
var __VLS_components;
var __VLS_intrinsics;
var __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "point-category" }, { class: ("point-category--".concat(__VLS_ctx.category)) }));
/** @type {__VLS_StyleScopedClasses['point-category']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "material-symbols-outlined" }));
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
(__VLS_ctx.icon);
// @ts-ignore
[category, icon,];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    __typeProps: {},
});
exports.default = {};
