import req from '../utils/req.js';
const PREFIX_URL = "api/v1/inventoryItems";

/**
 * Lấy dữ liệu theo tìm kiếm, phân trang, sắp xếp
 * @param {object} filterData 
 * @returns danh sách hàng hóa
 */
export const getPaging = (filterData) =>
    req({
        url: `${PREFIX_URL}/GetPaging`,
        data: filterData,
        method: 'POST'
    })
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));

/**
* Lưu thông tin hàng hóa
* @param {object, boolean}  
* @returns 
* CreatedBy: dqdat (15/07/2021)
*/
export const saveInventoryItem = (data, isInsert = true) =>
    req({
        url: isInsert ? `${PREFIX_URL}` : `${PREFIX_URL}/${data.inventoryItemID}`,
        data: data,
        method: isInsert ? 'POST' : 'PUT'
    })
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));

/**
* Xóa một hàng hóa
* @param {}  
* @returns 
* CreatedBy: dqdat (15/07/2021)
*/
export const delInventoryItem = (inventoryItemID) =>
    req.delete(`${PREFIX_URL}/${inventoryItemID}`)
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));

/**
* Lấy thông tin một hàng hóa theo ID
* @param {}  
* @returns 
* CreatedBy: dqdat (15/07/2021)
*/
export const getInventory = (inventoryItemID) =>
    req.get(`${PREFIX_URL}/${inventoryItemID}`)
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));