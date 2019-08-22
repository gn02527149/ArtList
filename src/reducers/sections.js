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
    editclassName: "edit select",
    sortclassName: "sort",
    delclassName: "del",
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
        case types.DEL_WORKSECTION:
            return {
                ...state,
                data: state.data.filter((list) => parseInt(action.id) !== parseInt(list.sectionId))
            }
        case types.ADD_EDITLIST:
            let _newItem = {
                ...initialinfoItem,
                sectionInfoId: listKId++,
            }
            let _addListDate = {
                ...state.data,
                [action.id]: {
                    ...state.data[action.id],
                    sectionInfo: {
                        ...state.data[action.id].sectionInfo,
                        infoItem: [
                            ...state.data[action.id].sectionInfo.infoItem.concat(_newItem)
                        ]
                    }
                }
            }
            let result = Object.keys(_addListDate).map(function(key) {
                return _addListDate[key];
              });
            return {
                ...state,
                data: result
            }
        case types.CHANGE_TOOLS:
            let _changeDate = {
                ...state.data,
                [action.id]: {
                    ...state.data[action.id],
                    editclassName: action.el == "edit"? "edit select": "edit",
                    sortclassName: action.el == "sort"? "sort select": "sort",
                    delclassName: action.el == "del"? "del select": "del"
                }
            }
            let result2 = Object.keys(_changeDate).map(function(key) {
                return _changeDate[key];
              });
            return {
                ...state,
                data: result2

            }
        default:
            return state;
    };
};

export default sections;
