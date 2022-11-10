const { Router } = require("express");
const { Review } = require("../db");
const { Op } = require("sequelize");
const { API_KEY } = process.env;
const router = Router();

const capitalize = (fullName) =>
  fullName
    .split(" ")
    .map((name) => `${name[0].toUpperCase()}${name.slice(1)}`)
    .join(" ");

router.post("", async (req, res) => {
  if (API_KEY === req.query.apikey) {
    try {
      const {
        clientId,
        professionalId,
        review,
        rating,
        picture,
        isProfessional,
      } = req.body;
      if (!clientId || !professionalId || !review || !rating) {
        return res.status(400).json({ message: "missing value detected." });
      } else {
        const newReview = await Review.create({
          clientId,
          professionalId,
          review,
          rating,
          picture,
          isProfessional,
        });
        return res.status(201).json({ message: "New review created." });
      }
    } catch (e) {
      return res.status(400).json(e);
    }
  } else {
    return res.status(400).json({ message: "Wrong or missing API Key." });
  }
});

router.get("", async (req, res) => {
  if (API_KEY === req.query.apikey) {
    try {
      const allReviews = await Review.findAll();
      return res.json(allReviews);
    } catch (e) {
      return res.status(404).json(e);
    }
  } else {
    return res.status(400).json({ message: "Wrong or missing API Key." });
  }
});

router.get("/name/:clientId", async (req, res) => {
  if (API_KEY === req.query.apikey) {
    const { clientId } = req.params;
    // capitalize(review)
    try {
      const findReview = await Review.findAll({
        where: {
          clientId: clientId,
        },
      });
      if (findReview.length === 0) {
        res.status(404).json({ message: "Review not found." });
      } else {
        res.status(200).json(findReview);
      }
    } catch (e) {
      res.status(404).json({ message: "Wrong or missing API key." });
    }
  }
});

router.get("/name/:professionalId", async (req, res) => {
  if (API_KEY === req.query.apikey) {
    const { professionalId } = req.params;
    // capitalize(review)
    try {
      const findReview = await Review.findAll({
        where: {
          professionalId: professionalId,
        },
      });
      if (findReview.length === 0) {
        res.status(404).json({ message: "Review not found." });
      } else {
        res.status(200).json(findReview);
      }
    } catch (e) {
      res.status(412).json({ message: "Wrong or missing API key." });
    }
  }
});

router.delete("/id/:id", async (req, res) => {
  if (API_KEY === req.query.apikey) {
    try {
      const { id } = req.params;
      if (!id) res.status(404).json({ message: "Missing value detected." });
      if (isNaN(id)) res.status(412).json({ message: "ID must be a number." });
      const deleteReview = await Review.findOne({
        where: {
          id: id,
        },
      });
      if (deleteReview) {
        Review.destroy({
          where: {
            id: id,
          },
        });
        return res.status(204).json({ message: "Review deleted." });
      } else res.status(404).json({ message: "Review not found." });
    } catch (e) {
      return res.status(400).json(e);
    }
    return res.status(412).json({ message: "Wrong or missing API Key." });
  }
});

module.exports = router;
