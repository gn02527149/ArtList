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
          <input type="text" defaultValue={arrange}></input>
      </div>
    )
  }
}

export default Typesetting