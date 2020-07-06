import React,{ Component } from 'react';
import style  from './App.scss';
import className from 'classnames';

const ex = className.bind(style);

class App extends Component {
  render(){
    return(
      <div className={ex('content')}>
        ㅎㅇㅎㅇ
      </div>
    )
  }
}

export default App;
