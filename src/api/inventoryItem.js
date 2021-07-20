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
export const deleteInventoryItemByID = (inventoryItemID) =>
    req.delete(`${PREFIX_URL}/${inventoryItemID}`)
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));

/**
* Lấy thông tin một hàng hóa theo ID
* @param {}  
* @returns 
* CreatedBy: dqdat (15/07/2021)
*/
export const getInventoryByID = (inventoryItemID) =>
    req.get(`${PREFIX_URL}/${inventoryItemID}`)
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));


/**
* Lấy thông tin một hàng hóa theo skuCode
* @param {}  
* @returns 
* CreatedBy: dqdat (17/07/2021)
*/
export const getInventoryBySKUCode = (skuCode) =>
    req.get(`${PREFIX_URL}/GetInventoryItemBySKUCode/${skuCode}`)
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));

/**
* Lấy thông tin một hàng hóa theo parentID
* @param {}  
* @returns 
* CreatedBy: dqdat (17/07/2021)
*/
export const getInventorysByParentID = (parentID) =>
    req.get(`${PREFIX_URL}/GetInventoryItemsByParentID/${parentID}`)
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));

/**
* Xóa thông tin hàng hóa theo parentID
* @param {}  
* @returns 
* CreatedBy: dqdat (17/07/2021)
*/
export const deleteInventoryItemByParentID = (parentID) =>
    req.delete(`${PREFIX_URL}/DeleteInventoryItemByParentID/${parentID}`)
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));

/**
* Lấy danh sách hàng hóa làm thành phần cho combo
* @param {}  
* @returns 
* CreatedBy: dqdat (17/07/2021)
*/
export const getInventoryItemsOptionCombo = () =>
    req.get(`${PREFIX_URL}/GetInventoryItemsOptionCombo`)
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));

/**
* Lấy danh sách hàng hóa làm thành phần cho combo
* @param {}  
* @returns 
* CreatedBy: dqdat (17/07/2021)
*/
export const getInventoryItemSelectOptionComboByParentID = (parentID) =>
    req.get(`${PREFIX_URL}/GetInventoryItemSelectOptionComboByParentID/${parentID}`)
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));


/**
* Lấy toàn bộ thông tin thành phần hàng hóa của combo
* @param {}  
* @returns 
* CreatedBy: dqdat (17/07/2021)
*/
export const getInventoryItemComboDetails = (inventoryItemComboID) =>
    req.get(`${PREFIX_URL}/GetInventoryItemComboDetails/${inventoryItemComboID}`)
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));

/**
* Lấy mã mới từ bảng sinh mã tự động
* @param {}  
* @returns 
* CreatedBy: dqdat (20/07/2021)
*/
export const getNewCode = (tableName, fieldName) =>
    req.get(`${PREFIX_URL}/GetNewCode?tableName=${tableName}&fieldName=${fieldName}`)
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));
