import React from 'react'

export const UserOUInfo = {
    UserInfo : {
        FirstName: 'Kevin',
        SurName: 'Jang'
    },
    Department:{
        FirstDept:{
            Name: '财务部'
        },
        Dept:{
            Name: 'IT小组'
        }
    }
}

export const UserContext = React.createContext({
    UserOUInfo
});