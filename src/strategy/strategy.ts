/*
 * @Author: Kuiper
 * @Date: 2021-02-22 11:10:09
 * @LastEditTime: 2021-03-08 16:53:11
 */
import { Direction } from '../model/index';
import { log } from '../utils';

export abstract class Strategy {
    abstract getUpTarget(focusableEles: HTMLCollectionOf<Element>, curFocusEle: Element): null | Element
    abstract getDownTarget(focusableEles: HTMLCollectionOf<Element>, curFocusEle: Element): null | Element
    abstract getLeftTarget(focusableEles: HTMLCollectionOf<Element>, curFocusEle: Element): null | Element
    abstract getRightTarget(focusableEles: HTMLCollectionOf<Element>, curFocusEle: Element): null | Element
    getTarget(focusableEles: HTMLCollectionOf<Element>, curFocusEle: Element, direction: Direction): null | Element {
        let _tempTarget = null
        switch (direction) {
            case Direction.UP:
                _tempTarget = this.getUpTarget(focusableEles, curFocusEle)
                break
            case Direction.DOWN:
                _tempTarget = this.getDownTarget(focusableEles, curFocusEle)
                break
            case Direction.LEFT:
                _tempTarget = this.getLeftTarget(focusableEles, curFocusEle)
                break
            case Direction.RIGHT:
                _tempTarget = this.getRightTarget(focusableEles, curFocusEle)
                break
            default:
                log.warn('getTargetEle direction cannot found')
        }
        return _tempTarget
    }
}



