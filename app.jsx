import React, { useState,useEffect }from "react";
import Child from './src/child.jsx'
import './app.less';


class App extends React.Component {
    componentDidMount() {
      }

  render() {
    return (<div>
        <Child />
    </div>
    );
  }
}
export default App;

// function Counter(){
//     const [number,setNumber] = useState(0);

//     // useEffect里面的这个函数会在第一次渲染之后和更新完成后执行
//     // 相当于 componentDidMount 和 componentDidUpdate:
//     let mutable;

//     useEffect(() => {
//         document.title = `你点击了${number}次`;
//     });


//     return (
//         <div id="ddd">
//             <p>{number}</p>
//             <button onClick={()=>setNumber(number+1)}>+</button>
//             <Child />
//         </div>
//     );
// }


// export default Counter;