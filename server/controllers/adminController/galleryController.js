const Gallery = require('../../models/Gallery');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../../public/uploads/gallery');
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// .single() എന്നതിന് പകരം .array() ആക്കി മാറ്റി. ഒരേ സമയം 10 ഫയലുകൾ വരെ അപ്‌ലോഡ് ചെയ്യാം.
const upload = multer({ storage: storage }).array('media', 10);

/**
 * @desc    Create new gallery items from multiple files
 * @route   POST /api/gallery
 */
exports.createGalleryItem = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'File upload error', error: err });
        }
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'Please upload at least one file.' });
        }

        const { title, description, category } = req.body;
        
        try {
            // അപ്‌ലോഡ് ചെയ്ത ഓരോ ഫയലിനും ഡാറ്റാബേസ് എൻട്രി തയ്യാറാക്കുന്നു
            const newItems = req.files.map(file => {
                const mediaType = file.mimetype.startsWith('image') ? 'image' : 'video';
                const mediaUrl = `/public/uploads/gallery/${file.filename}`;
                return {
                    title, // എല്ലാ ഫയലുകൾക്കും ഒരേ തലക്കെട്ട്
                    description, // എല്ലാ ഫയലുകൾക്കും ഒരേ വിവരണം
                    category, // എല്ലാ ഫയലുകൾക്കും ഒരേ കാറ്റഗറി
                    mediaType,
                    mediaUrl
                };
            });

            // എല്ലാ പുതിയ ഐറ്റംസും ഡാറ്റാബേസിലേക്ക് ഒരുമിച്ച് ചേർക്കുന്നു
            const createdItems = await Gallery.insertMany(newItems);
            res.status(201).json(createdItems);

        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    });
};


// --- ബാക്കിയുള്ള ഫംഗ്ഷനുകൾക്ക് മാറ്റമില്ല ---

/**
 * @desc    Get all gallery items
 * @route   GET /api/gallery
 */
exports.getGalleryItems = async (req, res) => {
    try {
        const items = await Gallery.find().sort({ createdAt: -1 });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

/**
 * @desc    Update a gallery item
 * @route   PUT /api/gallery/:id
 */
exports.updateGalleryItem = async (req, res) => {
    try {
        const item = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


/**
 * @desc    Delete a gallery item
 * @route   DELETE /api/gallery/:id
 */
exports.deleteGalleryItem = async (req, res) => {
    try {
        const item = await Gallery.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const filePath = path.join(__dirname, `../../${item.mediaUrl}`);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await item.deleteOne();
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};