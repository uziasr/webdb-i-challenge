const express = require('express')

const knex = require('../data/dbConfig')
const router = express.Router()

router.get('/', (req,res)=>{
    knex
    ('accounts')
    .then(accounts=>{
        res.json(accounts)
    })
    .catch(err=>{
        res.status(500).json({error:'something went wrong'})
    })
})

router.get('/:id', (req,res)=>{
    knex
    .select('*')
    .from('accounts')
    .where('id', '=', req.params.id)
    .then(accounts=>{{
        accounts.length>0? res.status(200).json(accounts): res.status(404).json({error:"that id does not exist"})
    }})
    .catch(err=>{
        res.status(500).json({error: 'something went wrong'})
    })
})


router.post('/', (req,res)=>{
    knex('accounts')
    .insert({name: req.body.name, budget: req.body.budget})
    .then(accounts=>{
        res.status(200).json({...req.body, ...req.body.id})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({error: 'something went wrong, make sure a use with this name does not exist'})
    })
})

router.put('/:id', (req,res)=>{
    knex('accounts')
    .where('id', '=', req.params.id)
    .update({name: req.body.name, budget: req.body.budget})
    .then(accounts=>{
        res.status(200).json({name: req.body.name, budget: req.body.budget})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({error:'something went wrong'})
    })
})

router.delete('/:id', (req,res)=>{
    console.log(req.params.id)
    knex('accounts')
    .where({id: req.params.id})
    .del()
    .then(accounts=>{
        accounts?res.status(200).json({success:`The user with the ID of ${req.params.id} was deleted`}):res.status(404).json({error:`The ID ${req.params.id} does not exist`})
    })
    .catch(err=>{
        res.status(500).json({error: "something went wrong"})
    })
})

module.exports = router;