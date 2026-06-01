// Utils.js - Utility functions and helpers

/**
 * Utility functions for DOM manipulation and common operations
 */
const Utils = {
    /**
     * Get element by ID
     * @param {string} id - Element ID
     * @returns {HTMLElement|null}
     */
    getElementById: (id) => {
        return document.getElementById(id);
    },

    /**
     * Get elements by class name
     * @param {string} className - Class name
     * @returns {HTMLCollection}
     */
    getElementsByClassName: (className) => {
        return document.getElementsByClassName(className);
    },

    /**
     * Query selector
     * @param {string} selector - CSS selector
     * @returns {HTMLElement|null}
     */
    querySelector: (selector) => {
        return document.querySelector(selector);
    },

    /**
     * Query selector all
     * @param {string} selector - CSS selector
     * @returns {NodeList}
     */
    querySelectorAll: (selector) => {
        return document.querySelectorAll(selector);
    },

    /**
     * Add event listener to element
     * @param {HTMLElement} element - Target element
     * @param {string} event - Event type
     * @param {Function} callback - Event handler
     */
    addEventListener: (element, event, callback) => {
        if (element) {
            element.addEventListener(event, callback);
        }
    },

    /**
     * Remove event listener from element
     * @param {HTMLElement} element - Target element
     * @param {string} event - Event type
     * @param {Function} callback - Event handler
     */
    removeEventListener: (element, event, callback) => {
        if (element) {
            element.removeEventListener(event, callback);
        }
    },

    /**
     * Add class to element
     * @param {HTMLElement} element - Target element
     * @param {string} className - Class name to add
     */
    addClass: (element, className) => {
        if (element) {
            element.classList.add(className);
        }
    },

    /**
     * Remove class from element
     * @param {HTMLElement} element - Target element
     * @param {string} className - Class name to remove
     */
    removeClass: (element, className) => {
        if (element) {
            element.classList.remove(className);
        }
    },

    /**
     * Toggle class on element
     * @param {HTMLElement} element - Target element
     * @param {string} className - Class name to toggle
     */
    toggleClass: (element, className) => {
        if (element) {
            element.classList.toggle(className);
        }
    },

    /**
     * Check if element has class
     * @param {HTMLElement} element - Target element
     * @param {string} className - Class name to check
     * @returns {boolean}
     */
    hasClass: (element, className) => {
        return element ? element.classList.contains(className) : false;
    },

    /**
     * Set element text content
     * @param {HTMLElement} element - Target element
     * @param {string} text - Text content
     */
    setText: (element, text) => {
        if (element) {
            element.textContent = text;
        }
    },

    /**
     * Set element HTML content
     * @param {HTMLElement} element - Target element
     * @param {string} html - HTML content
     */
    setHTML: (element, html) => {
        if (element) {
            element.innerHTML = html;
        }
    },

    /**
     * Get element text content
     * @param {HTMLElement} element - Target element
     * @returns {string}
     */
    getText: (element) => {
        return element ? element.textContent : '';
    },

    /**
     * Get element HTML content
     * @param {HTMLElement} element - Target element
     * @returns {string}
     */
    getHTML: (element) => {
        return element ? element.innerHTML : '';
    },

    /**
     * Set element attribute
     * @param {HTMLElement} element - Target element
     * @param {string} attribute - Attribute name
     * @param {string} value - Attribute value
     */
    setAttribute: (element, attribute, value) => {
        if (element) {
            element.setAttribute(attribute, value);
        }
    },

    /**
     * Get element attribute
     * @param {HTMLElement} element - Target element
     * @param {string} attribute - Attribute name
     * @returns {string|null}
     */
    getAttribute: (element, attribute) => {
        return element ? element.getAttribute(attribute) : null;
    },

    /**
     * Remove element attribute
     * @param {HTMLElement} element - Target element
     * @param {string} attribute - Attribute name
     */
    removeAttribute: (element, attribute) => {
        if (element) {
            element.removeAttribute(attribute);
        }
    },

    /**
     * Show element
     * @param {HTMLElement} element - Target element
     */
    show: (element) => {
        if (element) {
            element.style.display = '';
            Utils.removeClass(element, 'd-none');
        }
    },

    /**
     * Hide element
     * @param {HTMLElement} element - Target element
     */
    hide: (element) => {
        if (element) {
            element.style.display = 'none';
        }
    },

    /**
     * Toggle element visibility
     * @param {HTMLElement} element - Target element
     */
    toggle: (element) => {
        if (element) {
            if (element.style.display === 'none') {
                Utils.show(element);
            } else {
                Utils.hide(element);
            }
        }
    },

    /**
     * Create element
     * @param {string} tagName - Tag name
     * @param {Object} attributes - Element attributes
     * @param {string} textContent - Text content
     * @returns {HTMLElement}
     */
    createElement: (tagName, attributes = {}, textContent = '') => {
        const element = document.createElement(tagName);
        
        Object.keys(attributes).forEach(key => {
            if (key === 'className') {
                element.className = attributes[key];
            } else {
                element.setAttribute(key, attributes[key]);
            }
        });
        
        if (textContent) {
            element.textContent = textContent;
        }
        
        return element;
    },

    /**
     * Append child to parent
     * @param {HTMLElement} parent - Parent element
     * @param {HTMLElement} child - Child element
     */
    appendChild: (parent, child) => {
        if (parent && child) {
            parent.appendChild(child);
        }
    },

    /**
     * Remove element from DOM
     * @param {HTMLElement} element - Element to remove
     */
    removeElement: (element) => {
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    },

    /**
     * Clear element content
     * @param {HTMLElement} element - Target element
     */
    clearContent: (element) => {
        if (element) {
            element.innerHTML = '';
        }
    },

    /**
     * Debounce function
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function}
     */
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Throttle function
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {Function}
     */
    throttle: (func, limit) => {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Generate random number between min and max
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number}
     */
    randomBetween: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Generate random string
     * @param {number} length - String length
     * @returns {string}
     */
    randomString: (length = 8) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },

    /**
     * Format number with commas
     * @param {number} num - Number to format
     * @returns {string}
     */
    formatNumber: (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },

    /**
     * Capitalize first letter
     * @param {string} str - String to capitalize
     * @returns {string}
     */
    capitalize: (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    /**
     * Convert string to title case
     * @param {string} str - String to convert
     * @returns {string}
     */
    titleCase: (str) => {
        return str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    },

    /**
     * Check if value is empty
     * @param {*} value - Value to check
     * @returns {boolean}
     */
    isEmpty: (value) => {
        return value === null || value === undefined || value === '' || 
               (Array.isArray(value) && value.length === 0) ||
               (typeof value === 'object' && Object.keys(value).length === 0);
    },

    /**
     * Deep clone object
     * @param {Object} obj - Object to clone
     * @returns {Object}
     */
    deepClone: (obj) => {
        return JSON.parse(JSON.stringify(obj));
    },

    /**
     * Merge objects
     * @param {Object} target - Target object
     * @param {...Object} sources - Source objects
     * @returns {Object}
     */
    merge: (target, ...sources) => {
        return Object.assign(target, ...sources);
    },

    /**
     * Get URL parameters
     * @returns {Object}
     */
    getUrlParams: () => {
        const params = {};
        const urlSearchParams = new URLSearchParams(window.location.search);
        for (const [key, value] of urlSearchParams) {
            params[key] = value;
        }
        return params;
    },

    /**
     * Set URL parameter
     * @param {string} key - Parameter key
     * @param {string} value - Parameter value
     */
    setUrlParam: (key, value) => {
        const url = new URL(window.location);
        url.searchParams.set(key, value);
        window.history.pushState({}, '', url);
    },

    /**
     * Remove URL parameter
     * @param {string} key - Parameter key
     */
    removeUrlParam: (key) => {
        const url = new URL(window.location);
        url.searchParams.delete(key);
        window.history.pushState({}, '', url);
    },

    /**
     * Scroll to element
     * @param {HTMLElement} element - Target element
     * @param {Object} options - Scroll options
     */
    scrollToElement: (element, options = { behavior: 'smooth' }) => {
        if (element) {
            element.scrollIntoView(options);
        }
    },

    /**
     * Scroll to top
     * @param {Object} options - Scroll options
     */
    scrollToTop: (options = { behavior: 'smooth' }) => {
        window.scrollTo({ top: 0, ...options });
    },

    /**
     * Get element position
     * @param {HTMLElement} element - Target element
     * @returns {Object}
     */
    getElementPosition: (element) => {
        if (!element) return { top: 0, left: 0 };
        const rect = element.getBoundingClientRect();
        return {
            top: rect.top + window.pageYOffset,
            left: rect.left + window.pageXOffset,
            width: rect.width,
            height: rect.height
        };
    },

    /**
     * Check if element is in viewport
     * @param {HTMLElement} element - Target element
     * @returns {boolean}
     */
    isInViewport: (element) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    /**
     * Wait for specified time
     * @param {number} ms - Milliseconds to wait
     * @returns {Promise}
     */
    wait: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    /**
     * Fetch JSON data
     * @param {string} url - URL to fetch
     * @returns {Promise}
     */
    fetchJSON: async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    },

    /**
     * Local storage helpers
     */
    storage: {
        /**
         * Set item in localStorage
         * @param {string} key - Storage key
         * @param {*} value - Value to store
         */
        set: (key, value) => {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                console.error('localStorage set error:', error);
            }
        },

        /**
         * Get item from localStorage
         * @param {string} key - Storage key
         * @returns {*}
         */
        get: (key) => {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (error) {
                console.error('localStorage get error:', error);
                return null;
            }
        },

        /**
         * Remove item from localStorage
         * @param {string} key - Storage key
         */
        remove: (key) => {
            try {
                localStorage.removeItem(key);
            } catch (error) {
                console.error('localStorage remove error:', error);
            }
        },

        /**
         * Clear all localStorage
         */
        clear: () => {
            try {
                localStorage.clear();
            } catch (error) {
                console.error('localStorage clear error:', error);
            }
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}

/**
 * Get CSRF token from cookies
 * @returns {string|null}
 */
Utils.getCSRFToken = () => {
    let csrfToken = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, 'csrftoken'.length + 1) === ('csrftoken=')) {
                csrfToken = decodeURIComponent(cookie.substring('csrftoken'.length + 1));
                break;
            }
        }
    }
    return csrfToken;
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}
