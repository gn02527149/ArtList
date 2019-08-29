import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addWorksection } from '../actions'

import '../assets/styles/Modal.scss'

class Modal extends Component {
  constructor(props){
    super(props)
  }
  _onAdd=()=>{
    let value = this.refs.inputNewName.value
    if(value){
      this.props.addWorksection(value);
      this._closeModal();
      this.refs.inputNewName.value="";
      document.getElementsByClassName('info')[1].classList.remove("caveat");
      document.getElementsByClassName('viewName')[0].classList.remove("caveat");
    }else{
      document.getElementsByClassName('info')[1].classList.add("caveat");
      document.getElementsByClassName('viewName')[0].classList.add("caveat");
      return false
    }
  }
  _closeModal=()=>{
    let modals = document.getElementsByClassName('modals')[0]
    let addSectionModal = document.getElementsByClassName('addSectionModal')[0]
    modals.classList.remove("ModalBlock");
    addSectionModal.classList.remove("ModalBlock");
  }
  render(){
    return (
        <div className="modals">
            <div className="modal addSectionModal">
                <div className="title">新增畫面</div>
                <div className="content">
                    <div className="info">
                      <span>畫面名稱</span>
                      <input type="text" className="viewName" defaultValue="" ref="inputNewName"></input>
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

