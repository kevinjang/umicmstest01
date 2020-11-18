import { notification } from 'antd'
import AESEncryption, { AESTYPE } from 'aes-crypto'

const Utils = {};

const encryptKey = 'FB32D61111CBE2D012E7A12209322CF5FB32D671D6CBE2D012E7A12209322CF5'
Utils.getNumberForInput = (value) => {
    return parseFloat(value) || 0
}

let timer = null;

Utils.debounce = (fn, editing) => {
    if (typeof fn === 'function') {
        if (editing) {
            if (timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(() => {
                clearTimeout(timer);
                editing = false;
                fn.call()
            })
        }
        else {
            fn.call();
        }
    }
    else {
        notification.error({
            message: '请传入参数',
            description: 'debounce传入参数错误'
        })
    }
}

Utils.setCookie = (key, value) => {
    const timestamp = Date.now();
    const expiresDatetime = timestamp + 1000 * 60 * 60; // 一小时后过期
    const cookieItem = encrypt({
        username: value,
        expiresDatetime
    })
    console.log("encrypted cookieItem:", cookieItem)
    localStorage.setItem(key, cookieItem);
}
Utils.getCookie = (key) => {
    return localStorage.getItem(key)
}

Utils.clearCookie = (key) => {
    localStorage.removeItem(key);
}

const cookieValid = (key) => {
    const item = localStorage.getItem(key);
    if (!item) {
        console.log(`cookie ${key} doesn't exist in the localStorage`);
        return false
    }
    const timestamp = Date.now();
    const expiresDatetime = timestamp + 1000 * 60 * 60; // 一小时后过期
}

Utils.encrypt = (value) => {
    try {
        const _encryption = new AESEncryption();
        return _encryption.encryption(value, encryptKey)
    } catch (error) {
        notification.error({
            message: "加密错误",
            description: error.message
        })
        return null;
    }
}

Utils.decrypt = (value) => {
    try {
        const _encryption = new AESEncryption();
        return _encryption.encryption(value, encryptKey)
    } catch (error) {
        notification.error({
            message: '解密错误',
            description: error.message
        })
    }
}

Utils.getUpdateColumns = ({ prevEditingRecord, record }) => {
    if(!prevEditingRecord){
        notification.error({
            message: 'prevEditingRecord为空',
            description: '请正确传参'
        })
        return null;
    }

    if(!record){
        notification.error({
            message: 'record为空',
            description: '请正确传参'
        })
        return null;
    }

    const keys = Object.keys(record);
    const result = [];

    keys.forEach(key=>{
      if(prevEditingRecord[key] !== record[key])
       result.push({
         name: key,
         value: record[key]
       })
    })

    return result;
}

// export { debounce, getCookie, setCookie, clearCookie, encrypt, decrypt, getUpdateColumns }

export default Utils;