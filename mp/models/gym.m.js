import { Model, modelRegister } from "../utils/jr-sm/index.js"

class Gym extends Model {
  namespace = "gym"
  data = {
    topic: "大家一起做运动",
    count: 0,
  }
}
modelRegister(Gym);
