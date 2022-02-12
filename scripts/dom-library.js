/*
 * C: DOM Shortcut for creating a child element
 * @param Element parent element to attach child to
 * @param String element tag to create
 * @param String optional initial class of the element
 * @param String optional initial innerText of the element
 * @param Obj optional object whose key/value pairs will be added to the element
 * @return Element the created child element
 */
 
function C (parent, tag, c = false, text = false, attributes = false) {
    const el = document.createElement(tag);

    if (c) el.classList.add(c); 
    if (parent) parent.appendChild(el);
    if (text) el.innerText = text;
    if (attributes) {
        for (const [key, value] of Object.entries(attributes)) {
            console.log (key, value);
            el.setAttribute (key, value);
        };
    }

    return el
}

/* DOM Document shortcuts for querySelector, querySelectorAll, getElementById and getElementById.style */

function Q (selector) { return document.querySelector(selector)};
function A (selector) { return document.querySelectorAll(selector)};
function I (id) { return document.getElementById(id)};
function S (id) { return document.getElementById(id).style};