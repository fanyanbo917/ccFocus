/*
 * @Author: Kuiper
 * @Date: 2021-03-08 16:40:19
 * @LastEditTime: 2021-03-08 16:45:20
 */
import { Strategy } from "./strategy"

// 定义你自己的寻焦策略
export class StrategyX extends Strategy {

    static instance: StrategyX
    static get() {
        if (!StrategyX.instance) {
            StrategyX.instance = new StrategyX()
        }
        return StrategyX.instance
    }
    private constructor() { 
        super()
    }
    
    getUpTarget(focusableEles: HTMLCollectionOf<Element>, curFocusEle: Element): Element {
        throw new Error("Method not implemented.")
    }
    getDownTarget(focusableEles: HTMLCollectionOf<Element>, curFocusEle: Element): Element {
        throw new Error("Method not implemented.")
    }
    getLeftTarget(focusableEles: HTMLCollectionOf<Element>, curFocusEle: Element): Element {
        throw new Error("Method not implemented.")
    }
    getRightTarget(focusableEles: HTMLCollectionOf<Element>, curFocusEle: Element): Element {
        throw new Error("Method not implemented.")
    }

}