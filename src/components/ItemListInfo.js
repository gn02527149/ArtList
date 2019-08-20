import React, { Component, PropTypes } from 'react';
import ItemInfos from './ItemInfos'
import './ItemListInfo.scss'


class ItemListInfo extends Component {
    constructor(props){
        super(props)
    }
    handleFileChange(e) {
        let str = e.target.id
        let num = str.substr(str.length-4)
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
        return (
            <div className="itemInfos" key={`itemInfos_${info.sectionInfoId}${index}`} id={`itemInfos_${info.sectionInfoId}${index}`}>
                <ItemInfos index={index} {...info}/>
            </div>
            
        )
    }
    render(){
        const { infoItem , index } = this.props
        return (
            <div>
                <div className="itemInfoBox fx7">
                    {infoItem.map((info,index) =>this.genItemInfos(info,index))}
                </div>
                <div className="viewBox fx1">
                    <input id={`viewBoxInput_${index}`} type="file" onChange={this.handleFileChange}></input>
                    <label htmlFor={`viewBoxInput_${index}`}>
                        <img id={`preview_img_${index}`} src=""/>
                    </label>
                </div>
            </div>
        )
    }
}
  
export default ItemListInfo;