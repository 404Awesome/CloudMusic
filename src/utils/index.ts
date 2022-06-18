import handle from "./handle";
import operate from "./operate"
import mitt from "mitt";

export const Handle = handle;     // 处理相关工具类
export const Operate = operate;   // 操作相关工具类
export const useMitt = mitt();    // 使用全局总线