document.addEventListener("DOMContentLoaded", function () {
    const elements = Array.from(document.querySelectorAll("h2[data-count]"));
    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach((entry) => {
                if (entry.intersectionRatio >= 0.5) {
                    const index = elements.indexOf(entry.target);
                    const delay = index * 250;
                    setTimeout(() => startCounter(entry.target), delay);
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.5
        }
    );
    elements.forEach((element) => observer.observe(element));

    function startCounter(element) {
        const target = parseInt(element.getAttribute("data-count"));
        const additionalData = element.getAttribute("additional-data") || "";
        const totalFrames = 480;
        let frame = 0;

        function easeOut(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        }

        function counter() {
            if (frame >= totalFrames) {
                element.textContent = target + additionalData;
                return;
            }
            frame++;
            const easedValue = easeOut(frame, 0, target, totalFrames);
            element.textContent = Math.floor(easedValue) + additionalData;
            requestAnimationFrame(counter);
        }
        counter();
    }
});
