// jwt from json token
//vaildate header token
import jwt from "jsonwebtoken"

 const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"]

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ code: 401, message: "No token provided" })
        }

        const token = authHeader.split(" ")[1].replace(/"/g, "")
        
        if (!process.env.JWT_ACCESS_SECRET) {
            console.log("JWT_ACCESS_SECRET not found in environment")
            return res.status(500).json({ message: "Server configuration error" })
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        } catch (accessError) {
            // Try refresh token secret if access token fails
            decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        }
        req.user = { id: decoded.id }

        next()
    } catch (error) {
        console.log(error)
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "invalid token", error: error.message })
        }
        return res.status(500).json({ message: "internal server error", error: error.message })
    }
}
export default verifyToken;