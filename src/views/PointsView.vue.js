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
var PointCard_vue_1 = require("@/components/points/PointCard.vue");
var routeStore = (0, route_store_1.useRouteStore)();
var categories = [
    { label: 'Todos', value: 'all' },
    { label: 'Negocios', value: 'business' },
    { label: 'Casas', value: 'house' },
    { label: 'Instituciones', value: 'institution' },
    { label: 'Eventos', value: 'event' },
];
var statuses = [
    { label: 'Todos', value: 'all' },
    { label: 'Disponible', value: 'available' },
    { label: 'Pocos', value: 'low' },
    { label: 'Agotado', value: 'empty' },
    { label: 'Sin actualizar', value: 'unknown' },
];
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_intrinsics;
var __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)(__assign({ class: "points-view" }));
/** @type {__VLS_StyleScopedClasses['points-view']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "view-heading" }));
/** @type {__VLS_StyleScopedClasses['view-heading']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "points-view__search" }));
/** @type {__VLS_StyleScopedClasses['points-view__search']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "material-symbols-outlined" }));
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)(__assign({ onInput: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.routeStore.setSearchTerm($event.target.value);
        // @ts-ignore
        [routeStore,];
    } }, { value: (__VLS_ctx.routeStore.searchTerm), type: "search", placeholder: "Buscar negocio, casa o institución..." }));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "filter-row" }, { 'aria-label': "Filtrar por categoría" }));
/** @type {__VLS_StyleScopedClasses['filter-row']} */ ;
var _loop_1 = function (category) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.routeStore.setCategory(category.value);
            // @ts-ignore
            [routeStore, routeStore, categories,];
        } }, { key: (category.value) }), { class: "filter-chip" }), { class: ({ 'filter-chip--active': __VLS_ctx.routeStore.selectedCategory === category.value }) }), { type: "button" }));
    /** @type {__VLS_StyleScopedClasses['filter-chip']} */ ;
    /** @type {__VLS_StyleScopedClasses['filter-chip--active']} */ ;
    (category.label);
    // @ts-ignore
    [routeStore,];
};
for (var _i = 0, _a = __VLS_vFor((__VLS_ctx.categories)); _i < _a.length; _i++) {
    var category = _a[_i][0];
    _loop_1(category);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "filter-row" }, { 'aria-label': "Filtrar por estado" }));
/** @type {__VLS_StyleScopedClasses['filter-row']} */ ;
var _loop_2 = function (status_1) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign(__assign(__assign({ onClick: function () {
            var _a = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _a[_i] = arguments[_i];
            }
            var $event = _a[0];
            __VLS_ctx.routeStore.setStatus(status_1.value);
            // @ts-ignore
            [routeStore, statuses,];
        } }, { key: (status_1.value) }), { class: "filter-chip filter-chip--soft" }), { class: ({ 'filter-chip--active': __VLS_ctx.routeStore.selectedStatus === status_1.value }) }), { type: "button" }));
    /** @type {__VLS_StyleScopedClasses['filter-chip']} */ ;
    /** @type {__VLS_StyleScopedClasses['filter-chip--soft']} */ ;
    /** @type {__VLS_StyleScopedClasses['filter-chip--active']} */ ;
    (status_1.label);
    // @ts-ignore
    [routeStore,];
};
for (var _b = 0, _c = __VLS_vFor((__VLS_ctx.statuses)); _b < _c.length; _b++) {
    var status_1 = _c[_b][0];
    _loop_2(status_1);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "points-view__summary" }));
/** @type {__VLS_StyleScopedClasses['points-view__summary']} */ ;
(__VLS_ctx.routeStore.filteredPoints.length);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "points-view__list" }));
/** @type {__VLS_StyleScopedClasses['points-view__list']} */ ;
for (var _d = 0, _e = __VLS_vFor((__VLS_ctx.routeStore.filteredPoints)); _d < _e.length; _d++) {
    var point = _e[_d][0];
    var __VLS_0 = PointCard_vue_1.default;
    // @ts-ignore
    var __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        key: (point.id),
        point: (point),
    }));
    var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
            key: (point.id),
            point: (point),
        }], __VLS_functionalComponentArgsRest(__VLS_1), false));
    // @ts-ignore
    [routeStore, routeStore,];
}
// @ts-ignore
[];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
