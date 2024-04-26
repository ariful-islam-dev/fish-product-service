import { describe, it } from "node:test";
import request from "supertest";
import app from '../src/app';

describe("fish", () => {
    it("should create a new fish", async () => {
        await request(app)
            .post("/fishes")
            .send({
                name: "Catfish",
                sku: "SLF-008",
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

    it("should update specific fish", async () => {
        await request(app)
            .put("/fishes/clvfl2cy000008tkguzv4xcen")
            .send({
                price: 250
            })
            .expect(200);
    })

    it("should delete specific fish", async () => {
        await request(app)
            .delete("/fishes/clvfl2cy000008tkguzv4xcen")
            .expect(200);
    })
})