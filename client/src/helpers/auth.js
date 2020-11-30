import cookie from 'js-cookie';

export const setCookie = (key, value) => {
    if(window !== 'undefined'){
        cookie.set(key, value, {
            expires: 1
        })
    }
}

export const removeCookie = key => {
    if(window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        })
    }
}

export const getCookie = key => {
    if(window !== 'undefined') {
        return cookie.get(key)
    }
}

export const setLocalStorage = (key, value) => {
    if(window !== 'undefined') {
        localStorage.setItem(key,JSON.stringify(value))
    }
}

