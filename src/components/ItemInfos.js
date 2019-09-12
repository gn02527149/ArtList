import React, { Component, PropTypes } from 'react';
import '../assets/styles/ItemInfos.scss'

class ItemInfos extends Component {
  constructor() {
    super();
  }
  _getExplanationValue(e){
    let ExplanationValue = e.targer.value
    //未完成
  }
  _getTypeValue(e){
    let ExplanationValue = e.targer.value
    //未完成
  }
  render(){
    const { type, name , explanation, fileName,disabled,_getFile,sectionInfoId,index,sectionId } = this.props
    return (
      <ul className={`itemInfo fx1 ${disabled}`}>
          <li className="fx1">
            <select disabled={disabled} value={type} onChange={this._getTypeValue}>
                <option value="logo">LOGO</option>
                <option value="bg">背景圖</option>
                <option value="bar">面板(進度條)</option>
                <option value="panel">面板(彈窗背景)</option>
                <option value="btn_icon">圖示按鈕</option>
                <option value="btn">一般按鈕</option>
                <option value="icon">圖示</option>
                <option value="effect">特效</option>
                <option value="art_text">美術字</option>
                <option value="other">其他</option>
            </select>
          </li>
          <li className="fx1"><textarea type="text" defaultValue={name} disabled={disabled}></textarea></li>
          <li className="fx3"><textarea type="text" disabled={disabled} value={explanation} onChange={this._getExplanationValue}></textarea></li>
          <li className="fx1 itemFile">
            <input className="itemInfoFile" id={`itemInfoFile_${sectionId}.${sectionInfoId}`} type="file" onChange={_getFile} disabled={disabled} accept="image/*"></input>
            <label htmlFor={`itemInfoFile_${sectionId}.${sectionInfoId}`}>{fileName}</label>
          </li>
          <li className="fx1"><input type="text" defaultValue={index+1} disabled={disabled}></input></li>
      </ul>
    )
  }
}

export default ItemInfos;