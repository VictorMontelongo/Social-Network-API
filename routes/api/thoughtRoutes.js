const router = require('express').Router();

// Import any controllers needed here
const { getAllThoughts, getThoughtById, createThought, updateThoughtById, deleteThoughtById, addReaction, deleteReaction } = require('../../controllers/thought-controller');

// Declare the routes that point to the controllers above
//Get Api 
router.route("/")
  .get(getAllThoughts)
  .post(createThought);

router.route("/:thoughtid")
  .get(getThoughtById)
  .put(updateThoughtById)
  .delete(deleteThoughtById)

router.route("/:id/reaction/:reactionId")
  .post(addReaction)
  .delete(deleteReaction)


module.exports = router;