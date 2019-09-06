import React, { Component, PropTypes } from 'react';
import ItemInfos from './ItemInfos'
import ViewBox from './ViewBox'
import sortSrc from '../assets/images/switch_sort_2.svg'
import delSrc from '../assets/images/switch_deleteRow_2.svg'
import '../assets/styles/ListItem.scss'

class ListItem extends Component {
    constructor(props){
        super(props)
        this.state = {...props};
    }
    //移動
    dragStart(e) {
        this.dragged = e.currentTarget;
    }
    dragEnd(e) {
        const { _runTool,infoItem } = this.props
        this.dragged.style.display = 'block';

        e.currentTarget.classList.remove("drag-up");
        this.over.classList.remove("drag-up");

        e.currentTarget.classList.remove("drag-down");
        this.over.classList.remove("drag-down");
        
        var data = infoItem;
        var from = Number(this.dragged.dataset.id);
        var to = Number(this.over.dataset.id);
        data.splice(to, 0, data.splice(from, 1)[0]);

        //set newIndex to judge direction of drag and drop
        data = data.map((doc, index)=> {
            doc.newIndex = index + 1;
            return doc;
        })
        let PID = this.dragged.id.split("itemInfos_")[1].split(".")[0]
        _runTool(e,data,PID)
    }
    dragOver(e) {
        e.preventDefault();

        let EParent = e.target.parentElement.parentElement.parentElement
    
        this.dragged.style.display = "none";
        
        if (EParent.className !== "itemInfos") {
            return;
        }
        
        //判断当前拖拽target 和 经过的target 的 newIndex
    
        const dgIndex = this.dragged.dataset.id;
        const taIndex = EParent.dataset.id;
        const animateName = dgIndex > taIndex ? "drag-up" : "drag-down";

        if (this.over && EParent.dataset.item !== this.over.dataset.item) {
          this.over.classList.remove("drag-up", "drag-down");
        }

        if(!EParent.classList.contains(animateName)) {
          EParent.classList.add(animateName);
          this.over = EParent;
        }
    }
    genItemInfos(info, index){
        const { sectionId, toolicon, disabled, _runTool, _getFile, draggable } = this.props
        return (
            <div className="itemInfos" 
            data-id={index}
            key={`itemInfos_${sectionId}.${info.sectionInfoId}`} 
            id={`itemInfos_${sectionId}.${info.sectionInfoId}`} 
            draggable={draggable}
            onDragEnd={this.dragEnd.bind(this)}
            onDragStart={this.dragStart.bind(this)}
            data-item={JSON.stringify(info)}>
                <ItemInfos index={index} {...info} disabled={disabled} _getFile={_getFile} sectionId={sectionId}/>
                <div className={toolicon} id={`toolicon_${sectionId}.${info.sectionInfoId}`} onClick={_runTool}><img className="sortImg" src={sortSrc} /><img className="delImg" src={delSrc} /></div>
            </div>
            
        )
    }
    render(){
        const { sectionId, infoItem, _addreferView, imgs, disabled, toolicon, _runTool } = this.props
        return (
            <div>
                <div className="itemInfoBox fx7" onDragOver={this.dragOver.bind(this)}>
                    {infoItem.map((info,index) =>this.genItemInfos(info,index))}
                </div>
                <ViewBox sectionId={sectionId} _addreferView={_addreferView} imgs={imgs} disabled={disabled} toolicon={toolicon} _runTool={_runTool}/>
            </div>
        )
    }
}

export default ListItem