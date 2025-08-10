const express = require('express');
const router = express.Router();
const { 
    createGalleryItem, 
    getGalleryItems, 
    updateGalleryItem, 
    deleteGalleryItem 
} = require('../../controllers/adminController/galleryController');

// അഡ്മിൻ പാനലിൽ നിന്ന് ഡാറ്റ മാനേജ് ചെയ്യാനുള്ള റൂട്ടുകൾ
router.route('/')
    .post(createGalleryItem) // പുതിയ ഐറ്റം ചേർക്കാൻ
    .get(getGalleryItems);    // എല്ലാ ഐറ്റങ്ങളും ലഭിക്കാൻ

router.route('/:id')
    .put(updateGalleryItem)   // അപ്‌ഡേറ്റ് ചെയ്യാൻ
    .delete(deleteGalleryItem); // ഡിലീറ്റ് ചെയ്യാൻ

module.exports = router;