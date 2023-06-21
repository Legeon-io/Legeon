import MasterKeys from '../mongodb/models/masterkeys.js';
import crypto from 'crypto';
import passwordGenerator from 'password-generator';

const generateMasterKey = (encryptionPassword, salt) => {
    const key = crypto.pbkdf2Sync(encryptionPassword, salt, 100000, 32, "sha256");
    return key.toString("hex");
};

const encryptKey = (key, encryptionPassword) => {
    const iv = crypto.randomBytes(16); // Generate a random IV
    const cipher = crypto.createCipheriv("aes-256-cbc", encryptionPassword, iv);
    const encryptedKey = Buffer.concat([cipher.update(key), cipher.final()]);
    return {
        encryptedKey: encryptedKey.toString("hex"),
        iv: iv.toString("hex"),
    };
};

const generateStrongPassword = () => {
    const length = 32; // Desired length of the password
    const options = {
        uppercase: true,
        numbers: true,
        symbols: true
    };

    return passwordGenerator(length, options);
};

const decryptKey = (encryptedKey, encryptionPassword, iv) => {
    const decipher = crypto.createDecipheriv("aes-256-cbc", encryptionPassword, Buffer.from(iv, "hex"));
    const encryptedBuffer = Buffer.from(encryptedKey, "hex");
    const decryptedKey = Buffer.concat([decipher.update(encryptedBuffer), decipher.final()]);
    return decryptedKey.toString();
};

export const getEncryptedMasterKey = async (req, res) => {
    try {
        const { username } = req.body;

        // Check if the encrypted master key already exists for the username
        const existingKey = await MasterKeys.findOne({ username });

        if (existingKey) {
            const { encryptedKey, encryptionPassword } = existingKey;
            res.status(200).json({ encryptedKey, encryptionPassword });
            return;
        }

        // Generate a new master key and encrypt it
        const encryptionPassword = generateStrongPassword();
        // console.log("enc pass = ", encryptionPassword);
        const salt = crypto.randomBytes(16).toString("hex");
        // console.log("salt = ", salt);
        const masterKey = generateMasterKey(encryptionPassword, salt);
        console.log("master = ", masterKey);
        const { encryptedKey, iv } = encryptKey(masterKey, encryptionPassword);
        // console.log("enc master = ", encryptedKey);

        // Store the master key in database
        const masterKeyEntry = new MasterKeys({
            username: username,
            encryptedKey: encryptedKey,
            encryptionPassword: encryptionPassword,
            iv: iv,
        });

        await masterKeyEntry.save();
        res.status(201).json({ encryptedKey, encryptionPassword });
    } catch (error) {
        console.error("Error storing encrypted master key in MongoDB:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getDecryptedMasterKey = async (req, res) => {
    try {
        const { username } = req.body;

        // Check if the encrypted master key exists for the username
        const existingKey = await MasterKeys.findOne({ username });

        if (!existingKey) {
            res.status(404).json({ error: "Encrypted master key not found" });
            return;
        }

        const { encryptedKey, encryptionPassword, iv } = existingKey;

        // Decrypt the master key
        const decryptedKey = decryptKey(encryptedKey, encryptionPassword, iv);
        console.log("dec = ", decryptedKey);

        res.status(200).json({ decryptedKey });
    } catch (error) {
        console.error("Error decrypting master key:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};