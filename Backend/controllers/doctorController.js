import Doctor from "../models/Doctors";
import { uploadToCloudinary, deleteFromcloudinanry } from "../utilis/cloudinary";


//Helper functions
//this function will convert time to number of minutes since midnight ;
const parseTimeToMinutes = (t = "") => {
    const [time = "0:00", ampm = ""] = (t || "").split(" ");
    const [hh = 0, mm = 0] = time.split(":").map(Number);
    let h = hh % 12;
    if ((ampm || "").toUpperCase() === "PM") h += 12;
    return h * 60 + (mm || 0);
};

//this function wil remove dupplicate slot and return the slot filter by time 
function dedupeAndSortSchedule(schedule = {}) {
    const out = {};
    Object.entries(schedule).forEach(([date, slots]) => {
        if (!Array.isArray(slots)) return;
        const uniq = Array.from(new Set(slots));
        uniq.sort((a, b) => parseTimeToMinutes(a) - parseTimeToMinutes(b));
        out[date] = uniq;
    });
    return out;
}

//this function accept the json string 
function parseScheduleInput(s) {
    if (!s) return {};
    if (typeof s === "string") {
        try {
            s = JSON.parse(s);
        } catch {
            return {};
        }
    }
    return dedupeAndSortSchedule(s || {});
}

//this function will convert Doctor data into a plain text 
function normalizeDocForClient(raw = {}) {
    const doc = { ...raw };

    // convert Mongoose Map to plain object
    if (doc.schedule && typeof doc.schedule.forEach === "function") {
        const obj = {};
        doc.schedule.forEach((val, key) => {
            obj[key] = Array.isArray(val) ? val : [];
        });
        doc.schedule = obj;
    } else if (!doc.schedule || typeof doc.schedule !== "object") {
        doc.schedule = {};
    }

    doc.availability = doc.availability === undefined ? "Available" : doc.availability;
    doc.patients = doc.patients ?? "";
    doc.rating = doc.rating ?? 0;
    doc.fee = doc.fee ?? doc.fees ?? 0;

    return doc;
}

//to create Doctor 
export async function createDoctor(req, res) {
    try {
        const body = req.body || {};
        if (!body.email || !body.password || !body.name) {
            return res.status(400).json({
                success: false,
                message: "Name,email and password are required .",
            })
        }
        const emailLC = (body.email || "").toLowerCase();
        if(await Doctor.findOne({email: emailLC})) {
            return res.status(409).json({
                success:false,
                message:"Email already in use. "
            })
        }
    } catch (error) {

    }
}
