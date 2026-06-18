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
var items = [
    {
        to: '/inicio',
        label: 'Inicio',
        icon: 'home',
    },
    {
        to: '/mapa',
        label: 'Mapa',
        icon: 'map',
    },
    {
        to: '/puntos',
        label: 'Puntos',
        icon: 'storefront',
    },
    {
        to: '/galeria',
        label: 'Galería',
        icon: 'photo_camera',
    },
];
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_intrinsics;
var __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)(__assign({ class: "mobile-nav" }, { 'aria-label': "Navegación principal" }));
/** @type {__VLS_StyleScopedClasses['mobile-nav']} */ ;
for (var _i = 0, _a = __VLS_vFor((__VLS_ctx.items)); _i < _a.length; _i++) {
    var item = _a[_i][0];
    var __VLS_0 = void 0;
    /** @ts-ignore @type { | typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
    RouterLink;
    // @ts-ignore
    var __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0(__assign(__assign({ key: (item.to) }, { class: "mobile-nav__item" }), { to: (item.to) })));
    var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign(__assign({ key: (item.to) }, { class: "mobile-nav__item" }), { to: (item.to) })], __VLS_functionalComponentArgsRest(__VLS_1), false));
    /** @type {__VLS_StyleScopedClasses['mobile-nav__item']} */ ;
    var __VLS_5 = __VLS_3.slots.default;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "material-symbols-outlined mobile-nav__icon" }));
    /** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
    /** @type {__VLS_StyleScopedClasses['mobile-nav__icon']} */ ;
    (item.icon);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (item.label);
    // @ts-ignore
    [items,];
    var __VLS_3;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
