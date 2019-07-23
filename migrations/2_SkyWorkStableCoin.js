const SkyWorkStableCoin = artifacts.require("SkyWorkStableCoin");

module.exports = function(deployer) {
  deployer.deploy(SkyWorkStableCoin,"SkyWork Stable Coin", "SGDX", 18);

};
