import axios from 'axios';
import Config from 'react-native-config'

const rootUrl = () => {
    if(__DEV__){
        return Config.DEV_API_URL;
    } else {
        return Config.PROD_API_URL;
    }
}

const ROOT_URL = rootUrl();

export const Post = (url, data) => {
    return axios({
        method: 'post',
        url: `${ROOT_URL}/${url}`,
        data: data,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        timeout: 2000
      });
}