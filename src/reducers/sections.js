import * as types from '../constants/ActionTypes';

let listId = 0;
let listKId = 1;

let initialinfoItem = {    //小
    type:"",
    name:"範例文字",
    explanation:"說明",
    fileName:"選擇檔案",
    sectionInfoId:listKId++,
    parentsID: ""
};

let initialSection = {    //大
    editclassName: "edit select",
    sortclassName: "sort",
    delclassName: "del",
    toolicon:"toolicon",
    disabled:"",
    draggable:false,
    sectionName: "",
    arrange: "artDecision",
    sectionId:listId++
};
let initialImgs ={
    imgSrc:[],
    parentsID: ""
};

let initialState = { //全部
    fileName: "",
    sectionData: [],
    infoItem:[],
    Imgs:[]
};

const sections = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_FILENAME:
            return {
                ...state,
                fileName: action.filename
            }
        case types.ADD_WORKSECTION:
            let listNewId = listId++
            let newsection = {
                ...initialSection,
                sectionId:listNewId,
                sectionName: action.name
            }
            let sectionItem = {
                ...initialinfoItem,
                parentsID: listNewId,
            }
            let sectionImg= {
                ...initialImgs,
                parentsID: listNewId,
            }
            return {
                ...state,
                sectionData: state.sectionData.concat(newsection),
                infoItem: state.infoItem.concat(sectionItem),
                Imgs: state.Imgs.concat(sectionImg)
            }
        case types.DEL_WORKSECTION:
            return {
                ...state,
                sectionData: state.sectionData.filter((list) => Number(action.id) !== Number(list.sectionId)),
                infoItem: state.infoItem.filter((list) => Number(action.id) !== Number(list.parentsID)),
                Imgs: state.Imgs.filter((list) => Number(action.id) !== Number(list.parentsID))
            }
        case types.ADD_EDITLIST:
            let editListItem = {
                ...initialinfoItem,
                sectionInfoId: listKId++,
                parentsID: Number(action.PID)
            }
            return {
                ...state,
                infoItem: state.infoItem.concat(editListItem)
            }
        case types.DEL_EDITLIST:
            let parentsID = action.id.split('.')[0]
            let listID = action.id.split('.')[1]
            
            let infoItemA = state.infoItem.filter((el)=>
                Number(parentsID) === Number(el.parentsID) && Number(listID) !== Number(el.sectionInfoId)
            );
            let infoItemB = state.infoItem.filter((el)=>
                Number(parentsID) !== Number(el.parentsID)
            );
           
            return {
                ...state,
                infoItem: infoItemA.concat(infoItemB)
            }
        case types.ADD_REFERVIEW:
            let viewPID;
            state.Imgs.forEach((item, id)=>{
                if(action.id == item.parentsID) {
                    viewPID = id
                }
            });
           
            let _addIMGDate = {
                ...state.Imgs,
                [viewPID]:{
                    ...state.Imgs[viewPID],
                    imgSrc: state.Imgs[viewPID].imgSrc.concat(action.src)
                }
            }
            let addIMGresult = Object.keys(_addIMGDate).map(function(key) {
                return _addIMGDate[key];
            });

            return {
                ...state,
                Imgs: addIMGresult
            }
        case types.DEL_REFERVIEW:
            let ImgparentsID = action.id.split('.')[0]
            let IMGID = action.id.split('.')[1]
            let IMGPID;

            state.Imgs.forEach((item, id)=>{
                if(ImgparentsID == item.parentsID) {
                    IMGPID = id
                }
            });

            let _delIMGDate = {
                ...state.Imgs,
                [IMGPID]: {
                    ...state.Imgs[IMGPID],
                    imgSrc: state.Imgs[IMGPID].imgSrc.filter((el,i) =>Number(IMGID) !== Number(i))
                }
            }

            let delIMGresult = Object.keys(_delIMGDate).map(function(key) {
                return _delIMGDate[key];
            });

            return {
                ...state,
                Imgs: delIMGresult
            }
        case types.CHANGE_TOOLS:
            let ID
            let icontype = action.el+'icon toolicon'

            state.sectionData.forEach((item, id)=>{
                if(action.id == item.sectionId) {
                    ID = id
                }
            });

            let _changeDate = {
                ...state.sectionData,
                [ID]: {
                    ...state.sectionData[ID],
                    editclassName: action.el == "edit"? "edit select": "edit",
                    sortclassName: action.el == "sort"? "sort select": "sort",
                    delclassName: action.el == "del"? "del select": "del",
                    toolicon: icontype,
                    disabled: action.el == "edit"? "": "disabled",
                    draggable: action.el == "sort"? true : false
                }
            }
            let changeDateresult = Object.keys(_changeDate).map(function(key) {
                return _changeDate[key];
              });
            return {
                ...state,
                sectionData: changeDateresult
            }
        case types.SORT_WORKSECTION:
            return {
                ...state,
                sectionData: action.data
            }
        case types.SORT_EDITLIST:

            let sortinfoItemB = state.infoItem.filter((el)=>
                Number(action.PID) !== Number(el.parentsID)
            );
          
            return {
                ...state,
                infoItem: action.data.concat(sortinfoItemB)
            }
        // case types.UPDATE_DATA:
        //     return {
        //         ...state,
        //         data: state.data
        //     }
        case types.UPDATE_FILEINFO:
            let updateID,imageDicType,statusType
            state.infoItem.forEach((item, id)=>{
                if(action.Pid == item.parentsID && action.id == item.sectionInfoId) {
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
            for (var prop in status) {
                if(prop === action.filename.split(typeName)[0]){
                    statusType = status[prop];
                }
            }

            let updateInfoDate = {
                ...state.infoItem,
                [updateID]: {
                    ...state.infoItem[updateID],
                    type: imageDicType,
                    fileName: typeName,
                    explanation: statusType
                }
            }
            let updateInforesult = Object.keys(updateInfoDate).map(function(key) {
                return updateInfoDate[key];
              });
            return {
                ...state,
                infoItem: updateInforesult
            }
        default:
            return state;
    };
};

export default sections;
