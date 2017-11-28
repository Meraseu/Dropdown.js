/**
 * Dropdown.js
 * 
 * ie10 higher support.
 * Add polyphile below ie10.
 * 
 */

window.Dropdown = (function (Dropdown) {

    Dropdown = function (element, options) {
        if(!element) {
            return;
        }
        this.html = document.querySelector('html');
        this.element = element;
        this.options = options || {};
        this.buttonChoose = this.element.querySelector('.button-choose');
        this.list = this.element.querySelector('.list');
        this.listItems = this.list.querySelectorAll('button');
        this.callback = this.options.callback || function() {};
        this.textChoose = this.options.defaultText || 'Select';
        this.index = this.options.index;
        this.init();
    }

    Dropdown.prototype = {
        init : function() {
            if(this.index) {
                this.setSelectedText(this.buttonChoose, this.getSelectedText(this.listItems[this.index-1]));
            } else {
                this.setSelectedText(this.buttonChoose, this.textChoose);
            }
            this.bindHandlers();
        },
        bindHandlers : function() {
            var self = this;
            this.element.addEventListener('click', function(e) {
                var target = e.target;
                if(target && target.nodeName === 'BUTTON' && self.hasClass(target, 'button-choose')) {
                    self.toggleListExpanded(); 
                } else if(target && target.nodeName === 'BUTTON' && self.hasClass(target, 'button-item')) {
                    self.textChoose = self.getSelectedText(target);
                    self.setSelectedText(self.buttonChoose, self.textChoose);
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
        },
        getSelectedText : function (element) {
            return element.textContent || element.innerText;
        },
        setSelectedText : function (element, text) {
            if (element.textContent) {
                element.textContent = text;
            } else {
                element.innerText = text;
            }
        },
        toggleListExpanded : function () {
            (this.hasClass(this.list, 'visible')) ? this.unsetExpanded() : this.setExpanded();
        },
        setExpanded : function () {
            if (!this.hasClass(this.list, 'visible')) {
                this.buttonChoose.classList.add('expanded');
                this.list.classList.add('visible');
                this.list.setAttribute('aria-hidden', 'false');
            }
        },
        unsetExpanded : function () {
            if (this.hasClass(this.list, 'visible')) {
                this.buttonChoose.classList.remove('expanded');
                this.list.classList.remove('visible');
                this.list.setAttribute('aria-hidden','true');
            }
        },
        hasClass : function(element, className) {
            return (element.classList) ? element.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(element.className);
        }
    }

    return Dropdown;

})(window.Dropdown || {});