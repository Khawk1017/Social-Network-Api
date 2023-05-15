const router = require('express').Router();
const {
    getThought,
    getSingleThought,
    createThought,
    deleteThought,
    updateThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtsController')

router.route('/').get(getThought).post(createThought);

router
    .route("/:id")
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

    router.route("/thoughtId/reactions").post(addReaction);

    router.route("/:thoughtId/reactions/reactionId").delete(removeReaction);

    module.exports = router;