import axios from 'axios';

export async function testServer() {    
    const res = await axios.get('/api/hello');
    console.log('client service:' + res.data.msg);
    return(res.data.msg);
}