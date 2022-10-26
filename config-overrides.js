module.exports = function override(webpackConfig) {
  webpackConfig.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: "javascript/auto",
  });

  return webpackConfig;
};
// EcmaScript module errpr : Can't import the named export 'cloneElement'
// fix gotten from https://github.com/reactioncommerce/reaction-component-library/issues/399#issuecomment-467860022
