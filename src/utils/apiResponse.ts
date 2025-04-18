export const successResponse = <T>(data: T, message = "Success") => ({
  success: true as const,
  message,
  data,
});

export const errorResponse = (
  message = "Something went wrong",
  errors?: unknown
) => ({
  success: false as const,
  message,
  errors: errors || null,
});