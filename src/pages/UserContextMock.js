import React from 'react'

import { getUserBaseInfoByAD, getOULongNameUserBaseInfoByAD } from '../utils/toserver/UserBaseInfoUtil'

let UserContext = null;
let MyUserData = null;

async function GetData(userAD, cb) {
    if (!userAD.startsWith('cofco\\')) {
        userAD = "cofco\\" + userAD;
    }

    //getUserBaseInfoByAD getOULongNameUserBaseInfoByAD
    await getOULongNameUserBaseInfoByAD(userAD, (data) => {
        UserContext = React.createContext(data);
        // console.log('getUserBaseInfoByAD-data:', data);
        MyUserData = data;
        if (cb) {
            cb();
            // console.log('cb:', cb);
        }
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