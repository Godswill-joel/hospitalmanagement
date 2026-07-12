import jwt from "jsonwebtoken";
import Doctor from "../models/Doctors";


const JWT_SECRET = process.env.JWT_SECRET;

export default async function doctorAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    // check Token
    if (!authHeader || authHeader.startwith("Bearer ")) {
        res.status(401).json({
            success: false,
            message: "Doctor not authorised, token missing"
        });
        return
    }

    const token = authHeader.split(" ")[1];

    try {
        // verify payload
        const payload = jwt.verify(token, JWT_SECRET)

        if (payload.role && payload.role !== "doctor") {
            res.status(403).json({
                sucess: false,
                message: "Access Denied"
            });
            return
        }

        // fetch Doctor
        const doctor = await Doctor.findById(payload.id).select("-password");

        if (!doctor) {
            res.status(401).json({
                success: false,
                messsage: "Doctor Not Found",
            });
            return
        }

        // Attach Doctor to req
        req.doctor = doctor;
        next();

    } catch (err) {
        console.error("Doctor JWT Verification failed", err)
        return res.status(401).json({
            success: false,
            message: "token invalid or Expired"
        })
    }
}