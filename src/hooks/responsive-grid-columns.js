import UseWindowDimensions from "./get-window-dimensions"

export default function ResponsiveGridColumns(maxCols, numItems, breakpoints) {
    const {height, width} = UseWindowDimensions();

    if(breakpoints.length === (maxCols - 1)) {
      breakpoints.sort(function(a, b){return b-a});
      var decrement = 0;
      var i = ((numItems < maxCols) ? (maxCols - numItems) : 0);
      while(i < breakpoints.length && width <= breakpoints[i]) {
        //console.log(`Width ${width} Breakpoint ${breakpoints[i]}: ${width <= breakpoints[i]}`)
        decrement++;
        i++;
      }
      
      return ((numItems < maxCols) ? numItems : maxCols) - decrement;
    }
    else {
      return ((numItems < maxCols) ? numItems : maxCols);
    }
}