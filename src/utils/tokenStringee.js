import jwt from 'jsonwebtoken'
const apiKeySid = 'SK.0.nkqY9CFwLG4NK5bPu1lBJ60mVTVSIO'
const apiKeySecret= 'T2ZqUjF5TlFwMHdNbnRZNnk0SjZIeTRWdVFiTDlVeUU='




function generateAccessToken() {
	var now = Math.floor(Date.now() / 1000);
	var exp = now + 3600;

	var header = {cty: "stringee-api;v=1"};
	var payload = {
		jti: apiKeySid + "-" + now,
		iss: apiKeySid,
		exp: exp,
		rest_api: true
	};
	var token = jwt.sign(payload, apiKeySecret, {algorithm: 'HS256', header: header})
	return token;
}

const generateRoomToken = (roomId) => {
  const header = {
    typ: 'JWT',
    alg: 'HS256',
    cty: 'stringee-api;v=1'
  };

  const payload = {
    jti: `${apiKeySid}_room_${Date.now()}`,
    iss: apiKeySid,
    exp: Math.floor(Date.now() / 1000) + 3600,
    roomId: roomId,
    permissions: {
      publish: true,
      subscribe: true,
      control_room: true
    }
  };

  return jwt.sign(payload, apiKeySecret, { header });
}

export const tokenStringee = {
  generateAccessToken,
  generateRoomToken
}