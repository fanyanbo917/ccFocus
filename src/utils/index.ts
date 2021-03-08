/*
 * @Author: Kuiper
 * @Date: 2020-12-23 20:24:12
 * @LastEditTime: 2021-03-08 16:44:03
 */
function getAbsDistance(x1: number, y1: number, x2: number, y2: number): number {
    let xs = 0, ys = 0
    xs = Math.abs(x1 - x2)
    xs = xs * xs
    ys = Math.abs(y1 - y2)
    ys = ys * ys
    return Math.sqrt(xs + ys)
}

function isVisible (ele: Element) {
    return getComputedStyle(ele).display != 'none' && getComputedStyle(ele).visibility != 'hidden'
}

class log {
    private static isDebug: boolean = true
    public static setEnable(flag: boolean = true) {
        log.isDebug = flag
    }
    public static info(...rest: any[]) {
        log.isDebug && console.log.apply(console, rest)
    }
    public static debug(...rest: any[]) {
        log.isDebug && console.debug.apply(console, rest)
    }
    public static warn(...rest: any[]) {
        log.isDebug && console.warn.apply(console, rest)
    }
    public static error(...rest: any[]) {
        log.isDebug && console.error.apply(console, rest)
    }
}

export {
    getAbsDistance,
    log,
    isVisible
}