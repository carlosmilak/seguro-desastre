import HelpRequest from "../models/HelpRequest.js";

export const createHelpRequest = async (req, res) => {
    try {
        const { userId, type, description, lat, lng } = req.body;

        // Validação básica
        if (!type || !lat || !lng) {
            return res.status(400).json({ msg: "Dados incompletos" });
        }

        const help = await HelpRequest.create({
            userId,
            type,
            description,
            lat,
            lng,
            createdAt: new Date()
        });

        res.json({ msg: "Pedido de ajuda criado com sucesso!", help });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getNearby = async (req, res) => {
    try {
        const { lat, lng } = req.query;

        if (!lat || !lng) {
            return res.status(400).json({ msg: "Coordenadas ausentes" });
        }

        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);

        const maxDistance = 1; // ~5km

        const results = await HelpRequest.find({
            lat: { $gte: latitude - maxDistance, $lte: latitude + maxDistance },
            lng: { $gte: longitude - maxDistance, $lte: longitude + maxDistance }
        });

        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
