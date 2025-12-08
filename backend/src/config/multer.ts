import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.resolve(__dirname, "..", "..", "uploads");
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

export const multerConfig = {
    dest: uploadDir,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
            const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
            cb(null, fileName);
        }
    }),
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
    fileFilter: (req: any, file: any, cb: any) => {
        const allowedMimes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "application/pdf"
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type. Only JPG, PNG and PDF are allowed."));
        }
    }
};