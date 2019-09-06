import * as types from '../constants/ActionTypes';

/* section: 加入畫面 */
export const addWorksection = (name) => {
    return {
        type: types.ADD_WORKSECTION,
        name
    };
};

/* section: 刪除畫面 */
export const delWorksection = (id) => {
    return {
        type: types.DEL_WORKSECTION,
        id
    };
};

/* section: 加入一列 */
export const addeditList = (id) => {
    return {
        type: types.ADD_EDITLIST,
        id
    };
};

/* section: 刪除一列 */
export const deleditList = (id) => {
    return {
        type: types.DEL_EDITLIST,
        id
    };
};

/* section: 加入參考圖片 */
export const addreferView = (id,src) => {
    return {
        type: types.ADD_REFERVIEW,
        id,
        src
    };
};

/* section: 刪除參考圖片 */
export const delreferView = (id) => {
    return {
        type: types.DEL_REFERVIEW,
        id
    };
};
/* section: 功能更換 */
export const changeTools = (id,el) => {
    return {
        type: types.CHANGE_TOOLS,
        id,
        el
    };
};

/* section: 畫面移動 */
export const sortWorksection = (data) => {
    return {
        type: types.SORT_WORKSECTION,
        data
    };
};

/* section: 列移動 */
export const sorteditList = (data,PID) => {
    return {
        type: types.SORT_EDITLIST,
        data,
        PID
    };
};

/* section: 更新輸入資訊 */
export const updateDate = (id) => {
    return {
        type: types.UPDATE_DATA,
        id
    };
};

/* section: 帶入‘列’圖片資訊 */
export const updateFileInfo = (Pid,id,filename) => {
    return {
        type: types.UPDATE_FILEINFO,
        Pid,
        id,
        filename
    };
};

// /* section: 新增參考圖片 */
// export const editList = (id, message) => {
//     return {
//         type: types.EDIT_LIST,
//         id,
//         message
//     };
// };

// /* section: 刪除參考圖片 */
// export const editList = (id, message) => {
//     return {
//         type: types.EDIT_LIST,
//         id,
//         message
//     };
// };