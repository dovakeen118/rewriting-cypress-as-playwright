// eslint-disable-next-line import/no-extraneous-dependencies
const ObjectionModel = require("objection").Model;

/**
 * Abstract model for Transporter ORM
 * Hackery in this directory is due to VSCode not recognizing
 * or following CJS files. Changing them back to .js extensions makes
 * working with Object a lot easier (we get intellisense for Objection)
 *
 * @class Model
 */
class Model extends ObjectionModel {
  constructor(attributes = {}) {
    super()
    if (attributes !== {}) {
      this.$set(attributes)
    }
  }
  // https://github.com/rosiejs/rosie#associate-a-factory-with-an-existing-class
  // when passing a class to a rosie Factory, will pass the output of .build to the constructor of the class
  // with inheritance from Objection, need to explicitly define a constructor method for rosie
  
  $beforeInsert() {
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = Model;
