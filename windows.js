const createWindow = (props) => {
    const {w, h, x, y} = props;

    const draw = () => {
        fill(220);
        if (mouseIntersects(w, h, x, y)) {
            fill("#F5F5D6");
        }
        rect(x, y, w, h);
    }
    return draw;
}

const createCursor = () => {
    const draw = () => {
        fill(100);
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