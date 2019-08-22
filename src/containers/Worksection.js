import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addeditList,delWorksection,changeTools } from '../actions'
import TitleName from '../components/TitleName'
import Typesetting from '../components/Typesetting'
import ItemList from '../components/ItemList'
import editSrc from '../assets/images/switch_edit_2.svg'
import sortSrc from '../assets/images/switch_sort_2.svg'
import delSrc from '../assets/images/switch_deleteRow_2.svg'

import '../assets/styles/Worksection.scss'


class Worksection extends Component {
  constructor(props){
    super(props)
  }
  _onAddList=(e)=>{
    let id = e.target.id.split("appendrow_")[1]
    this.props.addeditList(id)
  }
  _onDelsection=(e)=>{
    let id = e.target.id.split("delsection_")[1]
    this.props.delWorksection(id)
  }
  _changeTools=(e)=>{
    e.preventDefault();
    let id = e.currentTarget.id.split("_")[2]
    let el = e.currentTarget.id.split("_")[1]
    this.props.changeTools(id,el)
    console.log(id,el);
  }
  genTitleName(info,index){
    return (
      <div key={`Worksection_${info.sectionId}`} id={`Worksection_${info.sectionId}`}>
        <hr />
        <div className="Toolbar">
          <div className="tools">
            <span id={`tool_edit_${index}`} onClick={this._changeTools} className={info.editclassName}><img src={editSrc} /></span>
            <span id={`tool_sort_${index}`} onClick={this._changeTools} className={info.sortclassName}><img src={sortSrc} /></span>
            <span id={`tool_del_${index}`} onClick={this._changeTools} className={info.delclassName}><img src={delSrc} /></span>
          </div>
          <div  className="appendrow" id={`appendrow_${index}`} onClick={this._onAddList}>新增一列</div>
          <div  className="sortpage">排序畫面</div>
          <div  className="delsection" id={`delsection_${info.sectionId}`}  onClick={this._onDelsection}>刪除畫面</div>
        </div>
        <div className="Worksection">
          <div className="worktitle">
            <TitleName {...info} />
            <Typesetting {...info} />
          </div>
          <ItemList {...info}/>
        </div>
      </div>
    )
  }
  render(){
    const { sections } = this.props;
    // console.log(sections);
    return (
      <div>
          {sections.data.map((info,index) =>this.genTitleName(info,index))}
      </div>
    )
  }
}

export default connect(
  state => ({
    sections: state.sections
  }),
  dispatch => bindActionCreators({
    addeditList,
    delWorksection,
    changeTools
  }, dispatch)
)(Worksection);
