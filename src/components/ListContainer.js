import React, { Component, PropTypes } from 'react';
import ListItem from './ListItem'
import '../assets/styles/ListContainer.scss'

class ListContainer extends Component {
    constructor(props){
        super(props)
    }
    render(){
        const { sections,sectionId,toolicon,disabled,_runTool,_addreferView,_getFile,draggable} = this.props;
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
                <div className="ListItem">
                    <ListItem sections={sections} sectionId={sectionId} toolicon={toolicon} disabled={disabled} _runTool={_runTool} _addreferView={_addreferView} _getFile={_getFile} draggable={draggable} />
                </div>
            </div>
        )
    }
}
  
export default ListContainer;
