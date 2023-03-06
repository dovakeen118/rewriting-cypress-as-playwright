const RosieFactory = require("rosie").Factory

class Factory {
  constructor(TargetModel) {
    this.TargetModel = TargetModel
    this.targetModelName = new TargetModel().constructor.name
  }

  async build(overrides, options) {
    return new this.TargetModel(await RosieFactory.build(this.targetModelName, overrides, options))
  }

  // constructor() {
  //   this.rosieFactory = new RosieFactory()
  // }

  // define(name, attributes) {
  //   this.rosieFactory.define(name, attributes)
  // }

  // async build(name, attributes) {
  //   return await this.rosieFactory.build(name, attributes)
  // }

  // async create(name, attributes) {
  //   return await this.rosieFactory.create(name, attributes)
  // }
}
module.exports = Factory
