import {getMenusService} from '../services/System/MenusManagementService'
const MenusModel = {
    namespace: "menus",
    state: {
        menus: [],
        activeSubMebu: '',
        selectedMenuItem: ''
    },
    reducers:{
        'saveMenus':(state,{payload})=>{
            return {
                ...state,
                menus: payload
            }
        }
    },
    effects:{
        *getMenus(_, {select, put, call}){
            const result = yield call(getMenusService);
            // console.log('menus result:', result);
            yield put({
                type: 'saveMenus',
                payload: result.menus
            })
        }
    }
}

export default MenusModel
