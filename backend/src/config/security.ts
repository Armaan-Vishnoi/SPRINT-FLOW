import helmet from "helmet";

import rateLimit from "express-rate-limit";

import mongoSanitize from "mongo-sanitize";

// RATE LIMIT

export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  limit: 100,

  message: {
    success: false,

    message: "Too many requests, try later",
  },
});

// SECURITY HEADERS

export const securityHeaders = helmet();

// SANITIZE BODY

export const sanitize = (req: any, res: any, next: any) => {
  if (req.body) {
    req.body = mongoSanitize(req.body);
  }

  if (req.params) {
    req.params = mongoSanitize(req.params);
  }

  next();
};
