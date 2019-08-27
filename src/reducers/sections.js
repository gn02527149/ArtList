import * as types from '../constants/ActionTypes';

let listId = 0;
let listKId = 1;
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
    toolicon:"toolicon",
    disabled:"",
    sectionName: "",
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
    data: []
};

const sections = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_WORKSECTION:
            let newdata = {
                ...initialSection,
                sectionId:listId++,
                sectionName: action.name
            }
            return {
                ...state,
                data: state.data.concat(newdata)
            }
        case types.DEL_WORKSECTION:
            return {
                ...state,
                data: state.data.filter((list) => Number(action.id) !== Number(list.sectionId))
            }
        case types.ADD_EDITLIST:
            let _newItem = {
                ...initialinfoItem,
                sectionInfoId: listKId++,
                serialNumber: serialNum++
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
            let addListresult = Object.keys(_addListDate).map(function(key) {
                return _addListDate[key];
            });
            return {
                ...state,
                data: addListresult
            }
        case types.DEL_EDITLIST:
                let parentsID = action.id.split('.')[0]
                let listID = action.id.split('.')[1]
                console.log(listID,parentsID)

                // state.data.forEach((item, id, array)=>{
                //     if(id == item['sectionId']) {

                //     }
                // });

                let _newListDate = {
                    ...state.data,
                    [parentsID]: {
                        ...state.data[parentsID],
                        sectionInfo: {
                            ...state.data[parentsID].sectionInfo,
                            infoItem: [
                                ...state.data[parentsID].sectionInfo.infoItem.filter((el) => Number(listID) !== Number(el.sectionInfoId))
                            ]
                        }
                    }
                }
                let delListresult = Object.keys(_newListDate).map(function(key) {
                    return _newListDate[key];
                });
                return {
                    ...state,
                    data: delListresult
                }
        case types.CHANGE_TOOLS:
            let icontype = action.el+'icon toolicon'
            let _changeDate = {
                ...state.data,
                [action.id]: {
                    ...state.data[action.id],
                    editclassName: action.el == "edit"? "edit select": "edit",
                    sortclassName: action.el == "sort"? "sort select": "sort",
                    delclassName: action.el == "del"? "del select": "del",
                    toolicon: icontype,
                    disabled: action.el == "edit"? "": "disabled"
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
