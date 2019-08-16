import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './ItemInfos.scss'

class ItemInfos extends Component {
  constructor() {
    super();
  }
  render(){
    const { type, name, serialNumber,explanation, fileName } = this.props
    return (
        <ul className="itemInfo fx1">
            <li className="fx1"><input type="text" defaultValue={type}></input></li>
            <li className="fx1"><textarea type="text" defaultValue={name}></textarea></li>
            <li className="fx3"><textarea type="text" defaultValue={explanation}></textarea></li>
            <li className="fx1"><input className="itemInfoFile" type="file" defaultValue={fileName}></input></li>
            <li className="fx1"><input type="text" defaultValue={serialNumber}></input></li>
        </ul>
    )
  }
}

export default connect(
  state => ({
    sections: state.sections
  })
  // dispatch => bindActionCreators({
  //     delList
  // }, dispatch)
)(ItemInfos);