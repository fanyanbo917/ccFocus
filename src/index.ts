/*
 * @Author: Kuiper
 * @Date: 2020-12-23 20:17:49
 * @LastEditTime: 2021-03-08 16:46:27
 */

import { EVENT } from "./model"
import { Strategy } from "./strategy/strategy"
import { StrategyDistance } from "./strategy/StrategyDistance"
import { strategyCollision } from "./strategy/strategyCollision"
import { StrategyX } from "./strategy/strategyX"
import { isVisible, log } from "./utils"

class CCFocus {
    static instance: CCFocus
    private focusableEles: HTMLCollectionOf<Element>
    private curFocusEle: Element
    private focusStyleClass: string = 'btn-focus'
    private strategy: Strategy

    static get() {
        if (!CCFocus.instance) {
            CCFocus.instance = new CCFocus()
        }
        return CCFocus.instance
    }

    private constructor() {
        log.info('CCFocus constructor')
        this.strategy = StrategyDistance.get()
    }

    /**
     * @description: 
     * @param {string} focusClass
     * @param {string} curEleId
     * @param {string} focusStyle
     * @return {*}
     */
    public init(focusClass: string, curEleId?: string, focusStyle?: string): CCFocus {

        window && (window.onkeydown = (ev) => {
            this._onKeydown(ev)
        })

        this.focusableEles = document.getElementsByClassName(focusClass)
        if (this.focusableEles.length === 0) {
            this.focusableEles = document.getElementsByTagName('body')
            log.warn('focusableEles\' cannot be found', this.focusableEles)
        }

        let _curElement: Element = document.getElementById(curEleId)
        if (!!_curElement) {
            for (let j = 0; j < this.focusableEles.length; j++) {
                if (this.focusableEles[j] == _curElement) {
                    this.curFocusEle = _curElement
                    break
                }
            }
        }

        if (this.curFocusEle == null) {
            log.info('the curElement cannot be found')
            for (let k = 0; k < this.focusableEles.length; k++) {
                if (isVisible(this.focusableEles[k])) {
                    this.curFocusEle = this.focusableEles[k]
                    break
                }
            }
        }

        this.focusStyleClass = focusStyle == null ? 'btn-focus' : focusStyle

        this._setFocusStyle()

        return this
    }

    private _onKeydown(ev): void {
        log.info('keydown keyCode = ' + ev.keyCode)
        const lastFocusEle = this.curFocusEle
        switch (ev.keyCode) {
            case 37:
                this._moveLeft();
                ev.stopPropagation();
                break;
            case 38:
                this._moveUp();
                ev.stopPropagation();
                break;
            case 39:
                this._moveRight();
                ev.stopPropagation();
                break;
            case 40:
                this._moveDown();
                ev.stopPropagation();
                break;
            case 13:
                this._dispatchEvent(EVENT.CLICK)
                break;
        }
        if (lastFocusEle !== this.curFocusEle) {
            this._dispatchEvent(EVENT.BLUR, lastFocusEle)
            this._dispatchEvent(EVENT.FOCUS)
        }
    }

    private _dispatchEvent(evtName: EVENT, ele?: Element) {
        const ev = document.createEvent('HTMLEvents')
        ev.initEvent(evtName, false, false)
        if (ele != null) ele.dispatchEvent(ev)
        else this.curFocusEle.dispatchEvent(ev)

    }

    private _moveUp(): void {
        let _target = this.strategy.getUpTarget(this.focusableEles, this.curFocusEle)
        if (_target !== null) {
            this.curFocusEle = _target
            this._setFocusStyle()
        } else {
            console.log('没找到向上目标元素')
        }
    }

    private _moveDown(): void {
        let _target = this.strategy.getDownTarget(this.focusableEles, this.curFocusEle)
        if (_target !== null) {
            this.curFocusEle = _target
            this._setFocusStyle()
        } else {
            console.log('没找到向下目标元素')
        }
    }

    private _moveLeft(): void {
        let _target = this.strategy.getLeftTarget(this.focusableEles, this.curFocusEle)
        if (_target !== null) {
            this.curFocusEle = _target
            this._setFocusStyle()
        } else {
            console.log('没找到向左目标元素')
        }
    }

    private _moveRight(): void {
        let _target = this.strategy.getRightTarget(this.focusableEles, this.curFocusEle)
        if (_target !== null) {
            this.curFocusEle = _target
            this._setFocusStyle()
        } else {
            console.log('没找到向右目标元素')
        }
    }

    private _setFocusStyle(): void {
        if (this.curFocusEle == null) {
            for (let i = 0; i < this.focusableEles.length; i++) {
                if (isVisible(this.focusableEles[i])) {
                    this.curFocusEle = this.focusableEles[i]
                    break
                }
            }
        }
        for (let j = 0; j < this.focusableEles.length; j++) {
            this.focusableEles[j].classList.remove(this.focusStyleClass)
        }

        this.curFocusEle.classList.add(this.focusStyleClass)
    }

    /**
     * @description: 设置自动寻找最佳元素的策略
     * @param {number} 0: 距离优先策略 1: 重叠优先策略
     * @return {*}
     */
    public setStrategy(which: number): CCFocus {
        switch (which) {
            case 0:
                this.strategy = StrategyDistance.get()
                break
            case 1:
                this.strategy = strategyCollision.get()
                break
            case 2:
                this.strategy = StrategyX.get()
                break
            default:
                this.strategy = StrategyDistance.get()
        }
        return this
    }
}

export default CCFocus.get()