// server/createAdmin.js
const mongoose = require('mongoose');
const User = require('./models/User'); // User model-ന്റെ ശരിയായ പാതയാണോ എന്ന് ഉറപ്പുവരുത്തുക
require('dotenv').config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        // 1. ഇവിടെ നിങ്ങളുടെ അഡ്മിൻ ഇമെയിൽ ഐഡി നൽകുക
        // ഉദാഹരണത്തിന്, ഞാൻ നിങ്ങളുടെ LoginPage.jsx-ലെ ഇമെയിൽ ഉപയോഗിക്കുന്നു
        const adminEmail = 'admin@skillvate.com';

        // ഈ ഇമെയിലിൽ ഒരു അഡ്മിൻ ഉണ്ടോ എന്ന് പരിശോധിക്കുന്നു
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log('ഈ ഇമെയിലിൽ ഒരു അഡ്മിൻ യൂസർ നിലവിലുണ്ട്. പുതിയത് ഉണ്ടാക്കുന്നില്ല.');
            mongoose.connection.close();
            return;
        }

        // 2. ഇവിടെ നിങ്ങളുടെ പുതിയ ശക്തമായ പാസ്‌വേഡ് നൽകുക
        // ഉദാഹരണത്തിന്, ഞാൻ നിങ്ങളുടെ LoginPage.jsx-ലെ പാസ്‌വേഡ് ഉപയോഗിക്കുന്നു
        const adminPassword = 'password123';

        console.log(`Creating admin user with email: ${adminEmail}...`);

        const admin = new User({
            email: adminEmail,
            password: adminPassword, // ഇത് ഡാറ്റാബേസിൽ സേവ് ചെയ്യുമ്പോൾ ഓട്ടോമാറ്റിക്കായി ഹാഷ് ആവും
            role: 'admin',
        });

        await admin.save();
        console.log('✅ അഡ്മിൻ യൂസർ വിജയകരമായി ഉണ്ടാക്കി!');

    } catch (error) {
        console.error('❌ അഡ്മിൻ ഉണ്ടാക്കുന്നതിൽ പിശക് സംഭവിച്ചു:', error.message);
    } finally {
        // ഡാറ്റാബേസ് കണക്ഷൻ ക്ലോസ് ചെയ്യുന്നു
        await mongoose.connection.close();
        console.log('Database connection closed.');
    }
};

// ഈ ഫംഗ്ഷൻ പ്രവർത്തിപ്പിക്കുന്നു
createAdmin();