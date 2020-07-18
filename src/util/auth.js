import React,{ useGlobal} from 'reactn'
/**
 * @description auth guard
 */
export const checkAuth = {
    isAuthenticated: localStorage.getItem('token') !== null ? true : false,
    authenticate(cb) {
        this.isAuthenticated = true
        console.log(this.isAuthenticated);
        setTimeout(cb, 100)
    },
    signout(cb) {
        localStorage.removeItem('token');
        localStorage.removeItem('company');
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}

export const checkAuthSuperAdmin = {
    isAuthenticated: localStorage.getItem('super_admin') !== null ? true : false,
    authenticate(cb) {
        this.isAuthenticated = true
        console.log(this.isAuthenticated);
        setTimeout(cb, 100)
    },
    signout(cb) {
        localStorage.removeItem('super_admin');
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}