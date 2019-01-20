import fetch from '../config/async/fetch'



/**
 * 登录
 */

export const userLongin = (phone, password) => {
    var data = {
        phone,
        password
    }
    return fetch('/api/longin', data, 'POST')
}
