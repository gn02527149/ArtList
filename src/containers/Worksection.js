import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addeditList,delWorksection,changeTools,deleditList,sorteditList,addreferView,delreferView } from '../actions'
import TitleName from '../components/TitleName'
import Typesetting from '../components/Typesetting'
import ListContainer from '../components/ListContainer'
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
  }
  _runTool=(e,data)=>{
    // console.log('_runTool',data)
    e.preventDefault();
    let tooltype = e.currentTarget.className.split("icon ")[0]
    if(e.currentTarget.id.split("_")[1] == "img"){
      let id = e.currentTarget.id.split("toolicon_img_")[1]
      this.props.delreferView(id)
    }else{
      // console.log('2',data)
      let id = e.currentTarget.id.split("toolicon_")[1]
      if(tooltype === "del"){
          this.props.deleditList(id)
      }else if(tooltype === "sort"){
          this.props.sorteditList(data)
          // console.log('sort',data)
      }
    }
  }
  _addreferView=(e)=>{
    e.preventDefault();
    let str = e.target.id
    let num = str.substr(str.length-1)
    
    if (e.target.files.length > 0) {
        let curFile = e.target.files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
          let src = e.target.result;   
          this.props.addreferView(num,src)
        };
        if (curFile) {
            reader.readAsDataURL(curFile);}
    }
    
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
          <div  className="delsection" id={`delsection_${info.sectionId}`} onClick={this._onDelsection}>刪除畫面</div>
        </div>
        <div className="Worksection">
          <div className="worktitle">
            <TitleName {...info} />
            <Typesetting {...info} />
          </div>
          <ListContainer {...info} _runTool={this._runTool} _addreferView={this._addreferView}/>
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
    changeTools,
    deleditList,
    sorteditList,
    addreferView,
    delreferView
  }, dispatch)
)(Worksection);
