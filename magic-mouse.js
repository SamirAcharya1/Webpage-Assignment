let start = new Date().getTime();

const originPosition = { x: 0, y: 0 };

const last = {
    starTimestamp: start,
    starPosition: originPosition,
    mousePosition: originPosition
};

const config = {
    glowDuration: 75,
    maximumGlowPointSpacing: 10,
};

const px = value => `${value}px`;

const calcDistance = (a, b) => {
    const diffX = b.x - a.x,
        diffY = b.y - a.y;

    return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
};

const appendElement = element => document.body.appendChild(element);

const removeElement = (element, delay) => setTimeout(() => document.body.removeChild(element), delay);

const createGlowPoint = position => {
    const glow = document.createElement("div");

    glow.className = "glow-point";

    glow.style.left = px(position.x);
    glow.style.top = px(position.y);

    appendElement(glow);

    removeElement(glow, config.glowDuration);
};

const determinePointQuantity = distance => Math.max(
    Math.floor(distance / config.maximumGlowPointSpacing),
    1
);

const createGlow = (last, current) => {
    const distance = calcDistance(last, current),
        quantity = determinePointQuantity(distance);

    const dx = (current.x - last.x) / quantity,
        dy = (current.y - last.y) / quantity;

    Array.from(Array(quantity)).forEach((_, index) => {
        const x = last.x + dx * index,
            y = last.y + dy * index;

        createGlowPoint({ x, y });
    });
};

const updateLastMousePosition = position => last.mousePosition = position;

const adjustLastMousePosition = position => {
    if (last.mousePosition.x === 0 && last.mousePosition.y === 0) {
        last.mousePosition = position;
    }
};

const handleOnMove = e => {
    const mousePosition = { x: e.clientX, y: e.clientY };

    adjustLastMousePosition(mousePosition);

    createGlow(last.mousePosition, mousePosition);

    updateLastMousePosition(mousePosition);
};

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

document.body.onmouseleave = () => updateLastMousePosition(originPosition);
