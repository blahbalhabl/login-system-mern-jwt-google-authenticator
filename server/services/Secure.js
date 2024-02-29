/**
 * @description - Service for creating secret and QR code\
 * @requires speakeasy
 * @requires qrcode
 * @requires UsersModel
 */

const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

const secure = {
    /* <=============== Generate Secret ===============> */
    generateSecret: () => {
        return speakeasy.generateSecret({length: 20}).base32;
    },
    /* <=============== Generate QR Code ===============> */
    generateQRCode: (email, secret) => {
        const issuer = 'Login System';
        return qrcode.toDataURL(`otpauth://totp/${issuer}:${email}?secret=${secret}&issuer=${issuer}`);
    },
};

module.exports = secure;