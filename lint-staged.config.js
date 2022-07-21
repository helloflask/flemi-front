module.exports = {
    "*.{ts,tsx}": (_) => ["eslint --cache --fix src", "prettier --write src"],
};
