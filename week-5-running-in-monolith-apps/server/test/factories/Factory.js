import { Factory as RosieFactory } from "rosie"

export default class Factory {
  constructor(TargetModel) {
    this.TargetModel = TargetModel
    this.targetModelName = new TargetModel().constructor.name
  }

  getJSON(overrides, options) {
    return RosieFactory.attributes(this.targetModelName, overrides, options)
  }

  async build(overrides, options) {
    return new this.TargetModel(await RosieFactory.build(this.targetModelName, overrides, options))
  }

  async create(overrides, options) {
    const instance = await this.build(overrides, options)
    return this.TargetModel.query().insertGraphAndFetch(instance, {
      relate: true,
    })
  }

  /**
   * Create many instances
   *
   * @param {Number} number - desired number of objects
   * @param {(Array|Object)} overrides - obj if applied to all instances and array otherwise
   * @param {Object} options - Rosie factory options
   * @return {Array} instances - persisted objects
   * @memberof Factory
   */
  async createMany(number, overrides, options) {
    const instances = [...Array(number)].map(async (num, index) => {
      if (Array.isArray(overrides)) {
        return this.build(overrides[index], options)
      }
      return this.build(overrides, options)
    })

    const resolvedInstances = await Promise.all(instances)

    return this.TargetModel.query().insertGraphAndFetch(resolvedInstances, {
      relate: true,
    })
  }
}