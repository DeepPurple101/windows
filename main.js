let draggedWindow = null;
let cursor;

function setup() {
  console.log("setup");
  createCanvas(700, 500);
  noStroke();
  cursor = createCursor();
}

function draw() {
  background(240);

  fill(0);
  text("Press space to add windows, press backspace to remove them", 10, 20);
  strokeWeight(1);

  let hoveredIndex = -1;
  if (draggedWindow === null) {
    for (let i = ui.length - 1; i >= 0; i--) {
      const { w, h, x, y } = ui[i].props;
      if (mouseIntersects(w, h, x, y)) {
        hoveredIndex = i;
        break;
      }
    }
  }

  for (let i = 0; i < ui.length; i++) {
    if (draggedWindow !== null) {
      if (draggedWindow[0] === ui[i]) continue;
    }
    ui[i].draw(hoveredIndex === i);
  }

  if (draggedWindow !== null) {
    const props = draggedWindow[0].props;
    const newWindow = createWindow({
      w: props.w,
      h: props.h,
      x: mouseX - draggedWindow[1][0],
      y: mouseY - draggedWindow[1][1],
      content: props.content,
    });
    newWindow.draw(true);
  }

  cursor();
}

function mouseClicked() {
  console.log(`${mouseX} ${mouseY}`);
}

function mousePressed() {
  for (let i = ui.length - 1; i >= 0; i--) {
    const window = ui[i];
    const props = window.props;
    if (mouseIntersects(props.w, props.h, props.x, props.y)) {
      const distXY = getDistXY(props.x, props.y);
      draggedWindow = [window, distXY];
      break;
    }
  }
}

function mouseReleased() {
  if (draggedWindow === null) return;
  ui = ui.filter((window) => window.props !== draggedWindow[0].props);
  const props = draggedWindow[0].props;
  const newWindow = createWindow({
    w: props.w,
    h: props.h,
    x: mouseX - draggedWindow[1][0],
    y: mouseY - draggedWindow[1][1],
    content: props.content,
  });
  ui = [...ui, newWindow];
  draggedWindow = null;
}

function keyPressed() {
  if (keyCode === 32) {
    ui = [
      ...ui,
      createWindow({
        w: 200,
        h: 100,
        x: mouseX,
        y: mouseY,
        content: (props) => {
          const { ww, wh, wx, wy } = props;
          return [createHeaderBar({ ww: ww, wx: wx, wy: wy })];
        },
      }),
    ];
  }
  if (keyCode === 8) {
    if (ui.length > 0) {
      for (let i = ui.length - 1; i >= 0; i--) {
        const props = ui[i].props;
        if (mouseIntersects(props.w, props.h, props.x, props.y)) {
          ui = ui.filter((item) => item.props !== props);
          break;
        }
      }
    }
  }
  if (keyCode === 67) {
    ui = [];
  }
}
