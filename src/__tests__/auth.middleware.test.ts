import { mockAuth } from "../middlewares/auth.middleware";
import { Request, Response } from "express";

describe("mockAuth middleware", () => {
  it("should return 401 if no user-id header is present", () => {
    const req = { header: () => null } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn();

    mockAuth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Unauthorized: Missing user-id header",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next if user-id is present", () => {
    const req = {
      header: () => "123",
    } as unknown as Request;

    const res = {} as Response;
    const next = jest.fn();

    mockAuth(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
