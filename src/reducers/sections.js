import * as types from '../constants/ActionTypes';

let listId = 101;
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
            initialinfoItem,
            initialinfoItem,
            initialinfoItem,
            initialinfoItem
        ],
        sectionId:listId++
    }]
};
let initialState = [  //全部 
    initialSection,
    initialSection
];

const section = (state, action) => {
    switch (action.type) {
        case types.ADD_LIST:
            return {
                sectionInfoId:listKId++,
                serialNumber:serialNum++,
                fileName   : "",
                explanation: "",
                name   : "",
                type: ""
            };
        default:
            return state;
    };
};

const sections = (state = initialState, action) => {
    switch (action.type) {
        // case types.TOGGLE_MODAL:
        //     return {
        //         ...state,
        //         visible: action.visible
        //     };
        // case types.UPDATE_USER:
        //     return {
        //         ...state,
        //         user   : action.user,
        //         user_id: action.user.toUpperCase()
        //     };
        // case types.UPDATE_MESSAGE:
        //     return {
        //         ...state,
        //         message: action.message
        //     };
        default:
            return state;
    };
};

export default sections;
