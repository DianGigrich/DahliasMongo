
const router = require('express').Router();
const { User, Dahlias } = require('../../models');


router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => {
            res.json(err)
            console.log(err)
        })
})

router.get('/:userId', (req, res) => {
    User.findOne({ _id: req.params.userId })
        .populate('dahlias')
        .populate('friends')
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
})

// create new user
router.post('/', (req, res) => {
    User.create(req.body)
        .then(user => res.json(user))
        .catch(err => {
            res.json(err)
            console.log(err)
        })
})

// update user
router.put('/:userId', (req, res) => {
    User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true })
        .then(user => !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
}),

    // delete user
    router.delete('/:userId', (req, res) => {
        User.findByIdAndDelete(req.params.userId)
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : Dahlias.deleteMany({ _id: user.dahlias })
            )
            .then(() => res.json({ message: 'User and dahlias deleted!' }))
            .catch((err) => res.status(500).json(err));
    })




module.exports = router;