import { describe, it } from "node:test";
import request from "supertest";
import app from '../src/app';

describe("fish", () => {
    it("should create a new fish", async () => {
        await request(app)
            .post("/fishes")
            .send({
                name: "Halibut",
                sku: "SLF-013",
                price: 280
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
            .get("/fishes/clwdqzsfy00005rkohynds0zp")
            .expect(200);
    })

    it("should update specific fish", async () => {
        await request(app)
            .put("/fishes/clwdqzsfy00005rkohynds0zp")
            .send({
                price: 250
            })
            .expect(200);
    })

    it("should delete specific fish", async () => {
        await request(app)
            .delete("/fishes/clvfiluqj0000l4hrdairr1io")
            .expect(200);
    })
})