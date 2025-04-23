import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            error: "Validation failed",
            details: result.error.flatten().fieldErrors,
        });
    }

    // Optional: attach parsed data to req.body for cleaner controllers
    req.body = result.data;
    next();
};
