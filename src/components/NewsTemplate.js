import React, { Component } from 'react';
import style from './NewsTemplate.scss';
import className from 'classnames';

const ex = className.bind(style);

class NewsList extends Component {
    render() {
        return (
            <div className={ex('NewsContent')}>
                <div className={ex('NewsTitle')}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSRd3WveWO6Tr6tXKOGC-0YZC-o0-JQHmMRUQ&usqp=CAU" />
                    <h3>코로나 실시간 뉴스 상황</h3>
                </div>
                <div className={ex('NewList')}>
                    {this.props.selecteItems.map((item, ind) => (
                        <div className={ex('NewsItem')} key={ind}>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSgluiY1ONk7_W7wbjOahGd1_gyQo8kiOHS7A&usqp=CAU"/>
                            <div className={ex('NewsItem-title')}>
                                <h3>{item.title}</h3>
                               <span>{item.pubDate}</span>
                                <div className={ex('NewsItem-description')}>
                                    <p>{item.description}</p>
                                </div>
                                <div className={ex('NewsItem-originallink')}>
                                    <h4>제공 언론사</h4>
                                    <a href ={item.originallink}>{item.originallink}</a>
                                </div>
                                <div className={ex('NewsItem-link')}>
                                    <h4>제공 네이버</h4>
                                    <a href ={item.link}>{item.link}</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default NewsList;