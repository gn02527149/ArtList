import React,{Component} from 'react'
import '../assets/styles/Typesetting.scss'

class Typesetting extends Component {
  constructor(props) {
    super(props);
}
  render(){
    const { arrange , index } = this.props
    return (
      <div className="typesetting" id={`typesetting_${index}`}>
          <div className="item">排版需求</div>
          <select defaultValue={arrange}>
              <option value="nochange">請勿變動</option>
              <option value="artDecision">美術決定</option>
              <option value="reformat">重新排版</option>
          </select>
      </div>
    )
  }
}

export default Typesetting