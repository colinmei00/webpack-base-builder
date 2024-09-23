const assert = require("assert");
const path = require("path");

describe("webpack.base.js test case", () => {
  const baseConfig = require("../../lib/webpack.base.js");

  it("entry", () => {
    // 使用动态路径构建期望的路径
    const expectedIndexPath = path.join(
      __dirname,
      "../smoke/template/src/index/index.js"
    );
    const expectedSearchPath = path.join(
      __dirname,
      "../smoke/template/src/search/index.js"
    );

    assert.equal(baseConfig.entry.index, expectedIndexPath);
    assert.equal(baseConfig.entry.search, expectedSearchPath);
  });
});
