import { Model, modelRegister } from "../utils/mpux.js"

class Home extends Model {
  static namespace = "home"
  data = {
    goods:[],
    message: "Holiday",
  }
}
modelRegister(Home);
