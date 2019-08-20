import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addeditList } from '../actions'
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
  genTitleName(info,index){
    return (
      <div key={`Worksection_${index}`}>
        <hr />
        <div className="Toolbar">
          <div className="tools">
            <span className="edit select"><img src={editSrc} /></span>
            <span className="sort"><img src={sortSrc} /></span>
            <span className="del"><img src={delSrc} /></span>
          </div>
          <div  className="appendrow" id={`appendrow_${index}`} onClick={this._onAddList}>新增一列</div>
          <div  className="sortpage">排序畫面</div>
          <div  className="delsection">刪除畫面</div>
        </div>
        <div className="Worksection" id={`Worksection_${index}`}>
          <div className="worktitle">
            <TitleName {...info} />
            <Typesetting {...info} />
          </div>
          <ItemList {...info} />
        </div>
      </div>
    )
  }
  render(){
    const { sections } = this.props;
    console.log(sections);
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
    addeditList
  }, dispatch)
)(Worksection);
