import React, { Component } from 'react';
import style from './App.scss';
import className from 'classnames';
import * as api from '../src/lib/api';
import NewsContainer from '../src/containers/NewsContainer'

const ex = className.bind(style);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selecteItems : [] 
    };
  }

  componentDidMount() {
    api.getApi()
    .then(res =>this.setState({
      selecteItems : res.data.items
    }))
  }

  
  render() {
    return (
      <div className={ex('content')}>
          <NewsContainer selecteItems = {this.state.selecteItems}/>
      </div>
    )
  }
}

export default App;
