import request from '@/utils/realRequest'

export async function queryNotices(){
    return request('/api/notices');
}

export async function queryERRemoData(){
    return request('/api/erdata');
}