const router = require('express').Router();
const Workout = require('../db').import('../models/workout')
let validateSession = require('../middleware/validate-session');

router.get('/', (req, res) => {
    workOut.findAll()
    .then(log => res.status(200).json(log))
    .catch(err => res.status(500).json({
        error: err
    }))
})



router.post('/', validateSession, (req, res) => {
    const workout = {
        workoutDescription: req.body.description,
        workoutDefinition: req.body.definition,
        result: req.body.result,
        ownerId: req.body.ownerID
    }

    Workout.create(workOut)
        .then(log => res.status(200).json(log))
        .catch(err => res.json(req.errors))
})

router.get('/:id', validateSession), (req, res) => {
    Workout.findOne({ where: { id: req.params.id} })
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err}))
}

router.put('/:id', validateSession), (req, res) => {
    Workout.update(req.body, {where: {id: req.params.id}})
        .then(log => res.status(200).json(log))
        .catch(err => res.json(req.errors))
}

router.delete('/:id', validateSessions, (req, res) => {
    Workout.destroy({ where: {id: req.params.id}})
    .then(log => res.status(200).json(log))
    .catch(err => res.json({error: err}))
})

module.exports = router;