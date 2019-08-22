import React, { Component, PropTypes } from 'react';
import ItemInfos from './ItemInfos'
import sortSrc from '../assets/images/switch_sort_2.svg'
import delSrc from '../assets/images/switch_deleteRow_2.svg'

import './ItemListInfo.scss'



class ItemListInfo extends Component {
    constructor(props){
        super(props)
    }
    handleFileChange(e) {
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
        const { sectionId } = this.props
        return (
            <div className="itemInfos" key={`itemInfos_${sectionId}${index}`} id={`itemInfos_${sectionId}${index}`}>
                <ItemInfos index={index} {...info}/>
                <div className="toolicon sorticon"><img src={sortSrc} /></div>
                {/* <div className="toolicon delicon"><img src={delSrc} /></div> */}
            </div>
            
        )
    }
    render(){
        const { sectionId,infoItem } = this.props
        return (
            <div>
                <div className="itemInfoBox fx7">
                    {infoItem.map((info,index) =>this.genItemInfos(info,index))}
                </div>
                <div className="viewBox fx1">
                    <input id={`viewBoxInput_${sectionId}`} type="file" onChange={this.handleFileChange}></input>
                    <label htmlFor={`viewBoxInput_${sectionId}`}>
                        <img id={`preview_img_${sectionId}`} src=""/>
                    </label>
                </div>
            </div>
        )
    }
}
  
export default ItemListInfo;