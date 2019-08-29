import React, { Component, PropTypes } from 'react';
import ItemInfos from './ItemInfos'
import sortSrc from '../assets/images/switch_sort_2.svg'
import delSrc from '../assets/images/switch_deleteRow_2.svg'

import '../assets/styles/ItemListInfo.scss'



class ItemListInfo extends Component {
    constructor(props){
        super(props)
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
    genItemInfos(info,index){
        const { sectionId,toolicon,disabled,_runTool } = this.props
        return (
            <div className="itemInfos" 
            key={`itemInfos_${sectionId}.${info.sectionInfoId}`} 
            id={`itemInfos_${sectionId}.${info.sectionInfoId}`} 
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
            <div key={`preview_img_${sectionId}${index}`} id={`preview_imgBox_${sectionId}${index}`} className="preview_imgBox">
                <img id={`preview_img_${sectionId}${index}`} src={src}/>
                <div className={toolicon} id={`toolicon_${sectionId}.${index}`} onClick={_runTool}><img className="delImg" src={delSrc} /></div>
            </div>
        )
    }
    render(){
        const { sectionId,infoItem,_addreferView,imgs } = this.props
        return (
            <div>
                <div className="itemInfoBox fx7">
                    {infoItem.map((info,index) =>this.genItemInfos(info,index))}
                </div>
                <div className="viewBox fx1">
                    <input id={`viewBoxInput_${sectionId}`} type="file" onChange={_addreferView}></input>
                    <label htmlFor={`viewBoxInput_${sectionId}`}>
                        {imgs.map((info,index) =>this.genIMGs(info,index))}
                    </label>
                </div>
            </div>
        )
    }
}
  
export default ItemListInfo;