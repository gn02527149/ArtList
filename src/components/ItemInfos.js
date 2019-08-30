import React, { Component, PropTypes } from 'react';
import '../assets/styles/ItemInfos.scss'

class ItemInfos extends Component {
  constructor() {
    super();
  }
  render(){
    const { type, name, serialNumber,explanation, fileName,disabled} = this.props
    return (
        <ul className="itemInfo fx1">
            <li className="fx1"><input type="text" defaultValue={type} disabled={disabled}></input></li>
            <li className="fx1"><textarea type="text" defaultValue={name} disabled={disabled}></textarea></li>
            <li className="fx3"><textarea type="text" defaultValue={explanation} disabled={disabled}></textarea></li>
            <li className="fx1"><input className="itemInfoFile" type="file" defaultValue={fileName} disabled={disabled} accept="image/*"></input></li>
            <li className="fx1"><input type="text" defaultValue={serialNumber} disabled={disabled}></input></li>
        </ul>
    )
  }
}

export default ItemInfos;