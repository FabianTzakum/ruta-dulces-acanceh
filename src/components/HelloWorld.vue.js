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
var vite_svg_1 = require("../assets/vite.svg");
var hero_png_1 = require("../assets/hero.png");
var vue_svg_1 = require("../assets/vue.svg");
var count = (0, vue_1.ref)(0);
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_intrinsics;
var __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    id: "center",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "hero" }));
/** @type {__VLS_StyleScopedClasses['hero']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.img)(__assign(__assign({ src: (__VLS_ctx.heroImg) }, { class: "base" }), { width: "170", height: "179", alt: "" }));
/** @type {__VLS_StyleScopedClasses['base']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.img)(__assign(__assign({ src: (__VLS_ctx.vueLogo) }, { class: "framework" }), { alt: "Vue logo" }));
/** @type {__VLS_StyleScopedClasses['framework']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.img)(__assign(__assign({ src: (__VLS_ctx.viteLogo) }, { class: "vite" }), { alt: "Vite logo" }));
/** @type {__VLS_StyleScopedClasses['vite']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.code, __VLS_intrinsics.code)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.code, __VLS_intrinsics.code)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign({ onClick: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.count++;
        // @ts-ignore
        [hero_png_1.default, vue_svg_1.default, vite_svg_1.default, count,];
    } }, { type: "button" }), { class: "counter" }));
/** @type {__VLS_StyleScopedClasses['counter']} */ ;
(__VLS_ctx.count);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ticks" }));
/** @type {__VLS_StyleScopedClasses['ticks']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    id: "next-steps",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    id: "docs",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)(__assign({ class: "icon" }, { role: "presentation", 'aria-hidden': "true" }));
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.use, __VLS_intrinsics.use)({
    href: "/icons.svg#documentation-icon",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "https://vite.dev/",
    target: "_blank",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.img)(__assign({ class: "logo" }, { src: (__VLS_ctx.viteLogo), alt: "" }));
/** @type {__VLS_StyleScopedClasses['logo']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "https://vuejs.org/",
    target: "_blank",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.img)(__assign({ class: "button-icon" }, { src: (__VLS_ctx.vueLogo), alt: "" }));
/** @type {__VLS_StyleScopedClasses['button-icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    id: "social",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)(__assign({ class: "icon" }, { role: "presentation", 'aria-hidden': "true" }));
/** @type {__VLS_StyleScopedClasses['icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.use, __VLS_intrinsics.use)({
    href: "/icons.svg#social-icon",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "https://github.com/vitejs/vite",
    target: "_blank",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)(__assign({ class: "button-icon" }, { role: "presentation", 'aria-hidden': "true" }));
/** @type {__VLS_StyleScopedClasses['button-icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.use, __VLS_intrinsics.use)({
    href: "/icons.svg#github-icon",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "https://chat.vite.dev/",
    target: "_blank",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)(__assign({ class: "button-icon" }, { role: "presentation", 'aria-hidden': "true" }));
/** @type {__VLS_StyleScopedClasses['button-icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.use, __VLS_intrinsics.use)({
    href: "/icons.svg#discord-icon",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "https://x.com/vite_js",
    target: "_blank",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)(__assign({ class: "button-icon" }, { role: "presentation", 'aria-hidden': "true" }));
/** @type {__VLS_StyleScopedClasses['button-icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.use, __VLS_intrinsics.use)({
    href: "/icons.svg#x-icon",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.a, __VLS_intrinsics.a)({
    href: "https://bsky.app/profile/vite.dev",
    target: "_blank",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)(__assign({ class: "button-icon" }, { role: "presentation", 'aria-hidden': "true" }));
/** @type {__VLS_StyleScopedClasses['button-icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.use, __VLS_intrinsics.use)({
    href: "/icons.svg#bluesky-icon",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "ticks" }));
/** @type {__VLS_StyleScopedClasses['ticks']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    id: "spacer",
});
// @ts-ignore
[vue_svg_1.default, vite_svg_1.default, count,];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
