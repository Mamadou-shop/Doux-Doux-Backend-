const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/", async (req, res) => {
    try {
        const csvPath = path.join(__dirname, "../produits.csv");
        
        if (!fs.existsSync(csvPath)) {
            return res.status(404).json({ error: "Fichier produits.csv introuvable." });
        }

        const csvData = fs.readFileSync(csvPath, "utf-8");
        const lines = csvData.split(/\r?\n/);
        
        const products = [];

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            // Utilisation d'une regex robuste pour capturer les blocs entre guillemets ET les champs non entourés
            const matches = line.match(/"([^"]*)"|([^,]+)/g);
            
            if (!matches || matches.length < 4) continue;

            // Nettoyage des guillemets autour de chaque élément trouvé
            const cleanFields = matches.map(field => field.replace(/^"|"$/g, "").trim());

            // Structure basée sur ton fichier : Name (0), id (1), price (2), category (3), image (4)
            const nameField = cleanFields[0] || "Produit sans nom";
            const idField = cleanFields[1] || `local_${i}`;
            let priceField = cleanFields[2] || "0";
            
            // L'image est TOUJOURS le dernier élément de la ligne
            const imageField = cleanFields[cleanFields.length - 1] || "";

            // Nettoyage du prix (ex: "15000,0" -> "15000.0" -> 15000)
            const cleanPrice = parseFloat(priceField.replace(",", ".")) || 0;
            const customId = idField.replace(",", "-");

            products.push({
                id: customId,
                name: String(nameField),
                price: cleanPrice,
                imageUrl: String(imageField)
            });
        }

        res.json(products);
    } catch (error) {
        console.error("Erreur lecture données locales :", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
