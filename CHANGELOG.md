# 1.1.0 Query Major

- Addressed an issue where `.querySelectorAll` would return elements incorrectly when passing a context root
- Fixed a bug where contextual queries without a prefix, such as `sektor('> foo', div)` would fail
- When providing an invalid selector, queries silently fail instead of throwing DOM errors

# 1.0.1 Minority Rapport

- Fixed a bug in `.matchesSelector` code path

# 1.0.0 IPO

- Initial Public Release
