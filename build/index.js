'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Box", {
  enumerable: true,
  get: function get() {
    return _box["default"];
  }
});
Object.defineProperty(exports, "BoxOrigin", {
  enumerable: true,
  get: function get() {
    return _box.BoxOrigin;
  }
});
Object.defineProperty(exports, "Circle", {
  enumerable: true,
  get: function get() {
    return _circle["default"];
  }
});
Object.defineProperty(exports, "Vector", {
  enumerable: true,
  get: function get() {
    return _vector["default"];
  }
});
Object.defineProperty(exports, "Polygon", {
  enumerable: true,
  get: function get() {
    return _polygon["default"];
  }
});
Object.defineProperty(exports, "Collider2d", {
  enumerable: true,
  get: function get() {
    return _collider2d["default"];
  }
});

var _box = _interopRequireWildcard(require("./geometry/box"));

var _circle = _interopRequireDefault(require("./geometry/circle"));

var _vector = _interopRequireDefault(require("./geometry/vector"));

var _polygon = _interopRequireDefault(require("./geometry/polygon"));

var _collider2d = _interopRequireDefault(require("./collider2d"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQSIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IEJveCBmcm9tICcuL2dlb21ldHJ5L2JveCc7XHJcbmltcG9ydCBDaXJjbGUgZnJvbSAnLi9nZW9tZXRyeS9jaXJjbGUnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4vZ2VvbWV0cnkvdmVjdG9yJztcclxuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi9nZW9tZXRyeS9wb2x5Z29uJztcclxuXHJcbmltcG9ydCBDb2xsaWRlcjJkIGZyb20gJy4vY29sbGlkZXIyZCc7XHJcblxyXG5leHBvcnQge0JveE9yaWdpbn0gZnJvbSAnLi9nZW9tZXRyeS9ib3gnO1xyXG5cclxuZXhwb3J0IHtcclxuICBCb3gsXHJcbiAgQ2lyY2xlLFxyXG4gIFZlY3RvcixcclxuICBQb2x5Z29uLFxyXG4gIENvbGxpZGVyMmRcclxufSJdfQ==