import React,{setGlobal} from 'reactn';
import axios from 'axios';
import * as CONSTANT from './AppConstant';

/**
 * 
 * @param {string} param 
 * @description Http get call using axios
 * @author Akash Golui
 */
export const get = async (param) => {
    // console.log('Get', CONSTANT.BASE_URL + param)

    try {
        const res = await axios.get(CONSTANT.BASE_URL + param, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            // 'Authorization': 'Bearer ' + CONSTANT.BEARER
        })
        return res;
    } catch (error) {
        return error;
    }
}

/**
 * 
 * @param {string} param 
 * @description Http get call using axios
 * @author Akash Golui
 */
export const post = async (param, data) => {

    try {
        const res = await axios.post(CONSTANT.BASE_URL + param, JSON.stringify(data), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                // 'Authorization': 'Bearer ' + CONSTANT.BEARER
            }

        });
        return res;
    } catch (error) {
        return error;
    }
}

/**
 * 
 * @param {string} param 
 * @description Http get call using axios
 * @author Akash Golui
 */
export const postAuth = async (param, data) => {
    let token = localStorage.getItem('token');
    let cmpId = JSON.parse(localStorage.getItem('company')).unique_id;
    try {
        const res = await axios.post(CONSTANT.BASE_URL + param, JSON.stringify(data), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': 'Bearer ' + token,
                'Authorization': cmpId
            }

        });
        return res;
    } catch (error) {
        return error;
    }
}


export const authGet = async (param) => {

    let token = localStorage.getItem('token');
    let cmpId = JSON.parse(localStorage.getItem('company')).unique_id;
    try {
        const res = await axios.get(CONSTANT.BASE_URL + param, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': 'Bearer ' + token,
                'Authorization': cmpId
            }

        });
        return res;
    } catch (error) {
        return error;
    }

}

export const update = (param, data) => {
    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(CONSTANT.BASE_URL + param, requestOptions)
        .then(res => res.json())
        .then(response => { return response });
}


export const deleteAuth = async (param) => {
    let token = localStorage.getItem('token');
    let cmpId = JSON.parse(localStorage.getItem('company')).unique_id;
    try {
        const res = await axios.delete(CONSTANT.BASE_URL + param, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': 'Bearer ' + token,
                'Authorization': cmpId
            }
        });
        return res;
    } catch (error) {
        return error;
    }


}


/**
 * 
 * @param {string} param 
 * @description Http patch call using axios
 * @author Akash Golui
 */
export const authPatch = async (param, data) => {
    // console.log('PATCH', data)
    let token = localStorage.getItem('token');
    let cmpId = JSON.parse(localStorage.getItem('company')).unique_id;
    try {
        const res = await axios.patch(CONSTANT.BASE_URL + param, JSON.stringify(data), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': 'Bearer ' + token,
                'Authorization': cmpId
            }
        });
        return res;
    } catch (error) {
        return error;
    }
}

/**
 * 
 * @param {string} param 
 * @description Http patch call using axios
 * @author Akash Golui
 */
export const axiosPatch = async (param, data) => {
    // console.log('PATCH', data)

    try {
        const res = await axios.patch(CONSTANT.BASE_URL + param, JSON.stringify(data), {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return res;
    } catch (error) {
        return error;
    }
}

/**
 * 
 * @param {string} param 
 * @description Http patch call using axios
 * @author Akash Golui
 */
export const axiosPatchFormData = async (param, data) => {
    // console.log('PATCH', data)
    let token = localStorage.getItem('token');
    let cmpId = JSON.parse(localStorage.getItem('company')).unique_id;
    // let progress = 0;
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'x-access-token': 'Bearer ' + token,
            'Authorization': cmpId
        },
        onUploadProgress: function (progressEvent) {
            setGlobal({progress : Math.round((progressEvent.loaded * 100) / progressEvent.total)})
            // console.log(Math.round((progressEvent.loaded * 100) / progressEvent.total))
        }
    }
    try {
        const res = await axios.patch(CONSTANT.BASE_URL + param, data, config);
        return res;
    } catch (error) {
        return error;
    }
}

/**
 * 
 * @param {string} param 
 * @description Http patch call using axios
 * @author Akash Golui
 */
export const axiosPostFormData = async (param, data) => {
    // console.log('PATCH', data)
    let token = localStorage.getItem('token');
    let cmpId = JSON.parse(localStorage.getItem('company')).unique_id;
    // let progress = 0;
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'x-access-token': 'Bearer ' + token,
            'Authorization': cmpId
        }
    }
    try {
        const res = await axios.post(CONSTANT.BASE_URL + param, data, config);
        return res;
    } catch (error) {
        return error;
    }
}


