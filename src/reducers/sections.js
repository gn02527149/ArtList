import * as types from '../constants/ActionTypes';

let listId = 0;
let listKId = 1;
let serialNum = 1;

let initialinfoItem = {    //小
    type:"icon",
    name:"範例文字",
    explanation:"說明",
    fileName:"選擇檔案",
    sectionInfoId:listKId++,
};

let initialSection = {    //大
    editclassName: "edit select",
    sortclassName: "sort",
    delclassName: "del",
    toolicon:"toolicon",
    disabled:"",
    draggable:false,
    sectionName: "",
    arrange: "美術決定",
    sectionInfo:
    {
        imgs:[],
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
            let ID;
            
            state.data.forEach((item, id)=>{
                if(parentsID == item.sectionId) {
                    ID = id
                }
            });

            let _newListDate = {
                ...state.data,
                [ID]: {
                    ...state.data[ID],
                    sectionInfo: {
                        ...state.data[ID].sectionInfo,
                        infoItem: [
                            ...state.data[ID].sectionInfo.infoItem.filter((el) =>Number(listID) !== Number(el.sectionInfoId))
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
        case types.ADD_REFERVIEW:
            let ImgPId;
            state.data.forEach((item, id)=>{
                if(action.id == item.sectionId) {
                    ImgPId = id
                }
            });
            let _addIMGDate = {
                ...state.data,
                [ImgPId]: {
                    ...state.data[ImgPId],
                    sectionInfo: {
                        ...state.data[ImgPId].sectionInfo,
                        imgs: [
                            ...state.data[ImgPId].sectionInfo.imgs.concat(action.src)
                        ]
                    }
                }
            }
            let addIMGresult = Object.keys(_addIMGDate).map(function(key) {
                return _addIMGDate[key];
            });
            return {
                ...state,
                data: addIMGresult
            }
        case types.DEL_REFERVIEW:
            let ImgparentsID = action.id.split('.')[0]
            let IMGID = action.id.split('.')[1]
            let PID;
            
            state.data.forEach((item, id)=>{
                if(ImgparentsID == item.sectionId) {
                    PID = id
                }
            });

            let _newListDate1 = {
                ...state.data,
                [PID]: {
                    ...state.data[PID],
                    sectionInfo: {
                        ...state.data[PID].sectionInfo,
                        imgs: [
                            ...state.data[PID].sectionInfo.imgs.filter((el,i) =>Number(IMGID) !== Number(i))
                        ]
                    }
                }
            }
            let delListresult1 = Object.keys(_newListDate1).map(function(key) {
                return _newListDate1[key];
            });
            return {
                ...state,
                data: delListresult1
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
                    disabled: action.el == "edit"? "": "disabled",
                    draggable: action.el == "sort"? true : false
                }
            }
            let result2 = Object.keys(_changeDate).map(function(key) {
                return _changeDate[key];
              });
            return {
                ...state,
                data: result2
            }
        case types.SORT_WORKSECTION:
            return {
                ...state,
                data: action.data
            }
        case types.SORT_EDITLIST:
            let SORTPID;
            state.data.forEach((item, id)=>{
                if(action.PID == item.sectionId) {
                    SORTPID = id
                }
            });
            let _sortListDate = {
                ...state.data,
                [SORTPID]: {
                    ...state.data[SORTPID],
                    sectionInfo: {
                        ...state.data[SORTPID].sectionInfo,
                        infoItem: action.data
                    }
                }
            }
            let sortListresult = Object.keys(_sortListDate).map(function(key) {
                return _sortListDate[key];
            });
            return {
                ...state,
                data: sortListresult
            }
        case types.UPDATE_DATA:
            // let ImgPId;
            // state.data.forEach((item, id)=>{
            //     if(action.id == item.sectionId) {
            //         ImgPId = id
            //     }
            // });
            // let _addIMGDate = {
            //     ...state.data,
            //     [ImgPId]: {
            //         ...state.data[ImgPId],
            //         sectionInfo: {
            //             ...state.data[ImgPId].sectionInfo,
            //             imgs: [
            //                 ...state.data[ImgPId].sectionInfo.imgs.concat(action.src)
            //             ]
            //         }
            //     }
            // }
            // let addIMGresult = Object.keys(_addIMGDate).map(function(key) {
            //     return _addIMGDate[key];
            // });
            return {
                ...state,
                data: state.data
            }
        case types.UPDATE_FILEINFO:
            let updatePID,updateID,imageDicType
            state.data.forEach((item, id)=>{
                if(action.Pid == item.sectionId) {
                    updatePID = id
                }
            });
            state.data[updatePID].sectionInfo.infoItem.forEach((item, id)=>{
                if(action.id == item.sectionInfoId) {
                    updateID = id
                }
            });
            let imageDic = {
                "need_logo_":"logo",              
                "need_bg_" : "bg",
                "need_bar_" : "bar", //進度條
                "need_panel_" : "panel", //彈窗背景
                "need_btn_icon_" : "btn_icon",
                "need_btn_" : "btn",
                "need_icon_" : "icon",
                "need_effect_" : "effect",
                "need_art_text_" : "art_text",
                "need_" : "other"
            }
            let status = {
                "need_logo_":"遊戲標題文字、有時會帶圖示，即「文案」欄位中必有內容。",              
                "need_bg_" : "滿版底圖，其長寬必為「1386x640」。",
                "need_bar_" : "",
                "need_panel_" : "",
                "need_btn_icon_" : "可點擊類之圖檔；有時只會有圖示，有時會有圖示及底板，但不會有藝術字圖，即「文案」欄位中必無內容。例如：音效開關…等。",
                "need_btn_" : "可點擊類之圖檔；可能只有按鈕底板，若「文案」欄位有內容，代表該按鈕中須有藝術字圖。",
                "need_icon_" : "非點擊類之圖檔。若「文案」欄位有內容，代表該圖示中須有藝術字圖。",
                "need_effect_" : "特效動畫用圖，例如：光芒、粒子、序列幀。",
                "need_art_text_" : "非滿版底圖，例如：彈窗背景圖、玩家資訊底框、輸入框…等。若「文案」欄位有內容，代表該面板中須有藝術字圖。",
                "need_" : ""
            }
            let typeName = action.filename.split('_').reverse()[0]
            for (var prop in imageDic) {
                if(prop === action.filename.split(typeName)[0]){
                    imageDicType = imageDic[prop];
                }
            }
            console.log(imageDicType)

            let updateInfoDate = {
                ...state.data,
                [updatePID]: {
                    ...state.data[updatePID],
                    sectionInfo: {
                        ...state.data[updatePID].sectionInfo,
                        infoItem: {
                            ...state.data[updatePID].sectionInfo.infoItem,
                            [updateID]:{
                                ...state.data[updatePID].sectionInfo.infoItem[updateID],
                                type: imageDicType,
                                fileName: typeName,
                                explanation: "12345"
                            }
                        }
                    }
                }
            }
            
            let updateInfoDateItem = updateInfoDate[updatePID].sectionInfo.infoItem
            let updateinfoItem = Object.keys(updateInfoDateItem).map(function(key) {
                return updateInfoDateItem[key];
            });
            let updateInfoDate2 = {
                ...state.data,
                [updatePID]: {
                    ...state.data[updatePID],
                    sectionInfo: {
                        ...state.data[updatePID].sectionInfo,
                        infoItem: updateinfoItem
                    }
                }
            }
            let updateInforesult = Object.keys(updateInfoDate2).map(function(key) {
                return updateInfoDate2[key];
            });

            return {
                ...state,
                data: updateInforesult
            }
        default:
            return state;
    };
};

export default sections;
