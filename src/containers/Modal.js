import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addWorksection } from '../actions'

import '../assets/styles/Modal.scss'

class Modal extends Component {
  constructor(props){
    super(props)
    // this.inputNewName = React.createRef();
  }
  _onAdd=()=>{
    this.props.addWorksection(this.refs.inputNewName.value)
    this._closeModal()
    this.refs.inputNewName.value=""
  }
  _closeModal=()=>{
    let modals = document.getElementsByClassName('modals')[0]
    let addSectionModal = document.getElementsByClassName('addSectionModal')[0]
    modals.classList.remove("ModalBlock");
    addSectionModal.classList.remove("ModalBlock");
  }
  render(){
    // const { sectionName } = this.props
    return (
        <div className="modals">
            <div className="modal addSectionModal">
                <div className="title">新增畫面</div>
                <div className="content">
                    <div className="info">
                      <span>畫面名稱</span>
                      <input type="text" defaultValue="" ref="inputNewName"></input>
                    </div>
                    <div className="buttons">
                        <div className="closeBtn" onClick={this._closeModal}>取消</div>
                        <div className="addBtn" onClick={this._onAdd}>確定</div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
}

export default connect(
  state => ({
    sections: state.sections
  }),
  dispatch => bindActionCreators({
    addWorksection,
  }, dispatch)
)(Modal);

