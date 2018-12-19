'use strict';

export default class Dropdown {
    constructor(element, options) {
        if(!element) {
            return;
        }
        options = Object.assign({
            defaultText : 'Selected',
            index: -1
        }, options);
        this.html = document.querySelector('html');
        this.element = element;
        this.options = options;
        this.buttonChoose = this.element.querySelector('.button-choose');
        this.list = this.element.querySelector('.list');
        this.listItems = this.list.querySelectorAll('button');        
        this.initialize();
    }
    initialize() {
        this.setSelectedText(this.options.index > -1 ? this.getSelectedText(this.listItems[this.options.index]) : this.options.defaultText);
        this.bindHandlers();
    }
    bindHandlers() {
        var self = this;
        this.element.addEventListener('click', function(e) {
            var target = e.target;
            if(target && target.nodeName === 'BUTTON' && target.classList.contains('button-choose')) {
                self.toggleExpanded(); 
            } else if(target && target.nodeName === 'BUTTON' && target.classList.contains('button-item')) {
                self.textChoose = self.getSelectedText(target);
                self.setSelectedText(self.textChoose);
                self.unsetExpanded();
                if (self.callback && typeof self.callback == "function") {
                    self.callback({
                        text : self.textChoose,
                        index : self.index
                    });
                }
            }
        })
        this.html.addEventListener('click', function(e) {
            if(e.target && e.target.nodeName === 'HTML') {
                self.unsetExpanded();
            }
        })
    }
    getSelectedText(element) {
        return element.textContent || element.innerText;
    }
    setSelectedText(text) {
        if (this.buttonChoose.textContent) {
            this.buttonChoose.textContent = text;
        } else {
            this.buttonChoose.innerText = text;
        }
    }
    toggleExpanded() {
        (this.list.classList.contains('visible')) ? this.unsetExpanded() : this.setExpanded();
    }
    setExpanded() {
        if (!this.list.classList.contains('visible')) {
            this.buttonChoose.classList.add('expanded');
            this.list.classList.add('visible');
            this.list.setAttribute('aria-hidden', 'false');
        }
    }
    unsetExpanded() {
        if (this.list.classList.contains('visible')) {
            this.buttonChoose.classList.remove('expanded');
            this.list.classList.remove('visible');
            this.list.setAttribute('aria-hidden','true');
        }
    }
}