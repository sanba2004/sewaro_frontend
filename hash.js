const bcrypt = require('bcryptjs');
const password = 'your_secret_admin_password'; // Change this!

bcrypt.hash(password, 10, (err, hash) => {
    console.log("Your Secure Hash:");
    console.log(hash);
});