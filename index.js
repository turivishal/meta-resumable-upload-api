require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

const WAHelper = require("./whatsapp.helper");
const path = require("path");
const multer = require("multer");

// CONFIGURATION
const fileSize = 250; // 250MB
const fileTypes = /jpeg|jpg|png|mp4|pdf/;
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: (1024 * 1024 * fileSize) // 250 MB
    },
    fileFilter: async (req, file, cb) => {
        // VALIDATE FILE EXT
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (extname && file.mimetype) {
            cb(null, true);
        } else {
            cb(new Error(`Only ${fileTypes.toString()} extentions are allowed!`), false);
        }
    }
});

// UPLOAD MEDIA ROUTE
app.use('/uploadMedia', async (req, res) => {
    // UPLOAD
    upload.single('file')(req, res, async (error) => {
        // PROPABLY FILE SIZE ERROR
        if (error instanceof multer.MulterError) {
            // LOG ERROR, AND RESPONSE
            console.error(error);
            res.status(400).send({
                message: `Max file size ${fileSize} allowed!`
            });
        }
        // SOMETHING OTHER ERROR 
        else if (error) {
            // LOG ERROR, AND RESPONSE
            console.error(error);
            res.status(400).send({
                message: `Something went wrong please try again!`
            });
        }
        // FILE IS REQUIRED
        else if (!req.file) {
            // LOG ERROR, AND RESPONSE
            res.status(400).send({
                message: `File is required!`
            });
        }
        else {
            // CREATE SESSION
            let session = await WAHelper.createResumableUploadSession({
                file_length: req.file.size,
                file_name: req.file.originalname,
                file_type: req.file.mimetype
            });
            if (session.body.error) {
                // LOG ERROR, AND RESPONSE
                console.error(session.body.error);
                return res.status(400).send({
                    message: session.body.error.error_user_title ? session.body.error.error_user_title + ` (${session.body.error.error_user_msg})` : session.body.error.message
                });
            }
            //INITIATE UPLOAD
            let iupload = await WAHelper.initiateResumableUploadSession(session.body.id, req.file.buffer);
            if (iupload.body.h) {
                // SUCCESS RESPONSE
                console.error(iupload.body);
                return res.status(200).send({
                    message: "Uploaded!",
                    body: iupload.body
                });
            }
            // ERROR
            else if (iupload.body.error) {
                // LOG ERROR, AND RESPONSE
                console.error(iupload.body.error);
                return res.status(400).send({
                    message: iupload.body.error.error_user_title ? iupload.body.error.error_user_title + ` (${iupload.body.error.error_user_msg})` : iupload.body.error.message
                });
            }
            else {
                // LOG ERROR, AND RESPONSE
                console.error(iupload);
                return res.status(400).send({
                    message: "Something went wrong please try again!"
                });
            }
        }
    });
});

// CREATE TEMPLATE
app.use('/createTemplate', async (req, res) => {
    let template = await WAHelper.createWABANOTemplates(req.body);
    if (template.body.id) {
        return res.status(200).send({
            message: "Template Created!",
            body: template.body
        });
    }
    // ERROR
    else if (template.body.error) {
        // LOG ERROR, AND RESPONSE
        console.error(template.body.error);
        return res.status(400).send({
            message: template.body.error.error_user_title ? template.body.error.error_user_title + ` (${template.body.error.error_user_msg})` : template.body.error.message
        });
    }
    // LOG ERROR, AND RESPONSE
    console.error(template);
    return res.status(400).send({
        message: "Something went wrong please try again!"
    });
});

// SERVER LISTEN
const port = process.env.PORT;
app.listen(port, () => {
    console.info(`Listening on port ${port}...`)
}).on("error", (err) => {
    console.error(err.message);
});