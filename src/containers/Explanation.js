import React,{Component} from 'react'
import '../assets/styles/Explanation.scss'

class Explanation extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="explanation">
                <div className="title">
                    <ul>
                        <li className="fx3">整體說明</li>
                        <li className="fx3">風格/色調</li>
                        <li className="fx1">沿用原遊戲風格</li>
                        <li className="fx2">語系</li>
                        <li className="fx1">幣值</li>
                        <li className="fx1">相關連結</li>
                    </ul>
                </div>
                <div className="info">
                    <ul>
                        <li className="fx3"><textarea type="text" defaultValue="把遊戲畫面裡綠綠的地板換掉,改一個不錯看的文字,將按鈕加入美術字"></textarea></li>
                        <li className="fx3"><textarea type="text" defaultValue=""></textarea></li>
                        <li className="fx1">
                            <select>
                                <option value="yes">是</option>
                                <option value="no">否</option>
                            </select>
                        </li>
                        <li className="fx2">
                            <select>
                                <option value="chinese-sim">簡中</option>
                                <option value="english">英文</option>
                                <option value="chinese-trad">繁中</option>
                                <option value="japanese">日文</option>
                            </select>
                        </li>
                        <li className="fx1">
                            <select>
                                <option value="ad">廣告</option>
                                <option value="free">免費</option>
                                <option value="gbp">GBP</option>
                                <option value="myr">MYR</option>
                                <option value="php">PHP</option>
                                <option value="hkd">HKD</option>
                                <option value="cad">CAD</option>
                                <option value="twd">TWD</option>
                                <option value="usd">USD</option>
                                <option value="jpy">JPY</option>
                            </select>
                        </li>
                        <li className="fx1"><input type="text" defaultValue="相關連結"></input></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Explanation