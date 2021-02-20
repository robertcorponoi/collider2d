## 1.1.1 / 2021-02-20
- [MISC] Updated dependencies to their latest versions.

## 1.1.0 / 2020-09-30
- [FEATURE] Added `genericPoints` Array to Polygon which is an Array of all of the points in the Polygon as just numbers instead of Vectors. This is useful for creating triangles from Polygons.

## 1.0.1 / 2020-09-29
- [HOTFIX] Fixed the location of the typings.

## 1.0.0 / 2020-09-28
- [FEATURE] Made the Vector, Box, Circle, and Polygon classes into their own individual exports instead of having to be created through the Collider2d class.
- [FEATURE] Removed the reference to Box in Polygon to clear up a circular dependency.
- [DOCS] Updated documentation to reflect new API.
- [TEST] Updated tests to match new API.
- [MISC] Removed unnecessary types.
- [MISC] Started renaming filse to use underscores to follow JavaScript guidelines.
- [MISC] Updated dev-dependencies to their latest versions and fixed all security vulnerabilities.
- [MISC] Updated npm scripts to remove existing files before building/bundling to avoid issues with old code.
- [MISC] Renamed lib directory to build to be consistent with other projects.

## 0.2.1 / 2020-04-16
- [MISC] Updated out-of-date dependencies to their latest versions which also fixed all possible fixed security vulnerabilities.

## 0.2.0 / 2020-02-18
- [FEATURE] Added `translate` to circle to easily modify the position like the polygon version.
- [TEST] Added testing for circle and polygon translations.

## 0.1.1 / 2020-02-18
- [MISC] Replaced rollup-plugin-commonjs and rollup-plugin-node-resolve with @rollup/plugin-commonjs and @rollup/plugin-node-resolve.
- [MISC] Updated dependencies to their latest versions.
- [MISC] Changed CHANGELOG format.

## 0.1.0 / 2020-01-16
- Initial commit