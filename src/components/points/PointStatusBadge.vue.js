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
        available: 'inventory_2',
        low: 'warning',
        empty: 'block',
        closed: 'lock',
        unknown: 'help',
        event_active: 'celebration',
    };
    return icons[props.status];
});
var __VLS_ctx = __assign(__assign(__assign(__assign({}, {}), {}), {}), {});
var __VLS_components;
var __VLS_intrinsics;
var __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "point-status" }, { class: ("point-status--".concat(__VLS_ctx.status)) }));
/** @type {__VLS_StyleScopedClasses['point-status']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "material-symbols-outlined point-status__icon" }));
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['point-status__icon']} */ ;
(__VLS_ctx.icon);
(__VLS_ctx.label);
// @ts-ignore
[status, icon, label,];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    __typeProps: {},
});
exports.default = {};
