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
var routeStore = (0, route_store_1.useRouteStore)();
var subtitle = (0, vue_1.computed)(function () {
    if (!routeStore.manifest)
        return 'Cargando ruta comunitaria...';
    return "Actualizado ".concat(new Date(routeStore.manifest.updated_at).toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
    }));
});
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_intrinsics;
var __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)(__assign({ class: "mobile-topbar" }));
/** @type {__VLS_StyleScopedClasses['mobile-topbar']} */ ;
var __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
RouterLink;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0(__assign({ class: "mobile-topbar__brand" }, { to: "/inicio", 'aria-label': "Ir al inicio" })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign({ class: "mobile-topbar__brand" }, { to: "/inicio", 'aria-label': "Ir al inicio" })], __VLS_functionalComponentArgsRest(__VLS_1), false));
/** @type {__VLS_StyleScopedClasses['mobile-topbar__brand']} */ ;
var __VLS_5 = __VLS_3.slots.default;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "mobile-topbar__mark" }));
/** @type {__VLS_StyleScopedClasses['mobile-topbar__mark']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({});
var __VLS_3;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign({ onClick: (__VLS_ctx.routeStore.refreshIfNeeded) }, { class: "mobile-topbar__status" }), { type: "button" }));
/** @type {__VLS_StyleScopedClasses['mobile-topbar__status']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "mobile-topbar__dot" }, { class: ({ 'mobile-topbar__dot--loading': __VLS_ctx.routeStore.isRefreshing }) }));
/** @type {__VLS_StyleScopedClasses['mobile-topbar__dot']} */ ;
/** @type {__VLS_StyleScopedClasses['mobile-topbar__dot--loading']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
(__VLS_ctx.subtitle);
// @ts-ignore
[routeStore, routeStore, subtitle,];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
