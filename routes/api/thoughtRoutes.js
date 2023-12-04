const router = require('express').Router();

// Import any controllers needed here
const { getAllThoughts, getThoughtById, createThought, updateThoughtById, deleteThoughtById, addReaction, deleteReaction } = require('../../controllers/thought-controller');

// Declare the routes that point to the controllers above
//Get Api 
router.route("/")
  .get(getAllThoughts)
  .post(createThought);


router.route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThoughtById)
  .delete(deleteThoughtById)

router.route("/:thoughtId/reaction").post(addReaction)
router.route("/:thoughtId/reaction/:reactionId")
  .delete(deleteReaction)


module.exports = router;