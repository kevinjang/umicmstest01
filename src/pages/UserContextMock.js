import React from 'react'

import { getUserByPage } from '../utils/toserver/UserBaseInfoUtil'

let UserContext = null;
let MyUserData = null;

function GetData(userAD, cb) {
    if (!userAD.startsWith('cofco\\')) {
        userAD = "cofco\\" + userAD;
    }

    getUserByPage(0, 1, {
        name: 'UserAD',
        value: userAD
    }, (data) => {
        UserContext = React.createContext(data);
        MyUserData = data;
        if (cb) cb();
    })
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