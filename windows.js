const createWindow = (props) => {
    const {w, h, x, y, content} = props;

    const draw = (isHovered = false, showHeader = true) => {
        fill(220);
        stroke(100);
        rect(x, y, w, h);
        const children = content({ww: w, wh: h, wx: x, wy: y});
        for (let i = 0; i < children.length; i++) {
            children[i](isHovered);
        }
    }

    return {
        props: props,
        draw: draw,
    };
}

const createHeaderBar = (props) => {
    const {ww, wx, wy} = props;

    const draw = (isHovered = false) => {
        fill(100);
        stroke(100);
        if (isHovered) {
            if (mouseIntersects(ww, 20, wx, wy)) {
                fill(120);
            }
        }
        rect(wx, wy, ww, 20);
    }
    return draw;
}

const createCursor = () => {
    const draw = () => {
        fill(255, 0, 0);
        noStroke();
        ellipse(mouseX, mouseY, 10);
    }
    return draw;
}

const mouseIntersects = (w, h, x, y) => {
    distXY = getDistXY(x, y);
    const isInX = (distXY[0] <= w) && (distXY[0] >= 0);
    const isInY = (distXY[1] <= h) && (distXY[1] >= 0);
    const intersects = isInX && isInY;
    return intersects;
}

const getDistXY = (x, y) => {
    const distX = mouseX - x;
    const distY = mouseY - y;
    return [distX, distY];
}