"use strict";
// import nodemailer from 'nodemailer'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// export const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//         type: 'OAuth2',
//         user: process.env.EMAIL,
//         clientId: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_SECRET_ID,
//         refreshToken: '1//04XcUF_VqWKodCgYIARAAGAQSNwF-L9IreToyN64L7h7NGuOQpCoZgDa228vj8vBKqkXVKPDC8wLroE8B0WM7OsT7lsCrd_xtyiw',
//         accessToken: 'ya29.a0AVA9y1sjdEypKjunRy1_78LrQEwf_oyVtp4-LHzt_GjOzIiVhJA0mV-c29yTqDXdB3RUhKYZHWiTc020Nzw9FTgyJ5QGhtEByzySm3FNe6M4zLoQF9FFHPvZrfH6Nk9Y64mPavQX5_BRTE1izyX3D5-ZCtgxaCgYKATASAQASFQE65dr8wFUcduSPjXfrczcNwJn7sQ0163'
//     }
// });
// transporter.verify().then( ()=>{
//     console.log('Ready for send emails');
// })
const mail_1 = __importDefault(require("@sendgrid/mail"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mail_1.default.setApiKey(process.env.API_KEY_SEND_GRID);
exports.default = mail_1.default;
//# sourceMappingURL=mailer.js.map