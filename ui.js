let ui = [
  createWindow({
    w: 200,
    h: 100,
    x: 50,
    y: 50,
    content: (props) => {
        const {ww, wh, wx, wy} = props;

        return [
            createHeaderBar({ ww: ww, wx: wx, wy: wy}),
        ];
    }
  }),
  createWindow({
    w: 200,
    h: 100,
    x: 100,
    y: 100,
    content: (props) => {
        const {ww, wh, wx, wy} = props;

        return [
            createHeaderBar({ ww: ww, wx: wx, wy: wy}),
        ];
    }
  }),
];

console.log(ui);
