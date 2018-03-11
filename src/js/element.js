class Element {
  constructor(handle) {
    if (handle) {
      this.elements = document.querySelectorAll(handle);
    } else {
      this.elements = [];
    }
  }

  addClass(className) {
    this.assure(element => {
      if (element.classList) {
        element.classList.add(className);
      } else {
        const classes = element.className.split(' ');
        const existingIndex = classes.indexOf(className);

        if (existingIndex >= 0) {
          return;
        }

        classes.push(className);
        element.className = classes.join(' ');
      }
    });
  }

  assure(action) {
    if (this.elements.length === 0) {
      return;
    }

    for (const element of this.elements) {
      action(element);
    }
  }

  attr(attribute, value = undefined) {
    if (value === undefined) {
      return this.elements[0].getAttribute(attribute);
    } else if (value) {
      this.assure(element => element.setAttribute(attribute, value));
    } else {
      this.assure(element => element.removeAttribute(attribute, value));
    }

    return this;
  }

  on(eventName, target, callback = null) {
    if (callback === null) {
      callback = target;
      target = undefined;

      this.assure(element => listen(element, callback));
    } else {
      listen(document, liveEvent);
    }

    return this;

    // //////////

    function listen(object, func) {
      if (object.addEventListener) {
        object.addEventListener(eventName, func, false);
      } else {
        object.attachEvent('on' + eventName, func);
      }
    }

    function liveEvent(event) {
      const elements = document.querySelectorAll(target);

      if (elements) {
        let targetElement = event.target;
        let index = -1;

        while (targetElement && ((index = Array.prototype.indexOf.call(elements, targetElement)) === -1)) {
          targetElement = targetElement.parentElement;
        }

        if (index > -1) {
          callback.call(targetElement, event);
        }
      }
    }
  }

  removeClass(className) {
    this.assure(element => {
      if (element.classList) {
        element.classList.remove(className);
      } else {
        const classes = element.className.split(' ');
        const existingIndex = classes.indexOf(className);

        if (existingIndex >= 0) {
          classes.splice(existingIndex, 1);
        }
      }
    });
  }

  toggleClass(className) {
    this.assure(element => {
      if (element.classList) {
        element.classList.toggle(className);
      } else {
        const classes = element.className.split(' ');
        const existingIndex = classes.indexOf(className);

        if (existingIndex >= 0) {
          classes.splice(existingIndex, 1);
        } else {
          classes.push(className);
          element.className = classes.join(' ');
        }
      }
    });
  }

  trigger(eventName, data = {}) {
    this.assure(element => {
      const event = document.createEvent('HTMLEvents');

      event.initEvent(eventName, true, true);
      event.data = data || {};
      event.eventName = eventName;

      element.dispatchEvent(event);
    });

    return this;
  }
}

function $(handle) {
  if (typeof handle === 'object') {
    const element = new Element();

    element.elements.push(handle);

    return element;
  }

  return new Element(handle);
}
