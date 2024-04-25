import { describe, it } from "node:test";
import request from "supertest";
import app from '../src/app';

describe("fish", () => {
    it("should create a new fish", async () => {
        await request(app)
            .post("/fishes")
            .send({
                name: "Coral fish",
                sku: "SLF-006",
                price: 100
            })
            .expect(201);
    });

    it("should all fish", async () => {
        await request(app)
            .get("/fishes")
            .expect(200);
    })
})