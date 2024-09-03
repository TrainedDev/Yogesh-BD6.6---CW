const express = require("express");
const app = express();
const { getAllEmployees, getEmployeeById } = require("./controller")

app.get("/employees", async (req, res) => {
    const result = getAllEmployees();
    if(!result) return {};
    res.status(200).json(result);
});

app.get("/employees/details/:id", async (req, res) => {
    const result = getEmployeeById(req.params.id);
    if(!result) return {};
    res.status(200).json(result);
});

app.get("/", (req, res) => res.send("Server IS Live"));

module.exports = { app };