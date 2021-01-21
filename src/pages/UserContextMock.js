import React from 'react'

import { getUserBaseInfoByAD } from '../utils/toserver/UserBaseInfoUtil'
import { getOULongNameUserBaseInfoByAD } from '../services/System/UserBaseInfoService'
import { message } from 'antd';

let UserContext = React.createContext({
    userRow: null,
    spinning: true
});
let MyUserData = null;

async function GetData(userAD, cb) {
    if (!userAD.startsWith('cofco\\')) {
        userAD = "cofco\\" + userAD;
    }

    const result = await getOULongNameUserBaseInfoByAD(userAD);

    const { data, message: msg } = result;

    if (msg === "succeeded") {
        const row = data && data.recordsets[0] && data.recordsets[0][0];
        const value = {
            userRow: row,
            spinning: false
        };
        UserContext = React.createContext(value);
        MyUserData = value;
        // console.log(UserContext)
        // if (cb) {
        //     cb();
        // }
        message.success("人员登陆成功");
    } else {
        message.error(msg);
    }

    return {UserContext, MyUserData};
}

// export const UserOUInfo = {
//     UserInfo: {
//         FirstName: 'Kevin',
//         SurName: 'Jang'
//     },
//     Department: {
//         FirstDept: {
//             Name: '财务部'
//         },
//         Dept: {
//             Name: 'IT小组'
//         }
//     }
// }

export { UserContext, GetData, MyUserData } 