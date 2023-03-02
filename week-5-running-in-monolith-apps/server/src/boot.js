import bootDevelopment from "./boot/environments/development"
import bootTest from "./boot/environments/test"
import bootModel from "./boot/model.cjs"
// import connection from "./boot/model.cjs"

// export { connection }

const boot = ({ skipModel = false }) =>
  Promise.all([bootDevelopment(), bootTest()]).then(() => {
    if (!skipModel) {
      return bootModel()
    }
    return null
  })

export default boot
