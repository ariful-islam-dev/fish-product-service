import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createFish, getFishById, getFishes } from "./controllers";
// import { createInventory, getInventories, getInventoryById, updateInventory } from "../../inventory/src/controllers";

const app = express();

app.use([express.json(), cors(), morgan("dev")]);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes
app.get("/fishes",getFishes );

app.post("/fishes", createFish );

app.get("/fishes/:id", getFishById );

app.put("/fishes/:id", (req, res)=>{
  res.status(200).json({
    code: 200,
    message: "Update Specific Fish",
    data: {}
  })
})
// 404 Error
app.use((req, res, next) => {
  res.status(404).json({ code: 404, message: " Resource Not Found" });
});
// Error
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ code: 500, message: "Internal Server Error" });
});

export default app;
