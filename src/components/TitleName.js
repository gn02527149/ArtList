import React,{Component} from 'react'
import './TitleName.scss'

class TitleName extends Component {
    render(){
        const { sectionName , index } = this.props
        if(sectionName){
          return (
            <h3 className="titleName" id={`TitleName_${index}`}>
                {sectionName}
            </h3>
          )
        }
      }

}

export default TitleName