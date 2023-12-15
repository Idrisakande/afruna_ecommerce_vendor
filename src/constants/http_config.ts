import Cookies from 'js-cookie'

export const BASE_URL = 'https://afruna-backend-cmsxg.ondigitalocean.app/api/v1'

const token = Cookies.get("Token")

export const headers = {
    headers: {
        Authorization: `Bearer ${token}`
    }
}