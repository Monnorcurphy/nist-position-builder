export async function get(url, cb){
    let response = await fetch(url).then(res =>res.json())
    cb(response);
  }

