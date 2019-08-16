import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TitleName from '../components/TitleName'
import Typesetting from '../components/Typesetting'
import ItemList from '../components/ItemList'

import '../assets/styles/Worksection.scss'


class Worksection extends Component {
  constructor(props){
    super(props)
  }
  genTitleName(info,index){
    return (
      <div className="Worksection" key={`Worksection_${index}`} id={`Worksection_${index}`}>
        <div className="worktitle">
          <TitleName {...info} />
          <Typesetting {...info} />
        </div>
        <ItemList {...info} />
      </div>
    )
  }
  render(){
    const { sections } = this.props;
    return (
      <div>
          {sections.map((info,index) =>this.genTitleName(info,index))}
      </div>
    )
  }
}

export default connect(
  state => ({
    sections: state.sections
  }),
  // dispatch => bindActionCreators({
  //     delList
  // }, dispatch)
)(Worksection);
