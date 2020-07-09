import React,{ Component } from 'react';
import NewsList from '../components/NewsTemplate';

class NewsContainer extends Component{
    render(){
        return(
            <div>
                <NewsList selecteItems = {this.props.selecteItems} />
            </div>
        )
    }
}

export default NewsContainer