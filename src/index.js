
const menuToggle = ((el = '.menu-btn', elDependency = '.nav') => {
    const menu = document.querySelector(el);
    const dependency = document.querySelector(elDependency);
    let isOpen = false;

    const setAriaExpanded = (el, state) => {
        el.setAttribute('aria-expanded', String(state));
    }

    const toggleClass = (el, className) => {
        return el.classList.toggle(className);
    }

    return () => {
        menu.addEventListener('click', (e) => {
            isOpen = !isOpen;            
            toggleClass(e.target, `${el.replace('.','')}--active`);
            setAriaExpanded(e.target, isOpen);
            toggleClass(dependency, `${elDependency.replace('.','')}--open`);            
            setAriaExpanded(dependency, isOpen);
        });
    }    
})();

window.addEventListener('DOMContentLoaded', () => {
    menuToggle();    
});