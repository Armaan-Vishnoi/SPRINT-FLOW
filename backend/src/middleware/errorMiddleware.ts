export const errorHandler = (err: any, req: any, res: any, next: any) => {
  console.error(err);

  return res.status(err.status || 500).json({
    success: false,

    message: err.message || "Server Error",
  });
};
