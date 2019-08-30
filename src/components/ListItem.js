import React, { Component, PropTypes } from 'react';
import ItemInfos from './ItemInfos'
import sortSrc from '../assets/images/switch_sort_2.svg'
import delSrc from '../assets/images/switch_deleteRow_2.svg'

import '../assets/styles/ListItem.scss'



class ListItem extends Component {
    constructor(props){
        super(props)
        this.state = {...props};
    }
    _addreferView(e) {
        let str = e.target.id
        let num = str.substr(str.length-1)
        
        if (e.target.files.length > 0) {
            let curFile = e.target.files[0];
            let reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('preview_img_'+num).setAttribute("src",e.target.result)
            };
            if (curFile) {
                reader.readAsDataURL(curFile);}
        }   
    }
    
    //移動
    dragStart(e) {
        this.dragged = e.currentTarget;
    }
    dragEnd(e) {
        const { _runTool } = this.props
        this.dragged.style.display = 'block';

        // console.log(e.currentTarget,this.over)

        e.target.classList.remove("drag-up");
        this.over.classList.remove("drag-up");

        e.target.classList.remove("drag-down");
        this.over.classList.remove("drag-down");
        

        var data = this.state.data;
        var from = Number(this.dragged.dataset.id);
        var to = Number(this.over.dataset.id);
        data.splice(to, 0, data.splice(from, 1)[0]);

        //set newIndex to judge direction of drag and drop
        data = data.map((doc, index)=> {
            doc.newIndex = index + 1;
            return doc;
        })
        _runTool(e.target.id,data)
    }
    dragOver(e) {
        
        e.preventDefault();

        this.dragged.style.display = "none";
        
        // if (e.target.tagName !== "LI") {
        //     return;
        // }

        //判断当前拖拽target 和 经过的target 的 newIndex

        const dgIndex = JSON.parse(this.dragged.dataset.info).newIndex;
        const taIndex = JSON.parse(e.target.dataset.info).newIndex;
        const animateName = dgIndex > taIndex ? "drag-up" : "drag-down";


        if (this.over && e.target.dataset.info !== this.over.dataset.info) {
            this.over.classList.remove("drag-up", "drag-down");
        }

        if(!e.target.classList.contains(animateName)) {
            e.target.classList.add(animateName);
            this.over = e.target;
        }
    }
    genItemInfos(info,index){
        const { sectionId,toolicon,disabled,_runTool } = this.props
        return (
            <div className="itemInfos" 
            data-id={index}
            key={`itemInfos_${sectionId}.${info.sectionInfoId}`} 
            id={`itemInfos_${sectionId}.${info.sectionInfoId}`} 
            draggable='true'
            onDragEnd={this.dragEnd.bind(this)}
            onDragStart={this.dragStart.bind(this)}
            data-item={JSON.stringify(info)}
            >
                <ItemInfos index={index} {...info} disabled={disabled}/>
                <div className={toolicon} id={`toolicon_${sectionId}.${info.sectionInfoId}`} onClick={_runTool}><img className="sortImg" src={sortSrc} /><img className="delImg" src={delSrc} /></div>
            </div>
            
        )
    }
    genIMGs(info,index){
        const { sectionId,imgs,toolicon,_runTool} = this.props
        let src = imgs[index]==0?"":imgs[index]
        return (
            <div key={`preview_img_${sectionId}.${index}`} id={`preview_imgBox_${sectionId}${index}`} className="preview_imgBox">
                <img id={`preview_img_${sectionId}.${index}`} src={src}/>
                <div className={toolicon} id={`toolicon_img_${sectionId}.${index}`} onClick={_runTool}><img className="delImg" src={delSrc} /></div>
            </div>
        )
    }
    
    render(){
        const { sectionId,infoItem,_addreferView,imgs,disabled } = this.props
        return (
            <div>
                <div className="itemInfoBox fx7" onDragOver={this.dragOver.bind(this)}>
                    {infoItem.map((info,index) =>this.genItemInfos(info,index))}
                </div>
                <div className="viewBox fx1">
                    <input id={`viewBoxInput_${sectionId}`} type="file" onChange={_addreferView} disabled={disabled} accept="image/*"></input>
                    <label htmlFor={`viewBoxInput_${sectionId}`}>
                        {imgs.map((info,index) =>this.genIMGs(info,index))}
                    </label>
                </div>
            </div>
        )
    }
}
  
export default ListItem;