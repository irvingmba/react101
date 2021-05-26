export const page1 = new Array(10).fill(1).map((val, index) => ({
  src: `https://picsum.photos/400?random=${index + 1}`,
  width: 400,
  height: 400,
}));

export const page2 = new Array(10).fill(1).map((val, index) => ({
  src: `https://picsum.photos/300/600?random=${index + 1}`,
  width: 300,
  height: 600,
}));

export const page3 = new Array(10).fill(1).map((val, index) => ({
  src: `https://picsum.photos/600/300?random=${index + 1}`,
  width: 600,
  height: 300,
}));

export const page4 = new Array(10).fill(1).map((val, index) => {
  const rdmNum = Math.floor(Math.random() * 10);
  return {
    src:
      rdmNum > 6
        ? `https://picsum.photos/600/300?random=${index + 1}`
        : rdmNum < 4
        ? `https://picsum.photos/300/600?random=${index + 1}`
        : `https://picsum.photos/400?random=${index + 1}`,
    width: rdmNum > 6 ? 600 : rdmNum < 4 ? 300 : 400,
    height: rdmNum > 6 ? 300 : rdmNum < 4 ? 600 : 400,
  };
});
