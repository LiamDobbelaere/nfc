const fetch = require('node-fetch');
const {
    INTEROP_OTH_IP,
    INTEROP_OTH_PORT
} = process.env;

async function fetchPermissions(sid) {
    if (sid) {
        const res = await fetch(`http://${INTEROP_OTH_IP}:${INTEROP_OTH_PORT}/session/${sid}/user-info`);
        if (res.ok) {
            const response = await res.json();

            return response;
        } else {
            console.log('Response not OK for fetchPermissions (sid: ' + sid + ')');
            return null;
        }
    } else {
        console.log('No sid given (sid: ' + sid + ')');
        return null;
    }
}

module.exports = {
    fetchPermissions
};