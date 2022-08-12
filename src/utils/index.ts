import mitt from "mitt";
import Handle from "./handle";
import Operate from "./operate";
import Validation from "./validation";

const useMitt = mitt();

export {
  useMitt,    // 事件总线
  Handle,     // 处理相关工具类
  Operate,    // 操作相关工具类
  Validation  // 验证相关工具类
}