if (!window.showInsets) {
   
    showInsets();
    window.addEventListener("resize", throttle(changeArtboards, 200));
    
    function showInsets() {
        let insets = selectElements(".ai2html_export");
        for(let i=0; i<insets.length; i++) {
            const container = insets[i];
            const parentContainer = container.parentElement;
            if (!parentContainer.classList.contains('inset-loaded')) {
                showArtboard(container);
                parentContainer.classList.add('inset-loaded');
            }
        }
    }

    // Change artboard on resize.
    function changeArtboards() {
        selectElements(".ai2html_export").forEach(showArtboard);
    }

    // Show artboard if it falls between min and max width
    function showArtboard(container) {
        const artboards = selectElements(".g-artboard[data-min-width]", container),
            width = Math.round(container.getBoundingClientRect().width),
            containerMinWidth = +container.getAttribute('data-min-width');

        // Set artboard visibility based on container width
        artboards.forEach(function (el) {
            var minwidth = el.getAttribute("data-min-width"),
                maxwidth = el.getAttribute("data-max-width");
            if (+minwidth === containerMinWidth)
                minwidth = 100;
            if (+minwidth <= width && (+maxwidth >= width || maxwidth === null)) {
                selectElements(".g-aiImg", el).forEach(addImgSrc);
                el.style.display = "block";
            } else {
                el.style.display = "none";
            }
        });
    }

    function selectElements(selector, parent) {
        let selection = (parent || document).querySelectorAll(selector);
        return Array.prototype.slice.call(selection);
    }

    // Lazy load image based on artboard..
    function addImgSrc(img) {
        const src = img.getAttribute("data-src");
        if (src && img.getAttribute("src") != src) {
            img.setAttribute("src", src);
        }
    }

    // based on underscore.js
    function throttle(func, wait) {
        var _now = Date.now || function () {
                return +new Date();
            },
            timeout = null,
            previous = 0;
        var run = function () {
            previous = _now();
            timeout = null;
            func();
        };
        return function () {
            var remaining = wait - (_now() - previous);
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                }
                run();
            } else if (!timeout) {
                timeout = setTimeout(run, remaining);
            }
        };
    }

    window.showInsets = showInsets;
} else {
    showInsets();
}
