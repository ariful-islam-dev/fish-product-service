import { describe, it } from "node:test";
import request from "supertest";
import app from '../src/app';

describe("fish", () => {
    it("should create a new fish", async () => {
        await request(app)
            .post("/fishes")
            .send({
                name: "Batasio fish",
                sku: "SLF-007",
                price: 150
            })
            .expect(201);
    });

    it("should all fish", async () => {
        await request(app)
            .get("/fishes")
            .expect(200);
    })

    it("should get specific fish", async () => {
        await request(app)
            .get("/fishes/clvfl2cy000008tkguzv4xcen")
            .expect(200);
    })
})