"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkAuthorization = (...roles) => {
    return (req, res, next) => {
        try {
            const user = req.user;
            if (!user || !user.role) {
                console.info(`Unauthorized access attempt by ${user === null || user === void 0 ? void 0 : user.name}`);
                return res.status(401).json({ message: "Unauthorized" });
            }
            const userRole = user.role;
            if (!roles.includes(userRole)) {
                console.info(`Unauthorized access for role: ${userRole} by ${user.name}`);
                return res.status(403).json({ message: "Forbidden" });
            }
            next();
        }
        catch (error) {
            console.error("Authorization Error:", error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };
};
exports.default = checkAuthorization;
