import { getAbsDistance, log } from "../utils"
import { Strategy } from "./strategy"
import { Direction } from '../model/index'


export class StrategyDistance extends Strategy {

    static instance: StrategyDistance
    static get() {
        if (!StrategyDistance.instance) {
            StrategyDistance.instance = new StrategyDistance()
        }
        return StrategyDistance.instance
    }
    private constructor() {
        super()
        log.info('StrategyDistance constructor')
    }

    /**
     * @description: 向上移动，寻找最佳落焦元素
     * 策略：遍历所有可落焦元素，当前元素和非上边元素跳过，下边元素分两种情况：
     * 1. 有重叠部分，只计算Y轴距离
     * 2. 无重叠部分，左上方元素，则计算当前元素中心点与目标元素右下角距离；右上方元素，则计算当前元素中心点与目标元素左下角距离
     * @param {HTMLCollectionOf} 可落焦元素列表
     * @param {Element} 当前落焦元素
     * @return 最佳落焦元素
     */
    getUpTarget(focusableEles: HTMLCollectionOf<Element>, curFocusEle: Element): null | Element {
        // 如显式声明目标属性，当没找到时直接返回，不再走自动寻焦逻辑
        if (curFocusEle.getAttribute(Direction.UP)) {
            const targetId: string = curFocusEle.getAttribute(Direction.UP)
            if (targetId === '#') return null
            if (!focusableEles.namedItem(targetId)) return null
            const target: Element = document.getElementById(targetId)
            if (!target) return null
            return target
        }

        const _curFocusEleRect = curFocusEle.getBoundingClientRect()
        const _curFocusEleTop = _curFocusEleRect.top,
            _curFocusEleLeft = _curFocusEleRect.left,
            _curFocusEleHeight = _curFocusEleRect.height,
            _curFocusEleWidth = _curFocusEleRect.width,
            _curFocusEleX = _curFocusEleLeft + _curFocusEleWidth / 2,
            _curFocusEleY = _curFocusEleTop + _curFocusEleHeight / 2

        console.log('当前落焦元素', curFocusEle, _curFocusEleLeft, _curFocusEleTop)

        let dist = 99999, _tempTarget = null
        const len = focusableEles.length

        for (let i = 0; i < len; i++) {
            const _ele = focusableEles[i]
            let _dist = 0
            console.log('遍历的当前元素', i, _ele)
            if (_ele !== curFocusEle) {
                const _eleRect = _ele.getBoundingClientRect()
                const _eleTop = _eleRect.top,
                    _eleLeft = _eleRect.left,
                    _eleWidth = _eleRect.width,
                    _eleHeight = _eleRect.height

                let leftCollision = _eleLeft <= _curFocusEleLeft && _eleLeft + _eleWidth > _curFocusEleLeft
                let rightCollision = _eleLeft >= _curFocusEleLeft && _eleLeft < _curFocusEleLeft + _curFocusEleWidth
                if (_eleTop < _curFocusEleTop && (leftCollision || rightCollision)) {
                    // 注意：这里不是元素中心点
                    _dist = _curFocusEleTop - _eleTop
                    if (_dist < dist) {
                        dist = _dist
                        _tempTarget = _ele
                    }
                    console.log('检测有重叠区域，只计算Y轴距离', _dist, dist)
                } else if (_eleTop < _curFocusEleTop) {
                    //如果在目标左上边，计算目标元素右下角与当前元素中心点距离；如果在右上边，则计算目标元素左下角与当前元素中心点距离
                    if (_eleLeft < _curFocusEleLeft)
                        _dist = getAbsDistance(_eleLeft + _eleWidth, _eleTop + _eleHeight, _curFocusEleX, _curFocusEleY)
                    else
                        _dist = getAbsDistance(_eleLeft, _eleTop  + _eleHeight, _curFocusEleX, _curFocusEleY)

                    if (_dist < dist) {
                        dist = _dist
                        _tempTarget = _ele
                    }
                    console.log('检测无重叠区域，计算距离', _dist, dist)
                } else {
                    console.log('检测不在目标元素上边')
                }
            } else {
                console.log('遍历到自身元素，跳过')
            }
        }
        return _tempTarget
    }

    /**
     * @description: 向下移动，寻找最佳落焦元素
     * 策略：遍历所有可落焦元素，当前元素和非下边元素跳过，下边元素分两种情况：
     * 1. 有重叠部分，只计算Y轴距离
     * 2. 无重叠部分，左下方元素，则计算当前元素中心点与目标元素右上角距离；右下方元素，则计算当前元素中心点与目标元素左上角距离
     * @param {HTMLCollectionOf} 可落焦元素列表
     * @param {Element} 当前落焦元素
     * @return 最佳落焦元素
     */
    getDownTarget(focusableEles: HTMLCollectionOf<Element>, curFocusEle: Element): null | Element {
        // 如显式声明目标属性，当没找到时直接返回，不再走自动寻焦逻辑
        if (curFocusEle.getAttribute(Direction.DOWN)) {
            const targetId: string = curFocusEle.getAttribute(Direction.DOWN)
            if (targetId === '#') return null
            if (!focusableEles.namedItem(targetId)) return null
            const target: Element = document.getElementById(targetId)
            if (!target) return null
            return target
        }

        const _curFocusEleRect = curFocusEle.getBoundingClientRect()
        const _curFocusEleTop = _curFocusEleRect.top,
            _curFocusEleLeft = _curFocusEleRect.left,
            _curFocusEleHeight = _curFocusEleRect.height,
            _curFocusEleWidth = _curFocusEleRect.width,
            _curFocusEleX = _curFocusEleLeft + _curFocusEleWidth / 2,
            _curFocusEleY = _curFocusEleTop + _curFocusEleHeight / 2

        console.log('当前落焦元素', curFocusEle, _curFocusEleLeft, _curFocusEleTop)

        let dist = 99999, _tempTarget = null
        const len = focusableEles.length

        for (let i = 0; i < len; i++) {
            const _ele = focusableEles[i]
            let _dist = 0
            console.log('遍历的当前元素', i, _ele)
            if (_ele !== curFocusEle) {
                const _eleRect = _ele.getBoundingClientRect()
                const _eleTop = _eleRect.top,
                    _eleLeft = _eleRect.left,
                    _eleWidth = _eleRect.width

                let leftCollision = _eleLeft <= _curFocusEleLeft && _eleLeft + _eleWidth > _curFocusEleLeft
                let rightCollision = _eleLeft >= _curFocusEleLeft && _eleLeft < _curFocusEleLeft + _curFocusEleWidth
                if (_eleTop > _curFocusEleTop && (leftCollision || rightCollision)) {
                    // 注意：这里不是元素中心点
                    _dist = _eleTop - _curFocusEleTop
                    if (_dist < dist) {
                        dist = _dist
                        _tempTarget = _ele
                    }
                    console.log('检测有重叠区域，只计算Y轴距离', _dist, dist)
                } else if (_eleTop > _curFocusEleTop) {
                    //如果在目标左下边，计算目标元素右上角与当前元素中心点距离；如果在右下边，则计算目标元素左上角与当前元素中心点距离
                    if (_eleLeft < _curFocusEleLeft)
                        _dist = getAbsDistance(_eleLeft + _eleWidth, _eleTop, _curFocusEleX, _curFocusEleY)
                    else
                        _dist = getAbsDistance(_eleLeft, _eleTop, _curFocusEleX, _curFocusEleY)

                    if (_dist < dist) {
                        dist = _dist
                        _tempTarget = _ele
                    }
                    console.log('检测无重叠区域，计算距离', _dist, dist)
                } else {
                    console.log('检测不在目标元素下边')
                }
            } else {
                console.log('遍历到自身元素，跳过')
            }
        }
        return _tempTarget
    }

    /**
     * @description: 向左移动，寻找最佳落焦元素
     * 策略：遍历所有可落焦元素，当前元素和非左边元素跳过，左边元素分两种情况：
     * 1. 有重叠部分，只计算X轴距离
     * 2. 无重叠部分，左上方元素，则计算当前元素中心点与目标元素右下角距离；左下方元素，则计算当前元素中心点与目标元素右上角距离
     * @param {HTMLCollectionOf} 可落焦元素列表
     * @param {Element} 当前落焦元素
     * @return 最佳落焦元素
     */
    getLeftTarget(focusableEles: HTMLCollectionOf<Element>, curFocusEle: Element): null | Element {

        // 如显式声明目标属性，当没找到时直接返回，不再走自动寻焦逻辑
        if (curFocusEle.getAttribute(Direction.LEFT)) {
            const targetId: string = curFocusEle.getAttribute(Direction.LEFT)
            if (targetId === '#') return null
            if (!focusableEles.namedItem(targetId)) return null
            const target: Element = document.getElementById(targetId)
            if (!target) return null
            return target
        }

        const _curFocusEleRect = curFocusEle.getBoundingClientRect()
        const _curFocusEleTop = _curFocusEleRect.top,
            _curFocusEleLeft = _curFocusEleRect.left,
            _curFocusEleHeight = _curFocusEleRect.height,
            _curFocusEleWidth = _curFocusEleRect.width,
            _curFocusEleX = _curFocusEleLeft + _curFocusEleWidth / 2,
            _curFocusEleY = _curFocusEleTop + _curFocusEleHeight / 2

        console.log('当前落焦元素', curFocusEle, _curFocusEleLeft, _curFocusEleTop)

        let dist = 99999, _tempTarget = null
        const len = focusableEles.length

        for (let i = 0; i < len; i++) {
            const _ele = focusableEles[i]
            let _dist = 0
            console.log('遍历的当前元素', i, _ele)
            if (_ele !== curFocusEle) {
                const _eleRect = _ele.getBoundingClientRect()
                const _eleTop = _eleRect.top,
                    _eleLeft = _eleRect.left,
                    _eleHeight = _eleRect.height,
                    _eleWidth = _eleRect.width

                let upCollision = _eleTop <= _curFocusEleTop && _eleTop + _eleHeight > _curFocusEleTop
                let downCollision = _eleTop >= _curFocusEleTop && _eleTop < _curFocusEleTop + _curFocusEleHeight
                if (_eleLeft < _curFocusEleLeft && (upCollision || downCollision)) {
                    _dist = _curFocusEleX - _eleLeft
                    if (_dist < dist) {
                        dist = _dist
                        _tempTarget = _ele
                    }
                    console.log('检测有重叠区域，只计算X轴距离', _dist, dist)
                } else if (_eleLeft < _curFocusEleLeft) {
                    //如果在目标上边，计算目标元素右下角与当前元素中心点距离；如果在下面，则计算目标元素右上角与当前元素中心点距离
                    if (_eleTop >= _curFocusEleTop)
                        _dist = getAbsDistance(_eleLeft + _eleWidth, _eleTop + _eleHeight, _curFocusEleX, _curFocusEleY)
                    else
                        _dist = getAbsDistance(_eleLeft + _eleWidth, _eleTop, _curFocusEleX, _curFocusEleY)

                    if (_dist < dist) {
                        dist = _dist
                        _tempTarget = _ele
                    }
                    console.log('检测无重叠区域，计算距离', _dist, dist)
                } else {
                    console.log('检测不在目标元素左边')
                }
            } else {
                console.log('遍历到自身元素，跳过')
            }
        }
        return _tempTarget
    }

    /**
     * @description: 向右移动，寻找最佳落焦元素
     * 策略：遍历所有可落焦元素，当前元素和非右边元素跳过，右边元素分两种情况：
     * 1. 有重叠部分，只计算X轴距离
     * 2. 无重叠部分，右上方元素，则计算当前元素中心点与目标元素左下角距离；右下方元素，则计算当前元素中心点与目标元素左上角距离
     * @param {HTMLCollectionOf} 可落焦元素列表
     * @param {Element} 当前落焦元素
     * @return 最佳落焦元素
     */
    getRightTarget(focusableEles: HTMLCollectionOf<Element>, curFocusEle: Element): null | Element {

        // 如显式声明目标属性，当没找到时直接返回，不再走自动寻焦逻辑
        if (curFocusEle.getAttribute(Direction.RIGHT)) {
            const targetId: string = curFocusEle.getAttribute(Direction.RIGHT)
            if (targetId === '#') return null
            if (!focusableEles.namedItem(targetId)) return null
            const target: Element = document.getElementById(targetId)
            if (!target) return null
            return target
        }

        // 自动寻焦逻辑
        const _curFocusEleRect = curFocusEle.getBoundingClientRect()
        const _curFocusEleTop = _curFocusEleRect.top,
            _curFocusEleLeft = _curFocusEleRect.left,
            _curFocusEleHeight = _curFocusEleRect.height,
            _curFocusEleWidth = _curFocusEleRect.width,
            _curFocusEleX = _curFocusEleLeft + _curFocusEleWidth / 2,
            _curFocusEleY = _curFocusEleTop + _curFocusEleHeight / 2

        console.log('当前落焦元素', curFocusEle, _curFocusEleLeft, _curFocusEleTop)

        let dist = 99999, _tempTarget = null
        const len = focusableEles.length

        for (let i = 0; i < len; i++) {
            const _ele = focusableEles[i]
            let _dist = 0
            console.log('遍历的当前元素', i, _ele)
            if (_ele !== curFocusEle) {
                const _eleRect = _ele.getBoundingClientRect()
                const _eleTop = _eleRect.top,
                    _eleLeft = _eleRect.left,
                    _eleHeight = _eleRect.height

                let upCollision = _eleTop <= _curFocusEleTop && _eleTop + _eleHeight > _curFocusEleTop
                let downCollision = _eleTop >= _curFocusEleTop && _eleTop < _curFocusEleTop + _curFocusEleHeight
                if (_eleLeft > _curFocusEleLeft && (upCollision || downCollision)) {
                    _dist = _eleLeft - _curFocusEleX
                    if (_dist < dist) {
                        dist = _dist
                        _tempTarget = _ele
                    }
                    console.log('检测有重叠区域，只计算X轴距离', _dist, dist)
                } else if (_eleLeft > _curFocusEleLeft) {
                    //如果在目标上边，计算目标元素左下角与当前元素中心点距离；如果在下面，则计算目标元素左上角与当前元素中心点距离
                    if (_eleTop >= _curFocusEleTop)
                        _dist = getAbsDistance(_eleLeft, _eleTop, _curFocusEleX, _curFocusEleY)
                    else
                        _dist = getAbsDistance(_eleLeft, _eleTop + _eleHeight, _curFocusEleX, _curFocusEleY)

                    if (_dist < dist) {
                        dist = _dist
                        _tempTarget = _ele
                    }
                    console.log('检测无重叠区域，计算距离', _dist, dist)
                } else {
                    console.log('检测不在目标元素右边')
                }
            } else {
                console.log('遍历到自身元素，跳过')
            }
        }
        return _tempTarget
    }
}