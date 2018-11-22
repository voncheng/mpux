import { Model, modelRegister } from "../utils/jr-sm/index.js"

class Home extends Model {
  namespace = "home"
  data = {
    goods:[],
    message: "Holiday",
  }
}
modelRegister(Home);
