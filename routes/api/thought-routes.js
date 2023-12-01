const router = require('express').Router();

// Import any controllers needed here
const { getAllThoughts, getThoughtById, createThought, updateThoughtById, deleteThoughtById, addReaction, deleteReaction } = require('../../controllers/thought-controller');

// Declare the routes that point to the controllers above
router.get("/", async (req, res) => {
  try {
    const payload = await getAllThoughts()
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.get("/:thoughtId", async (req, res) => {
  try {
    const payload = await getThoughtById(req.params.id)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.post("/", async (req, res) => {
  try {
    const payload = await createThought(req.body)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.put("/:thoughtId", async (req, res) => {
  try {
    const payload = await updateThoughtById(req.params.id, req.body)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.delete("/:thoughtId", async (req, res) => {
  try {
    const payload = await deleteThoughtById(req.params.id)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.post("/:thoughtId/reactions", async (req, res) => {
  try {
    const payload = await addReaction(req.body)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message })
  }
})

router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
  try {
    const payload = await deleteReaction(req.params.id)
    res.status(200).json({ result: "success", payload })
  } catch (err) {
    res.status(500).json({ result: "error", payload: err.message })
  }
})


module.exports = router;