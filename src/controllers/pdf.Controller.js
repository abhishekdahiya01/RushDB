import db from "../config/rushdb.js";
import fs from "fs/promises";

// Upload PDF

export const uploadPDF = async (req, res) => {
    let filePath;

    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "PDF file is required"
            });
        }

        filePath = req.file.path;

        // Check registered user
        const user = await db.records.findOne({
            labels: ["USER"],
            where: {
                email: email
            }
        });

        if (!user) {
            await fs.unlink(filePath);
            return res.status(404).json({
                success: false,
                message: "User not registered with this email"
            });
        }

        // Create PDF record
        const pdf = await db.records.create({
            label: "PDF",
            data: {
                fileName: req.file.originalname,
                storedFileName: req.file.filename,
                filePath: filePath,
                mimeType: req.file.mimetype,
                fileSize: req.file.size,
                uploadedAt: new Date().toISOString()
            }
        });

        // Create USER -> PDF relationship
        await user.attach(pdf, {
            type: "UPLOADED",
            direction: "out"
        });

        return res.status(201).json({
            success: true,
            message: "PDF uploaded successfully",
            data: {
                pdf,
                userEmail: email
            }
        });

    } catch (error) {
        if (filePath) {
            await fs.unlink(filePath).catch(() => {});
        }

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};