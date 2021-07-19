import req from '../utils/req.js';
const PREFIX_URL = "api/v1/inventoryItemComboDetails";

/**
* Lưu thông tin thành phần hàng hóa của combo
* @param {object, boolean}  
* @returns 
* CreatedBy: dqdat (19/07/2021)
*/
export const saveInventoryItemComboDetail = (data, isInsert = true) =>
    req({
        url: isInsert ? `${PREFIX_URL}` : `${PREFIX_URL}/${data.inventoryItemID}`,
        data: data,
        method: isInsert ? 'POST' : 'PUT'
    })
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));


