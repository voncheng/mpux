import { Model, modelRegister } from "../utils/mpux.js"

class Gym extends Model {
  static namespace = "gym"
  data = {
    topic: "大家一起做运动",
    count: 0,
  }
}
modelRegister(Gym);
