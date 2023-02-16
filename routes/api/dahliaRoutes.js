
const router = require('express').Router();
const { Dahlias, User } = require('../../models');

  
router.get('/', (req, res) => {
    Dahlias.find()
        .then(dahlias => res.json(dahlias))
        .catch(err => {
            res.json(err)
            console.log(err)
        })
})

router.get('/:dahliaId', (req, res) => {
    Dahlias.findOne({ _id: req.params.dahliaId })
        .then((dahlia) =>
            !dahlia
                ? res.status(404).json({ message: 'No dahlia with that ID' })
                : res.json(dahlia)
        )
        .catch((err) => res.status(500).json(err));
})

// TODO: create dahlia shouldn't be tied to user
router.post('/', (req, res) => {
    console.log(req.body);
    Dahlias.create(req.body)
        .then(dahlia => {
            User.findByIdAndUpdate(req.body.userId,
                {
                    $addToSet: { dahlias: dahlia._id }
                },
                { new: true })
                .then((user) =>
                    !user
                        ? res.status(404).json({ message: 'No dahlias with that ID' })
                        : res.json(dahlia)
                )
                .catch((err) => res.status(500).json(err));
        })
})

router.put('/:dahliaId', (req, res) => {
    Dahlias.findByIdAndUpdate(
        { _id: req.params.dahliaId },
        { $set: req.body },
        { runValidators: true, new: true })
        .then(dahlia => !dahlia
            ? res.status(404).json({ message: 'No dahlia with that ID' })
            : res.json(dahlia)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
})



router.delete('/:dahliaId/:userId', (req, res) => {
    Dahlias.findByIdAndDelete(req.params.dahliaId)
        .then(dahlia => {
            !dahlia ? res.status(404).json({ message: 'No dahlias with that ID' }) : User.findByIdAndUpdate(req.params.userId, {
                $pull: { dahlias: req.params.dahliaId }
            }, { new: true })
                .then(user => !user
                    ? res.status(404).json({ message: 'No dahlias with that ID' })
                    : res.json(user))
        })
})




module.exports = router;