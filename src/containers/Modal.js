import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addWorksection,sortWorksection } from '../actions'
import sortSrc from '../assets/images/switch_sort_2.svg'

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
    let Modal = document.getElementsByClassName('modal')
    modals.classList.remove("ModalBlock");
    for (var i = 0; i < Modal.length; i++) {
      Modal[i].classList.remove("ModalBlock");
    }
  }
  //移動
  dragStart(e) {
    this.dragged = e.currentTarget;
  }
  dragEnd(e) {
      const { sections } = this.props
      this.dragged.style.display = 'flex';

      e.currentTarget.classList.remove("drag-up");
      this.over.classList.remove("drag-up");

      e.currentTarget.classList.remove("drag-down");
      this.over.classList.remove("drag-down");
      
      var Data = sections.data;
      var from = Number(this.dragged.dataset.id);
      var to = Number(this.over.dataset.id);
      Data.splice(to, 0, Data.splice(from, 1)[0]);
      //set newIndex to judge direction of drag and drop
      Data = Data.map((doc, index)=> {
          doc.newIndex = index + 1;
          return doc;
      })
      this.props.sortWorksection(Data)
  }
  dragOver(e) {
      e.preventDefault();
      let EParent = e.target.parentElement
      this.dragged.style.display = "none";
      
      if (EParent.tagName !== "LI") {
          return;
      }

      //判断当前拖拽target 和 经过的target 的 newIndex

      const dgIndex = this.dragged.dataset.id;
      const taIndex = EParent.dataset.id;
      const animateName = dgIndex > taIndex ? "drag-up" : "drag-down";

      if (this.over && EParent.dataset.item !== this.over.dataset.item) {
        this.over.classList.remove("drag-up", "drag-down");
      }

      if(!EParent.classList.contains(animateName)) {
        EParent.classList.add(animateName);
        this.over = EParent;
      }
      
  }
  genTitleName=(info,index)=>{
    return (
      <li key={`titleName${info.sectionId}`} id={`titleName${info.sectionId}`}
      data-id={index}
      draggable='true'
      onDragEnd={this.dragEnd.bind(this)}
      onDragStart={this.dragStart.bind(this)}
      data-item={JSON.stringify(info)}>
        <span>{info.sectionName}</span>
        <span id={`sort_${info.sectionId}`} className={info.sortclassName}>
          <img src={sortSrc} />
        </span>
      </li>
    )
  }
  render(){
    const { sections } = this.props;
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
          <div className="modal sortSectionModal">
              <div className="title">排序畫面</div>
              <div className="content">
                  <div className="info">
                    <ul onDragOver={this.dragOver.bind(this)}>
                      {sections.data.map((info,index) =>this.genTitleName(info,index))}
                    </ul>
                  </div>
                  <div className="buttons">
                      {/* <div className="closeBtn" onClick={this._closeModal}>取消</div> */}
                      <div className="addBtn" onClick={this._closeModal}>確定</div>
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
    sortWorksection
  }, dispatch)
)(Modal);

