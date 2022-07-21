const express = require('express');
const TestimonialController = require('../controllers/testimonials.controller');
const router = express.Router();

router.get('/testimonials', TestimonialController.getAllTestimonials);
router.get('/testimonials/random', TestimonialController.getRandomTestimonial);
router.get('/testimonials/:id', TestimonialController.getTestimonialById);
router.post('/testimonials', TestimonialController.createTestimonial);
router.put('/testimonials/:id', TestimonialController.updateTestimonial);
router.delete('/testimonials/:id', TestimonialController.deleteTestimonial);

module.exports = router;
