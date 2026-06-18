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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var MapFilterBar_vue_1 = require("@/components/map/MapFilterBar.vue");
var MapLegend_vue_1 = require("@/components/map/MapLegend.vue");
var MapLoading_vue_1 = require("@/components/map/MapLoading.vue");
var MapPointSheet_vue_1 = require("@/components/map/MapPointSheet.vue");
var MapStatusBanner_vue_1 = require("@/components/map/MapStatusBanner.vue");
var RouteMap_vue_1 = require("@/components/map/RouteMap.vue");
var routeStore = (0, route_store_1.useRouteStore)();
var selectedPoint = (0, vue_1.ref)(null);
var isMapLoading = (0, vue_1.ref)(true);
var routeMap = (0, vue_1.ref)(null);
var intervalId = null;
function selectPoint(point) {
    selectedPoint.value = point;
}
function closePoint() {
    selectedPoint.value = null;
}
function recenterMap() {
    var _a;
    selectedPoint.value = null;
    (_a = routeMap.value) === null || _a === void 0 ? void 0 : _a.fitToAllPoints();
}
function forceRefresh() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, routeStore.refreshIfNeeded()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
(0, vue_1.onMounted)(function () {
    intervalId = window.setInterval(function () {
        void routeStore.refreshIfNeeded();
    }, 60000);
});
(0, vue_1.onUnmounted)(function () {
    if (intervalId) {
        window.clearInterval(intervalId);
    }
});
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_intrinsics;
var __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)(__assign({ class: "map-view" }));
/** @type {__VLS_StyleScopedClasses['map-view']} */ ;
var __VLS_0 = RouteMap_vue_1.default;
// @ts-ignore
var __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0(__assign(__assign({ 'onSelectPoint': {} }, { 'onLoadingChange': {} }), { ref: "routeMap" })));
var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign(__assign({ 'onSelectPoint': {} }, { 'onLoadingChange': {} }), { ref: "routeMap" })], __VLS_functionalComponentArgsRest(__VLS_1), false));
var __VLS_5;
var __VLS_6 = {
    /** @type {typeof __VLS_5.selectPoint} */
    onSelectPoint: (__VLS_ctx.selectPoint),
};
var __VLS_7 = {
    /** @type {typeof __VLS_5.loadingChange} */
    onLoadingChange: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.isMapLoading = $event;
        // @ts-ignore
        [selectPoint, isMapLoading,];
    },
};
var __VLS_8;
var __VLS_3;
var __VLS_4;
if (__VLS_ctx.isMapLoading || __VLS_ctx.routeStore.isLoading) {
    var __VLS_10 = MapLoading_vue_1.default;
    // @ts-ignore
    var __VLS_11 = __VLS_asFunctionalComponent1(__VLS_10, new __VLS_10({}));
    var __VLS_12 = __VLS_11.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_11), false));
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "map-view__top" }));
/** @type {__VLS_StyleScopedClasses['map-view__top']} */ ;
var __VLS_15 = MapStatusBanner_vue_1.default;
// @ts-ignore
var __VLS_16 = __VLS_asFunctionalComponent1(__VLS_15, new __VLS_15({}));
var __VLS_17 = __VLS_16.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_16), false));
var __VLS_20 = MapFilterBar_vue_1.default;
// @ts-ignore
var __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({}));
var __VLS_22 = __VLS_21.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_21), false));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "map-view__controls" }));
/** @type {__VLS_StyleScopedClasses['map-view__controls']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign(__assign({ onClick: (__VLS_ctx.recenterMap) }, { type: "button" }), { class: "map-control-button" }), { 'aria-label': "Recentrar mapa" }));
/** @type {__VLS_StyleScopedClasses['map-control-button']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "material-symbols-outlined" }));
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign(__assign(__assign({ onClick: (__VLS_ctx.forceRefresh) }, { type: "button" }), { class: "map-control-button" }), { 'aria-label': "Actualizar datos" }));
/** @type {__VLS_StyleScopedClasses['map-control-button']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "material-symbols-outlined" }, { class: ({ 'map-control-button__spin': __VLS_ctx.routeStore.isRefreshing }) }));
/** @type {__VLS_StyleScopedClasses['material-symbols-outlined']} */ ;
/** @type {__VLS_StyleScopedClasses['map-control-button__spin']} */ ;
var __VLS_25 = MapLegend_vue_1.default;
// @ts-ignore
var __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({}));
var __VLS_27 = __VLS_26.apply(void 0, __spreadArray([{}], __VLS_functionalComponentArgsRest(__VLS_26), false));
var __VLS_30 = MapPointSheet_vue_1.default;
// @ts-ignore
var __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30(__assign({ 'onClose': {} }, { point: (__VLS_ctx.selectedPoint) })));
var __VLS_32 = __VLS_31.apply(void 0, __spreadArray([__assign({ 'onClose': {} }, { point: (__VLS_ctx.selectedPoint) })], __VLS_functionalComponentArgsRest(__VLS_31), false));
var __VLS_35;
var __VLS_36 = {
    /** @type {typeof __VLS_35.close} */
    onClose: (__VLS_ctx.closePoint),
};
var __VLS_33;
var __VLS_34;
// @ts-ignore
var __VLS_9 = __VLS_8;
// @ts-ignore
[isMapLoading, routeStore, routeStore, recenterMap, forceRefresh, selectedPoint, closePoint,];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
