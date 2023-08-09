const got = require("got");

/**
 * RESUMABLE UPLOAD - CREATE SESSION
 * https://developers.facebook.com/docs/graph-api/guides/upload#step-1--create-a-session
 * https://developers.facebook.com/docs/graph-api/reference/whats-app-business-account/message_templates/
 */
// RESUMABLE UPLOAD - CREATE SESSION
exports.createResumableUploadSession = (body) => {
    try {
        return got.post([process.env.META_API_URI, process.env.META_APP_ID, "uploads"].join("/"), { 
            headers: { 
                'Authorization': 'Bearer ' + process.env.META_ACCESS_TOKEN,
                'Accept': '*/*'
            },
            json: body,
            responseType: 'json',
            throwHttpErrors: false
        });
    } catch (error) {
        return error;
    }
}

/**
 * RESUMABLE UPLOAD - INITIATE UPLOAD
 * https://developers.facebook.com/docs/graph-api/guides/upload#step-2--initiate-upload
 * https://developers.facebook.com/docs/graph-api/reference/whats-app-business-account/message_templates/
 */
// RESUMABLE UPLOAD - INITIATE UPLOAD
exports.initiateResumableUploadSession = (uploadSessionId, body) => {
    try {
        return got.post([process.env.META_API_URI, uploadSessionId].join("/"), { 
            headers: { 
                'Authorization': 'OAuth ' + process.env.META_ACCESS_TOKEN,
                'Accept': '*/*',
                'file_offset': 0
            },
            body: body,
            responseType: 'json',
            throwHttpErrors: false
        });
    } catch (error) {
        return error;
    }
}

/**
 * CREATE TEMPLATE
 * https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates#components
 * https://developers.facebook.com/docs/whatsapp/business-management-api/message-templates/components
 * https://developers.facebook.com/docs/graph-api/reference/whats-app-business-account/message_templates/
 */
// CREATE TEMPLATE
exports.createWABANOTemplates = (body) => {
    try {
        return got.post([process.env.META_API_URI, process.env.META_BUSINESS_ACC_ID, "message_templates"].join("/"), { 
            headers: { 
                'Authorization': 'Bearer ' + process.env.META_ACCESS_TOKEN,
                'Accept': '*/*'
            },
            json: body,
            responseType: 'json',
            throwHttpErrors: false
        });
    } catch (error) {
        return error;
    }   
}