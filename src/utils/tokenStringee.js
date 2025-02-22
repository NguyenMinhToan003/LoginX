import jwt from 'jsonwebtoken';

const apiKeySid = 'SK.0.Csa7gVEiydvB6d04ivFDgm1WkOlTdusy'; // Thay bằng giá trị thật
const apiKeySecret = 'OEN1ZmNiVFBVb0txZDZHeHdqVTk1V1Y4eVJZQlQ4SnY='; // Thay bằng giá trị thật

const getAccessToken = (id) => {
  const userId = id;
  const now = Math.floor(Date.now() / 1000);
  const exp = now + 3600; // Token hết hạn sau 1 giờ

  const header = { cty: 'stringee-api;v=1' };
  const payload = {
    jti: `${apiKeySid}-${now}`,
    iss: apiKeySid,
    exp: exp,
    userId: userId,
    rest_api: true,
  };

  return jwt.sign(payload, apiKeySecret, { algorithm: 'HS256', header: header });
};



const getRoomToken = (roomId) => {
  var now = Math.floor(Date.now() / 1000);
  var exp = now + 3600;

  var header = { cty: "stringee-api;v=1" };
  var payload = {
    'jti': `${apiKeySid}-${now}`,
    'iss': apiKeySid,
    'exp': exp,
    'roomId': roomId,
    'permissions': {
      'publish': true,
      'subscribe': true,
      'control_room': true
    }
  };

  var token = jwt.sign(payload, apiKeySecret, { algorithm: 'HS256', header: header })
  return token;
}
export const tokenStringee = {
  getAccessToken,
  getRoomToken
}