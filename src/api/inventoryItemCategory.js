import req from '../utils/req.js';
const PREFIX_URL = "api/v1/inventoryItemCategorys";

/**
* Lấy toàn bộ thông tin nhóm hàng hóa
* @param {}  
* @returns Danh sách nhóm hàng hóa
* CreatedBy: dqdat (14/07/2021)
*/
export const getInventoryItemCategorys = () => req.get(`${PREFIX_URL}`)
    .then(res => Promise.resolve(res.data))
    .catch(err => Promise.reject(err));