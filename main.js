let windows = [];
let draggedWindow = null;
let cursor;

function setup() {
  console.log("setup");
  createCanvas(700, 500);
  noStroke();
  cursor = createCursor();
  windows = [{ w: 200, h: 100, x: 50, y: 50 }];
}

function draw() {
  background(240);

  fill(0);
  text("Press space to add windows, press backspace to remove them", 10, 20);

  // Windows go here
  stroke(100);
  strokeWeight(1);

  for (let i = windows.length - 1; i >= 0; i--) {
    if (draggedWindow !== null) {
      if (draggedWindow[0] === windows[i]) {
        continue;
      }
    }

    const window = createWindow(windows[i]);
    window();
  }

  if (draggedWindow !== null) {
    const window = createWindow({
      w: 200,
      h: 100,
      x: mouseX - draggedWindow[1][0],
      y: mouseY - draggedWindow[1][1],
    });
    window();
  }

  cursor();
}

function mouseClicked() {
  console.log(`${mouseX} ${mouseY}`);
}

function mousePressed() {
  for (let i = 0; i < windows.length; i++) {
    const window = windows[i];
    if (mouseIntersects(window.w, window.h, window.x, window.y)) {
      const distXY = getDistXY(window.x, window.y);
      draggedWindow = [window, distXY];
      break;
    }
  }
}

function mouseReleased() {
  if (draggedWindow === null) return;
  windows = windows.filter((window) => window !== draggedWindow[0]);
  windows = [
    {
      w: draggedWindow[0].w,
      h: draggedWindow[0].h,
      x: mouseX - draggedWindow[1][0],
      y: mouseY - draggedWindow[1][1],
    },
    ...windows,
  ];
  draggedWindow = null;
}

function keyPressed() {
  if (keyCode === 32) {
    windows = [{ w: 200, h: 100, x: mouseX, y: mouseY }, ...windows];
  }
  if (keyCode === 8) {
    if (windows.length > 0) {
      for (let i = 0; i < windows.length; i++) {
        const window = windows[i];
        if (mouseIntersects(window.w, window.h, window.x, window.y)) {
          windows = windows.filter((item) => item !== window);
          break;
        }
      }
    }
  }
  if (keyCode === 67) {
      windows = [];
  }
}
