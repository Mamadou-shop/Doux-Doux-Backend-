const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/product');

// Charger les variables d'environnement (.env)
dotenv.config();

// Connexion à MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connecté pour le remplissage de Doux-Doux..."))
    .catch(err => {
        console.error("Erreur de connexion :", err);
        process.exit(1);
    });

// Ton catalogue officiel de 54 articles adapté pour la base de données
const catalogueDouxDoux = [
    { name: "Écouteurs Bluetooth", price: 15000, category: "Equipement", imageUrl: "https://i.pinimg.com/1200x/f1/43/da/f143da04925eed47c677e31d5c2149d4.jpg", description: "Écouteurs Bluetooth haute qualité avec réduction de bruit et autonomie prolongée." },
    { name: "Montre Quartz", price: 10000, category: "Textile-Mode", imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600", description: "Montre Quartz élégante, idéale pour toutes les occasions." },
    { name: "Chargeur Rapide Type-C", price: 5000, category: "Equipement", imageUrl: "https://i.pinimg.com/1200x/e5/41/24/e54124d86ab0362870d271ffb78e275b.jpg", description: "Chargeur mural ultra rapide avec câble Type-C inclus." },
    { name: "Clé USB 64Go", price: 4500, category: "Equipement", imageUrl: "https://i.pinimg.com/736x/79/d6/bd/79d6bd675ec0090fdd54fc65ec9e00db.jpg", description: "Clé USB haute vitesse pour stocker et transférer vos documents en toute sécurité." },
    { name: "Powerbank 10000mAh", price: 12500, category: "Equipement", imageUrl: "https://i.pinimg.com/736x/48/bb/af/48bbaf4548f7c0d45026b3741bcf3132.jpg", description: "Batterie externe portable pour recharger vos appareils où que vous soyez." },
    { name: "Souris Sans Fil", price: 3500, category: "Equipement", imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80", description: "Souris optique sans fil ergonomique avec récepteur USB compact." },
    { name: "T-shirt Coton", price: 4000, category: "Textile-Mode", imageUrl: "https://i.pinimg.com/736x/27/4c/78/274c78deb9aaec0dbea20f60d6e8133a.jpg", description: "T-shirt 100% coton, doux, confortable et disponible en plusieurs tailles." },
    { name: "Casquette Sport", price: 2500, category: "Textile-Mode", imageUrl: "https://i.pinimg.com/1200x/18/e6/80/18e68041cd04caa5a17268a56cfac252.jpg", description: "Casquette ajustable idéale pour le sport et les sorties en plein air." },
    { name: "Coque iPhone", price: 3000, category: "Equipement", imageUrl: "https://i.pinimg.com/1200x/27/90/e4/2790e4a0d84d5a72ba8a66ff7a986f99.jpg", description: "Coque de protection antichoc élégante pour protéger votre smartphone." },
    { name: "Sac à dos USB", price: 15000, category: "Textile-Mode", imageUrl: "https://i.pinimg.com/736x/36/18/69/36186951c2ef99813ddf669516540d1a.jpg", description: "Sac à dos urbain avec port USB de recharge intégré." },
    { name: "Ring Light Selfie", price: 8500, category: "Equipement", imageUrl: "https://i.pinimg.com/736x/ac/71/3a/ac713afa1cadb288340af4542a0e1213.jpg", description: "Anneau lumineux LED avec trépied pour des vidéos et photos parfaites." },
    { name: "Support Téléphone Auto", price: 2000, category: "Equipement", imageUrl: "https://i.pinimg.com/1200x/01/c9/ad/01c9ad11758dc615de1b3bc90e15832e.jpg", description: "Support de fixation stable pour grille d'aération de voiture." },
    { name: "Écran de protection", price: 1000, category: "Equipement", imageUrl: "https://i.pinimg.com/1200x/ff/8c/47/ff8c4742aa796f4b51d25de67d579364.jpg", description: "Film en verre trempé ultra résistant contre les rayures." },
    { name: "Enceinte Mini", price: 7000, category: "Equipement", imageUrl: "https://www.rekfi.com/storage/2024/07/Enceinte-Portable-Bluetooth-Tronsmart-T7-mini-GRIS.jpg", description: "Haut-parleur Bluetooth portable compact offrant un son puissant." },
    { name: "Câble HDMI 2m", price: 3500, category: "Equipement", imageUrl: "https://i.pinimg.com/1200x/f9/fa/e4/f9fae45e903d9fe2c73be22fb91ccc5b.jpg", description: "Câble HDMI haute vitesse compatible 4K pour écrans et projecteurs." },
    { name: "Clavier Bureautique", price: 6500, category: "Equipement", imageUrl: "https://i.pinimg.com/736x/a2/b2/af/a2b2af4c5cc18b7f134d8b472384626a.jpg", description: "Clavier filaire confortable pour une utilisation quotidienne au bureau." },
    { name: "Ventilateur USB", price: 4500, category: "Equipement", imageUrl: "https://i.pinimg.com/736x/69/80/07/698007602bc12b99d2fdb06687f05dd4.jpg", description: "Mini ventilateur de bureau orientable et silencieux à brancher sur USB." },
    { name: "Lunettes de soleil", price: 5000, category: "Textile-Mode", imageUrl: "https://i.pinimg.com/1200x/09/f6/89/09f689dac200296080a6f7831af3def4.jpg", description: "Lunettes de soleil tendance avec protection UV optimale." },
    { name: "Trépied Flexible", price: 4000, category: "Equipement", imageUrl: "https://i.pinimg.com/1200x/cd/01/47/cd01476131736bc70ddd2059c9290565.jpg", description: "Trépied de style pieuvre pour fixer votre smartphone n'importe où." },
    { name: "Ampoule LED Connectée", price: 9000, category: "Equipement", imageUrl: "https://i.pinimg.com/736x/6f/f3/6b/6ff36b1029308d3590d52060f21c188f.jpg", description: "Ampoule intelligente RGB contrôlable par smartphone ou commande vocale." },
    { name: "Parfum Homme 50ml", price: 12000, category: "Textile-Mode", imageUrl: "https://i.pinimg.com/736x/ac/6e/7c/ac6e7c34bb818963af1d1bce9752a19f.jpg", description: "Eau de parfum avec des notes boisées et fraîches de longue durée." },
    { name: "Crème Hydratante", price: 3500, category: "Textile-Mode", imageUrl: "https://i.pinimg.com/736x/8e/bc/55/8ebc5596743eb7221c2d1878c3d4492b.jpg", description: "Soing hydratant intense pour protéger et nourrir la peau." },
    { name: "Baskets Urbaines", price: 18500, category: "Textile-Mode", imageUrl: "https://i.pinimg.com/736x/f1/eb/a2/f1eba2da56e538a8b38ed46193bb7648.jpg", description: "Chaussures de sport au design urbain moderne et confortable." },
    { name: "Adaptateur Secteur", price: 2500, category: "Equipement", imageUrl: "https://i.pinimg.com/1200x/16/fa/be/16fabe45085600244c7f5bf32675ea04.jpg", description: "Bloc de charge secteur universel compatible avec tous vos câbles USB." },
    { name: "Gourde Isotherme", price: 6000, category: "Equipement", imageUrl: "https://i.pinimg.com/1200x/ad/90/6c/ad906c92e7e5fce93b92268928bad22e.jpg", description: "Gourde en acier inoxydable gardant vos boissons chaudes ou froides." },
    { name: "Tapis de souris XXL", price: 5500, category: "Equipement", imageUrl: "https://i.pinimg.com/1200x/95/6e/b3/956eb31db7e85e26175700dce546b700.jpg", description: "Grand tapis de bureau pour clavier et souris offrant une glisse parfaite." },
    { name: "Micro Cravate", price: 4500, category: "Equipement", imageUrl: "https://i.pinimg.com/736x/dd/3b/8f/dd3b8f25c2aecc3cf17cd52b7cb38a0a.jpg", description: "Microphone cravate filaire idéal pour des enregistrements clairs sur smartphone." },
    { name: "Manette PC/Android", price: 11000, category: "Equipement", imageUrl: "https://i.pinimg.com/736x/28/8e/29/288e29982e1cdfa01e1aba6b62e74d3c.jpg", description: "Manette de jeu ergonomique compatible avec ordinateurs et smartphones Android." },
    { name: "Webcam HD", price: 14500, category: "Equipement", imageUrl: "https://dakarstock.com/wp-content/uploads/2024/04/logitech-webcam-c920-hd-pro-2.jpg", description: "Webcam haute définition idéale pour les visioconférences et le streaming." },
    { name: "Répéteur WiFi", price: 13000, category: "Equipement", imageUrl: "https://i.pinimg.com/736x/c2/4b/32/c24b32f44fad8b40c6d7d4e923ddebf9.jpg", description: "Amplificateur de signal WiFi pour étendre la couverture internet chez vous." },
    { name: "Livre de poche", price: 3000, category: "Equipement", imageUrl: "https://i.pinimg.com/736x/df/27/c9/df27c9b5c6437116b4c94b0d5f9bc1e2.jpg", description: "Livre captivant de format de poche à emporter partout." },
    { name: "Porte-monnaie Cuir", price: 7500, category: "Textile-Mode", imageUrl: "https://i.pinimg.com/736x/95/d7/c0/95d7c0bb7a3f211b5634a7b02c4b9fd2.jpg", description: "Porte-monnaie en cuir véritable compact avec plusieurs compartiments." },
    { name: "Ceinture Homme", price: 4500, category: "Textile-Mode", imageUrl: "https://i.pinimg.com/1200x/62/15/e8/6215e89fde2608f85f154d3b0dd24ba7.jpg", description: "Ceinture classique en simili cuir avec boucle métallique solide." },
    { name: "Kit Pinceaux Maquillage", price: 6500, category: "Textile-Mode", imageUrl: "https://i.pinimg.com/736x/d6/7f/a8/d67fa83aa0a1819476f057152cd88fa3.jpg", description: "Ensemble complet de pinceaux de maquillage aux poils doux et synthétiques." },
    { name: "Miroir LED", price: 8000, category: "Textile-Mode", imageUrl: "https://i.pinimg.com/736x/83/a2/36/83a236865a36f24b6d0e4e6ac0945606.jpg", description: "Miroir cosmétique de table équipé d'un éclairage tactile LED." },
    { name: "Support PC Ventilé", price: 10500, category: "Equipement", imageUrl: "https://i.pinimg.com/1200x/8c/74/16/8c7416a710f9c1fcc162c95ab0246e07.jpg", description: "Support de refroidissement pour ordinateur portable avec ventilateurs silencieux." },
    { name: "Sacoche Ordinateur", price: 5000, category: "Equipement", imageUrl: "https://i.pinimg.com/736x/3c/cb/c7/3ccbc725b7eda52eca5e0ab8197b19b1.jpg", description: "Sacoche de protection matelassée et imperméable pour PC portable." },
    { name: "Balance de cuisine", price: 5500, category: "Equipement", imageUrl: "https://i.pinimg.com/736x/2d/c7/6b/2dc76bb7c070cc8fabfc9cb1e2a55a2c.jpg", description: "Balance électronique de cuisine de haute précision pour vos recettes." },
    { name: "Machine à café Mini", price: 25000, category: "Equipement", imageUrl: "https://i.pinimg.com/1200x/49/f8/73/49f8734f57df45b0394cbb396cc4b475.jpg", description: "Cafetière compacte et rapide pour vos expressos du matin." },
    { name: "Rasoir Électrique", price: 14000, category: "Textile-Mode", imageUrl: "https://i.pinimg.com/736x/aa/e1/3c/aae13c5ca3cf5654b96900d9ab518397.jpg", description: "Rasoir électrique sans fil rechargeable, doux pour la peau." },
    { name: "Veilleuse Enfant", price: 4000, category: "Equipement", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvGeeAa2gZ2P5UT8rqRHxuQJTy1Bj3_fqzoA&s", description: "Veilleuse lumineuse douce pour accompagner le sommeil des enfants." },
    { name: "Hub USB 4 Ports", price: 3500, category: "Equipement", imageUrl: "https://i.pinimg.com/1200x/94/52/68/9452689f07b39335e99c7f236b600ee9.jpg", description: "Multiplicateur de ports USB pour connecter plusieurs appareils en même temps." },
    { name: "Carte Mémoire 32Go", price: 3000, category: "Equipement", imageUrl: "https://i.pinimg.com/1200x/e6/f6/03/e6f603dc0eaeae17b3995ae0b3630d7e.jpg", description: "MicroSD haute performance pour caméras, consoles et smartphones." },
    { name: "Bracelet Sport", price: 2000, category: "Textile-Mode", imageUrl: "https://i.pinimg.com/736x/1c/42/41/1c42417c12dd8be429cc0f102d3b6a48.jpg", description: "Bracelet de rechange en silicone, résistant à la sueur." },
    { name: "Organisateur de câbles", price: 1500, category: "Equipement", imageUrl: "https://i.pinimg.com/1200x/a5/15/e4/a515e492067a515034bf8c91388b3a6d.jpg", description: "Fixations pratiques pour organiser et ranger les câbles sur votre bureau." },
    { name: "Cutter de précision", price: 1200, category: "Equipement", imageUrl: "https://i.pinimg.com/1200x/74/7b/52/747b52214fb4d6ca2213a7d0a9d39c94.jpg", description: "Cutter de modélisme parfait pour les travaux manuels méticuleux." },
    { name: "Colle forte Tube", price: 1000, category: "Equipement", imageUrl: "https://i.pinimg.com/1200x/3b/30/93/3b3093b520f36a5a6337a46032b3658a.jpg", description: "Super glue à prise ultra-rapide pour toutes les surfaces." },
    { name: "Piles Rechargeables x4", price: 5000, category: "Equipement", imageUrl: "https://i.pinimg.com/1200x/89/60/92/896092e2b9353a4b398543d6bc938f81.jpg", description: "Pack de 4 piles rechargeables haute capacité AA / AAA." },
    { name: "Radio Portable", price: 8500, category: "Equipement", imageUrl: "https://i.pinimg.com/736x/f9/32/cb/f932cbcd7fa328efbe07d1fb500cd064.jpg", description: "Poste radio AM/FM vintage fonctionnant sur secteur ou piles." },
    { name: "Thermomètre Digital", price: 2500, category: "Equipement", imageUrl: "https://i.pinimg.com/1200x/3f/5b/ce/3f5bce6a09f7ac7cd71e5f6c26780131.jpg", description: "Thermomètre médical électronique pour une mesure rapide et fiable." },
    { name: "Mouton Ladoum", price: 350000, category: "Marche-Frais", imageUrl: "https://images.unsplash.com/photo-1511117833452-472d9d2d7617?w=300", description: "Mouton de race Ladoum d'exception pour vos grands événements." },
    { name: "Sac de Riz 50kg", price: 22500, category: "Alimentation", imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300", description: "Sac de riz de qualité supérieure de 50kg pour la famille." },
    { name: "Thiof Frais (KG)", price: 6500, category: "Marche-Frais", imageUrl: "https://images.unsplash.com/photo-1534604973900-c41ab4c58f96?w=300", description: "Thiof (mérou bronzé) frais, pêché localement, vendu au kilogramme." },
    { name: "Panneau Solaire 200W", price: 75000, category: "BTP-Energie", imageUrl: "https://images.unsplash.com/photo-1509391366360-fe5bb6583e23?w=300", description: "Panneau solaire monocristallin 200W pour une autonomie énergétique propre." }
];

// Fonction d'importation
const importData = async () => {
    try {
        // Supprime les anciens produits de test pour éviter les doublons
        await Product.deleteMany();
        console.log("Nettoyage de la base de données effectué.");

        // Ajout des 54 articles avec un stock de sécurité par défaut (ex: 10)
        const itemsToInsert = catalogueDouxDoux.map(p => ({
            ...p,
            countInStock: 10 
        }));

        await Product.insertMany(itemsToInsert);
        console.log("Félicitations ! Vos 54 produits officiels ont été injectés dans le Cloud MongoDB Atlas de Doux-Doux avec succès ! 🛍️✨");
        
        process.exit();
    } catch (error) {
        console.error("Erreur lors de l'importation du catalogue :", error);
        process.exit(1);
    }
};

importData();