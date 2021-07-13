import req from '../utils/req.js';
// import { BASE_URL } from '../utils/envConst.js';
const PREFIX_URL = "api/v1/inventoryItems";

export const getPaging = (filterData) =>
    req({
        url: `${PREFIX_URL}/GetPaging`,
        data: filterData,
        method: 'POST'
    })
        .then(res => Promise.resolve(res.data))
        .catch(err => Promise.reject(err));

