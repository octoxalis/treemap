const {
  sumReducer,
  getMaximum,
  getMinimum,
  roundValue,
  validateArguments,
} = require('./helpers');

exports.getTreemap = function getTreemap({ data, width, height }) {
  function worstRatio(row, width) {
    const sum = row.reduce(sumReducer, 0);
    const rowMax = getMaximum(row);
    const rowMin = getMinimum(row);
    return Math.max(((width ** 2) * rowMax) / (sum ** 2), (sum ** 2) / ((width ** 2) * rowMin));
  }

  const getMinWidth = () => {
    if (TREE_o.rectangle_o.totalHeight ** 2 > TREE_o.rectangle_o.totalWidth ** 2) {
      return { value: TREE_o.rectangle_o.totalWidth, vertical: false };
    }
    return { value: TREE_o.rectangle_o.totalHeight, vertical: true };
  };

  const layoutRow = (row, width, vertical) => {
    const rowHeight = row.reduce(sumReducer, 0) / width;

    row.forEach((rowItem) => {
      const rowWidth = rowItem / rowHeight;
      const { xBeginning } = TREE_o.rectangle_o;
      const { yBeginning } = TREE_o.rectangle_o;

      let data;
      if (vertical) {
        data = {
          x: xBeginning,
          y: yBeginning,
          width: rowHeight,
          height: rowWidth,
          data: TREE_o.initialData[TREE_o.rectangle_o.data.length],
        };
        TREE_o.rectangle_o.yBeginning += rowWidth;
      } else {
        data = {
          x: xBeginning,
          y: yBeginning,
          width: rowWidth,
          height: rowHeight,
          data: TREE_o.initialData[TREE_o.rectangle_o.data.length],
        };
        TREE_o.rectangle_o.xBeginning += rowWidth;
      }

      TREE_o.rectangle_o.data.push(data);
    });

    if (vertical) {
      TREE_o.rectangle_o.xBeginning += rowHeight;
      TREE_o.rectangle_o.yBeginning -= width;
      TREE_o.rectangle_o.totalWidth -= rowHeight;
    } else {
      TREE_o.rectangle_o.xBeginning -= width;
      TREE_o.rectangle_o.yBeginning += rowHeight;
      TREE_o.rectangle_o.totalHeight -= rowHeight;
    }
  };

  const layoutLastRow = (rows, children, width) => {
    const { vertical } = getMinWidth();
    layoutRow(rows, width, vertical);
    layoutRow(children, width, vertical);
  };

  const squarify = (children, row, width) => {
    if (children.length === 1) {
      return layoutLastRow(row, children, width);
    }

    const rowWithChild = [...row, children[0]];

    if (row.length === 0 || worstRatio(row, width) >= worstRatio(rowWithChild, width)) {
      children.shift();
      return squarify(children, rowWithChild, width);
    }
    layoutRow(row, width, getMinWidth().vertical);
    return squarify(children, [], getMinWidth().value);
  };

  //XX validateArguments({ data, width, height });
  TREE_o.rectangle_o = {
    data: [],
    xBeginning: 0,
    yBeginning: 0,
    totalWidth: width,
    totalHeight: height,
  };
  TREE_o.initialData = data;
  const totalValue = data.map((dataPoint) => dataPoint.value).reduce(sumReducer, 0);
  const dataScaled = data.map((dataPoint) => (dataPoint.value * height * width) / totalValue);

  squarify(dataScaled, [], getMinWidth().value);
  return TREE_o.rectangle_o.data.map((dataPoint) => ({
    ...dataPoint,
    x: roundValue(dataPoint.x),
    y: roundValue(dataPoint.y),
    width: roundValue(dataPoint.width),
    height: roundValue(dataPoint.height),
  }));
};
