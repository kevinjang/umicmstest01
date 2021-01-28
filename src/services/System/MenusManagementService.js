import request from "../../utils/realRequest"

export async function getMenusService() {
    return request('/api/getMenus',{
        method: 'POST'
    });
}