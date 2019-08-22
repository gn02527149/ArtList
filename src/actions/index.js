import * as types from '../constants/ActionTypes';

/* section: 加入畫面 */
export const addWorksection = () => {
    return {
        type: types.ADD_WORKSECTION
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

/* section: 功能更換 */
export const changeTools = (id,el) => {
    return {
        type: types.CHANGE_TOOLS,
        id,
        el
    };
};

// /* section: 儲存/預覽 */
// export const editList = (id, message) => {
//     return {
//         type: types.EDIT_LIST,
//         id,
//         message
//     };
// };

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