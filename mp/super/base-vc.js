import { Controller } from "../utils/jr-sm/index.js";

// 制作一个基础类
export default class BaseController extends Controller {
  onShow() {
    console.log('统一处理onShow')
  }
  ajax() {
    console.log('request...');
  }
}
