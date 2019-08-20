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
    sectionInfoId:listKId++,
};

let initialSection = {    //大
    sectionName: "開始畫面",
    arrange: "美術決定",
    sectionInfo:
    {
        imgs:[
            ""
        ],
        infoItem:[
            initialinfoItem
        ]
    },
    sectionId:listId++
};
let initialState = { //全部
    data: [initialSection]
};

const sections = (state = initialState, action) => {
    switch (action.type) {
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
            let _newItem = {
                ...initialinfoItem,
                sectionInfoId: listKId++,
            }
            return {
                ...state,
                data: [
                    ...state.data.slice(0, action.id),
                    {
                        ...state.data[action.id],
                        sectionInfo: {
                            ...state.data[action.id].sectionInfo,
                            infoItem: [
                                ...state.data[action.id].sectionInfo.infoItem.concat(_newItem)
                            ]
                        }
                    },
                    ...state.data.slice(action.id)
                ],
                // [action.id]:{
                //     ...state.data[action.id],
                //     sectionInfo: {
                //         ...state.data[action.id].sectionInfo,
                //         infoItem: [
                //             ...state.data[action.id].sectionInfo.infoItem.concat(_newItem)
                //         ]
                //     }
                // }

                // ...state,
                // data: {
                //     ...state.data,
                //     [action.id]: {
                //         ...state.data[action.id],
                //         sectionInfo: {
                //             ...state.data[action.id].sectionInfo,
                //             infoItem: [
                //                 ...state.data[action.id].sectionInfo.infoItem.concat(_newItem)
                //             ]
                //         }
                //     }
                // }
            }
        default:
            return state;
    };
};

export default sections;
