import React, { Component, PropTypes } from 'react';
import ItemListInfo from './ItemListInfo'
import './ItemList.scss'

class ItemList extends Component {
    constructor(props){
        super(props)
    }
    genItemListInfo(info,index){
        return (
            <div className="ItemListInfo" key={`ItemListInfo_${info.sectionId}${index}`} id={`ItemListInfo_${info.sectionId}${index}`}>
                <ItemListInfo index={index} {...info} />
            </div>
        )
    }
    render(){
        const { sectionInfo } = this.props;
        return (
            <div className="ItemList">
                <div className="title">
                    <ul>
                        <li className="fx1">類型</li>
                        <li className="fx1">文案</li>
                        <li className="fx3">說明</li>
                        <li className="fx1">檔名(?.png)</li>
                        <li className="fx1">參考點</li>
                        <li className="fx3">參考畫面</li>
                    </ul>
                </div>
                {sectionInfo.map((info,index) =>this.genItemListInfo(info,index))}
            </div>
        )
    }
}
  
export default ItemList;
