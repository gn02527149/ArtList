import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addWorksection } from '../actions'

import '../assets/styles/Worksection.scss'

class Appendview extends Component {
  constructor(props){
    super(props)
  }
  _openModal=()=>{
    let modals = document.getElementsByClassName('modals')[0]
    let addSectionModal = document.getElementsByClassName('addSectionModal')[0]
    modals.classList.add("ModalBlock");
    addSectionModal.classList.add("ModalBlock");
  }
  render(){
    return (
        <div className="appendview">
            <hr />
            <div className="appendSection" onClick={this._openModal}>新增畫面</div>
            <hr />
        </div>
    )
  }
}

export default connect(
  state => ({
    sections: state.sections
  }),
  dispatch => bindActionCreators({
    addWorksection
  }, dispatch)
)(Appendview);
