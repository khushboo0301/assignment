import { AppDataSource } from "../config/db";

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.dropDatabase();
  await AppDataSource.destroy();
});
