import { ApiError } from '../utils/ApiError.js';
export const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal Server Error";
    if (err instanceof ApiError) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err.name === "PrismaClientKnownRequestError") {
        statusCode = 400;
        const prismaErr = err;
        if (prismaErr.code === 'P2002') {
            message = `Dữ liệu bị trùng lặp: ${prismaErr.meta?.target}`;
        }
        else {
            message = `Lỗi Database (${prismaErr.code}): ${prismaErr.message.split('\n').pop()}`;
        }
        console.error("❌ [Prisma Error]:", err);
    }
    else {
        console.error("❌ [Server Error]:", err);
        message = err.message || "Lỗi không xác định ở Server";
    }
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message,
        stack: err.stack
    });
};
//# sourceMappingURL=errorHandler.js.map