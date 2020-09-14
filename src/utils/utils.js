import {notification} from 'antd'
const getNumberForInput = (value) => {
    return parseFloat(value) || 0
}

let timer = null;

const debounce = (fn, editing) => {
    if(typeof fn === 'function'){
        if(editing){
            if(timer){
                clearTimeout(timer);
            }
            
            timer = setTimeout(()=>{
                clearTimeout(timer);
                editing = false;
                fn.call()
            })
        }
        else{
            fn.call();
        }
    }
    else{
        notification.error({
            message: '请传入参数',
            description: 'debounce传入参数错误'
        })
    }
}

export { getNumberForInput, debounce }