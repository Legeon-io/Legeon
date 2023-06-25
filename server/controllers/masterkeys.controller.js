import MasterKeys from '../mongodb/models/masterkeys.js';
import HSM from '../mongodb/models/hsm-client.js';
import crypto from 'crypto';
import passwordGenerator from 'password-generator';
import axios from 'axios';

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

const generateStrongPassword = (username) => {
    const length = 32; // Desired length of the password
    const options = {
        uppercase: true,
        numbers: true,
        symbols: true
    };

    const password = passwordGenerator(length, options);
    return password;
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
            const { encryptedKey } = existingKey;
            res.status(200).json({ message: "Encrypted master key exists" });
            return;
        }

        // Generate a new master key and encrypt it
        const encryptionPassword = generateStrongPassword(username);
        // console.log("enc pass = ", encryptionPassword);
        const salt = crypto.randomBytes(16).toString("hex");
        // console.log("salt = ", salt);
        const masterKey = generateMasterKey(encryptionPassword, salt);
        // console.log("master = ", masterKey);
        const { encryptedKey, iv } = encryptKey(masterKey, encryptionPassword);
        // console.log("enc master = ", encryptedKey);

        // Store the master key in database
        const masterKeyEntry = new MasterKeys({
            username: username,
            encryptedKey: encryptedKey,
            iv: iv,
        });

        const hsmEntry = new HSM({
            username: username,
            encryptionPassword: encryptionPassword,
        })

        await masterKeyEntry.save();
        await hsmEntry.save();
        res.status(201).json({ message: "Encrypted master key is created successfully", masterKey });
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
            // Trigger the getEncryptedMasterKey API to generate the encrypted master key
            const response = await axios.post(`${process.env.DATABASE_SERVER_URL}/api/masterkeys/encryptMasterKey`, { username });
            res.status(200).json({ message: "Encryption is successful and created", decryptedKey: response.data.masterKey });
            return;
        }

        const existingHSM = await HSM.findOne({ username });
        if (!existingHSM) {
            res.status(404).json({ error: "Encryption password not found" });
            return;
        }


        const { encryptedKey, iv } = existingKey;
        const { encryptionPassword } = existingHSM;

        // Decrypt the master key
        const decryptedKey = decryptKey(encryptedKey, encryptionPassword, iv);
        // console.log("dec = ", decryptedKey);

        res.status(200).json({ message: "Decryption is successful", decryptedKey: decryptedKey });
    } catch (error) {
        console.error("Error decrypting master key:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};