export default {
    addEvent(evnt, elem, func) {
        if (elem.addEventListener) { // W3C DOM
            elem.addEventListener(evnt, func, false);
        } else if (elem.attachEvent) { // IE DOM
            elem.attachEvent("on"+evnt, func);
        } else { // No much to do
            elem[evnt] = func;
        }
    },
    classToggler(ele, className) {
        if (ele.classList) {
            ele.classList.toggle(className);
        } else {
            const classes = ele.className.split(' ');
            let i = classes.indexOf(className);

            if (i >= 0) {
            classes.splice(i, 1);
            } else {
            classes.push(className);
            }
            ele.className = classes.join(' ');
        }  
    },
};