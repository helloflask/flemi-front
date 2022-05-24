module.exports = {
    "*.{ts,tsx}": (_) => ["eslint --cache --fix", "prettier --write"],
};
