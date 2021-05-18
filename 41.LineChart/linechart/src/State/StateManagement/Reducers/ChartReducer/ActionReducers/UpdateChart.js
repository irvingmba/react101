function updateChart(state, action) {
  const { payload } = action;
  return { ...state, ...payload };
}

export default updateChart;
