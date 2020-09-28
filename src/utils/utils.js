import { notification } from 'antd'
import AESEncryption, { AESTYPE } from 'aes-crypto'
const encryptKey = 'FB32D61111CBE2D012E7A12209322CF5FB32D671D6CBE2D012E7A12209322CF5'
const getNumberForInput = (value) => {
    return parseFloat(value) || 0
}

let timer = null;

const debounce = (fn, editing) => {
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

const setCookie = (key, value) => {
    const timestamp = Date.now();
    const expiresDatetime = timestamp + 1000 * 60 * 60; // 一小时后过期
    const cookieItem = encrypt({
        username: value,
        expiresDatetime
    })
    console.log("encrypted cookieItem:", cookieItem)
    localStorage.setItem(key, cookieItem);
}
const getCookie = (key) => {
    return localStorage.getItem(key)
}

const clearCookie = (key) => {
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

const encrypt = (value) => {
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
const decrypt = (value) => {
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

export { getNumberForInput, debounce, getCookie, setCookie, clearCookie, encrypt, decrypt }