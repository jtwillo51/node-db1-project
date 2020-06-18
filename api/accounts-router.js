const express = require("express");
const db = require("../data/dbConfig");
const { as } = require("../data/dbConfig");

const router = express.Router();

router.get("/", async (req, res, next)=> {
    try {
        const accounts = await db.select("*").from("accounts")
    res.json(accounts)
    } catch (err){
        next(err)
    }
})

router.get("/:id", async (req, res, next)=>{
    try {
        const account = await db.select("*").from("accounts").where("id", req.params.id)
        res.json(account)
    } catch(err){
        next(err)
    }
})

router.post("/", async (req, res, next)=>{
    try {
        const payload = {
            name: req.body.name, 
            budget: req.body.budget
        }
        const [newAcc] = await db.insert(payload).into("accounts");
        const acc = await db.select("*").from("accounts").where("id", newAcc)
        res.status(201).json(acc)
    } catch(err){
        next(err)
    }
})

router.put("/:id", async (req, res, next)=>{
    try {
        const payload = {
            name: req.body.name, 
            budget: req.body.budget
        }
        await db("accounts").update(payload).where("id", req.params.id);
        const acc = await db.select("*").from("accounts").where("id", req.params.id)
        res.json(acc)
    } catch(err){
        next(err)
    }
})

router.delete("/:id", async (req, res, next)=>{
    try{
        await db("accounts").where("id", req.params.id).del()
        res.status(204).end()
    } catch(err){next(err)}
})

module.exports = router;