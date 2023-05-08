
export function debounce(fn, delay) {//防抖
    let timer = null;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        let context = this;
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, delay)
    }
}
export function throttle(fn, delay) {//节流
    let timer = null;
    return function (...args) {
        let context = this;
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args);
                timer = null;
            }, delay)
        }
    }
}