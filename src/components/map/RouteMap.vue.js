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
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var maplibre_gl_1 = require("maplibre-gl");
var route_store_1 = require("@/app/stores/route.store");
var maps_service_1 = require("@/services/maps.service");
var ACANCEH_CENTER = [-89.4565, 20.814];
var ACANCEH_ZOOM = 14.2;
var POINT_SOURCE_ID = 'route-points';
var POINT_LAYER_ID = 'route-points-layer';
var POINT_HALO_LAYER_ID = 'route-points-halo-layer';
var POINT_LABEL_LAYER_ID = 'route-points-label-layer';
var routeStore = (0, route_store_1.useRouteStore)();
var emit = defineEmits();
var mapContainer = (0, vue_1.ref)(null);
var map = null;
var visiblePoints = (0, vue_1.computed)(function () { return routeStore.filteredPoints; });
var mapStyle = {
    version: 8,
    glyphs: 'https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf',
    sources: {
        osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors',
        },
    },
    layers: [
        {
            id: 'osm',
            type: 'raster',
            source: 'osm',
            paint: {
                'raster-saturation': -0.75,
                'raster-brightness-min': 0.08,
                'raster-brightness-max': 0.62,
                'raster-contrast': 0.22,
            },
        },
        {
            id: 'route-night-overlay',
            type: 'background',
            paint: {
                'background-color': 'rgba(36, 0, 55, 0.12)',
            },
        },
    ],
};
var colorByStatus = [
    'match',
    ['get', 'status'],
    'available',
    '#45dc82',
    'low',
    '#ffca3a',
    'empty',
    '#ff5d73',
    'closed',
    '#ff5d73',
    'unknown',
    '#8f77a1',
    'event_active',
    '#ff7a00',
    '#ff7a00',
];
var radiusByStatus = [
    'case',
    ['==', ['get', 'has_event'], true],
    12,
    ['==', ['get', 'status'], 'event_active'],
    12,
    9,
];
function createMap() {
    if (!mapContainer.value)
        return;
    emit('loadingChange', true);
    map = new maplibre_gl_1.default.Map({
        container: mapContainer.value,
        style: mapStyle,
        center: ACANCEH_CENTER,
        zoom: ACANCEH_ZOOM,
        minZoom: 12,
        maxZoom: 19,
        pitch: 38,
        bearing: -14,
        attributionControl: false,
    });
    map.addControl(new maplibre_gl_1.default.NavigationControl({
        visualizePitch: true,
        showCompass: true,
        showZoom: false,
    }), 'top-right');
    map.addControl(new maplibre_gl_1.default.AttributionControl({
        compact: true,
    }), 'bottom-left');
    map.on('load', function () {
        addPointLayers();
        updatePointSource();
        fitToAllPoints(false);
        emit('loadingChange', false);
        emit('mapReady');
    });
}
function addPointLayers() {
    if (!map)
        return;
    map.addSource(POINT_SOURCE_ID, {
        type: 'geojson',
        data: (0, maps_service_1.pointsToGeoJson)(visiblePoints.value),
    });
    map.addLayer({
        id: POINT_HALO_LAYER_ID,
        type: 'circle',
        source: POINT_SOURCE_ID,
        paint: {
            'circle-radius': ['+', radiusByStatus, 12],
            'circle-color': colorByStatus,
            'circle-opacity': [
                'case',
                ['==', ['get', 'has_event'], true],
                0.3,
                0.16,
            ],
            'circle-blur': 0.45,
        },
    });
    map.addLayer({
        id: POINT_LAYER_ID,
        type: 'circle',
        source: POINT_SOURCE_ID,
        paint: {
            'circle-radius': radiusByStatus,
            'circle-color': colorByStatus,
            'circle-stroke-color': '#fff3d6',
            'circle-stroke-width': [
                'case',
                ['==', ['get', 'has_event'], true],
                3,
                2,
            ],
            'circle-opacity': 0.96,
        },
    });
    map.addLayer({
        id: POINT_LABEL_LAYER_ID,
        type: 'symbol',
        source: POINT_SOURCE_ID,
        minzoom: 16,
        layout: {
            'text-field': ['get', 'name'],
            'text-size': 11,
            'text-offset': [0, 1.45],
            'text-anchor': 'top',
            'text-font': ['Noto Sans Regular'],
        },
        paint: {
            'text-color': '#fff3d6',
            'text-halo-color': '#25002f',
            'text-halo-width': 1.4,
        },
    });
    map.on('mouseenter', POINT_LAYER_ID, function () {
        if (!map)
            return;
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', POINT_LAYER_ID, function () {
        if (!map)
            return;
        map.getCanvas().style.cursor = '';
    });
    map.on('click', POINT_LAYER_ID, handlePointClick);
}
function handlePointClick(event) {
    var _a, _b;
    if (!map)
        return;
    var feature = (_a = event.features) === null || _a === void 0 ? void 0 : _a[0];
    var slug = (_b = feature === null || feature === void 0 ? void 0 : feature.properties) === null || _b === void 0 ? void 0 : _b.slug;
    if (typeof slug !== 'string')
        return;
    var point = routeStore.findPointBySlug(slug);
    if (!point)
        return;
    map.easeTo({
        center: [point.lng, point.lat],
        zoom: Math.max(map.getZoom(), 16.1),
        pitch: 45,
        bearing: map.getBearing(),
        duration: 850,
        padding: {
            top: 90,
            right: 30,
            bottom: 310,
            left: 30,
        },
    });
    emit('selectPoint', point);
}
function updatePointSource() {
    if (!map || !map.getSource(POINT_SOURCE_ID))
        return;
    var source = map.getSource(POINT_SOURCE_ID);
    source.setData((0, maps_service_1.pointsToGeoJson)(visiblePoints.value));
}
function fitToAllPoints(animated) {
    if (animated === void 0) { animated = true; }
    if (!map)
        return;
    var bounds = (0, maps_service_1.getPointBounds)(visiblePoints.value.length > 0 ? visiblePoints.value : routeStore.points);
    if (!bounds) {
        map.easeTo({
            center: ACANCEH_CENTER,
            zoom: ACANCEH_ZOOM,
            pitch: 38,
            bearing: -14,
            duration: animated ? 800 : 0,
        });
        return;
    }
    map.fitBounds(bounds, {
        padding: {
            top: 120,
            right: 48,
            bottom: 210,
            left: 48,
        },
        maxZoom: 15.4,
        duration: animated ? 950 : 0,
        pitch: 38,
        bearing: -14,
    });
}
function flyToUserApproximation() {
    if (!map)
        return;
    map.easeTo({
        center: ACANCEH_CENTER,
        zoom: ACANCEH_ZOOM,
        pitch: 38,
        bearing: -14,
        duration: 900,
    });
}
var __VLS_exposed = {
    fitToAllPoints: fitToAllPoints,
    flyToUserApproximation: flyToUserApproximation,
};
defineExpose(__VLS_exposed);
(0, vue_1.watch)(function () { return visiblePoints.value; }, function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, vue_1.nextTick)()];
            case 1:
                _a.sent();
                updatePointSource();
                return [2 /*return*/];
        }
    });
}); }, {
    deep: true,
});
(0, vue_1.watch)(function () { var _a; return (_a = routeStore.manifest) === null || _a === void 0 ? void 0 : _a.version; }, function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, vue_1.nextTick)()];
            case 1:
                _a.sent();
                updatePointSource();
                return [2 /*return*/];
        }
    });
}); });
(0, vue_1.onMounted)(function () {
    createMap();
});
(0, vue_1.onUnmounted)(function () {
    if (map) {
        map.remove();
        map = null;
    }
});
var __VLS_ctx = __assign(__assign(__assign(__assign({}, {}), {}), {}), {});
var __VLS_components;
var __VLS_intrinsics;
var __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ ref: "mapContainer" }, { class: "route-map" }));
/** @type {__VLS_StyleScopedClasses['route-map']} */ ;
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    setup: function () { return __VLS_exposed; },
    __typeEmits: {},
});
exports.default = {};
