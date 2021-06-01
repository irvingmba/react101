function updatePointChart(state, action){
    const {payload} = action;
    state.updPoint = [payload];
};

export default updatePointChart;