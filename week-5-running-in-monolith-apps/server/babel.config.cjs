module.exports = {
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
  parserOpts: {
    allowAwaitOutsideFunction: true,
  },
}