import { Buffer } from 'buffer';


function basicAuth(username, password) {
  const token = `${username}:${password}`;
  const base64Token = Buffer.from(token).toString('base64');
  return `Basic ${base64Token}`;
}


export default basicAuth;