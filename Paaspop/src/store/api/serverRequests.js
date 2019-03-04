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
    alert(JSON.stringify(data))
    var object = {
        "Gender": 2,
        "Age":32
    }
    axios.post(`${ROOT_URL}/${url}`, object, { headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json"
    }})
    .then(result => {
        alert("hoi");
    })
}