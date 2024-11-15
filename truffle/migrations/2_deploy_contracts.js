const CarbonFootprint = artifacts.require("CarbonFootprint");

module.exports = function (deployer) {
  deployer.deploy(CarbonFootprint);
};