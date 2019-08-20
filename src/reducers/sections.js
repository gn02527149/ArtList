import * as types from '../constants/ActionTypes';

let listId = 0;
let listKId = 201;
let serialNum = 1;

let initialinfoItem = {    //小
    type:"LOGO",
    name:"範例文字",
    explanation:"說明",
    fileName:"logo.png",
    serialNumber:serialNum++,
    sectionInfoId:listKId++
};

let initialSection = {    //大
    sectionName: "開始畫面",
    arrange: "美術決定",
    sectionInfo:
    [{
        imgs:[
            ""
        ],
        infoItem:[
            initialinfoItem
        ]
    }],
    sectionId:listId++
};
let initialState = { //全部
    data: [initialSection]
};

const sections = (state = initialState, action) => {
    switch (action.type) {
        // case types.ADD_WORKSECTION:
        //     let newdata = {
        //         ...initialSection,
        //         sectionInfo: [
        //             ...initialSection.sectionInfo[0],
        //             {
        //                ...initialSection.sectionInfo[0],
        //                 sectionId:listId++
        //             }
        //         ]
        //     }
        //     return {
        //         ...state,
        //         data: state.data.concat(newdata)
        //     }
        case types.ADD_WORKSECTION:
            let newdata = {
                ...initialSection,
                sectionId:listId++
            }
            return {
                ...state,
                data: state.data.concat(newdata)
            }
        case types.ADD_EDITLIST:
            let addData = state.data.filter((i)=>{
                return action.id == i.sectionId;
            })
            let newdata2 = {
                ...addData,
                sectionInfo:[
                    ...initialSection.sectionInfo[0]
                ]
            }
            console.log(newdata2)
            return {
                ...state,
                data: state.data.concat(newdata2)
            }
        default:
            return state;
    };
};

export default sections;
