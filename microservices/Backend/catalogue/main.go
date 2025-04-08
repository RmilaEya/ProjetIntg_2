package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/sirupsen/logrus" 

	"catalogue/src/database"
	"catalogue/src/routes"
)

func main() {
	// Initialiser la configuration de logrus
	log := logrus.New()

	// Configurer le format de log en JSON p
	log.SetFormatter(&logrus.JSONFormatter{})

	// Lancer l'application avec logrus
	log.Info("Initialisation du serveur")

	// Initialiser la base de données
	database.InitDB()
	database.MigrateDB()

	// Créer une instance de l'application Fiber
	app := fiber.New()

	//utuliser et activer CORS 
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*", // Autorise toutes les origines
		AllowMethods: "GET,POST,PUT,DELETE",
	}))

	// Configurer les routes
	routes.SetupRoutes(app)

	// Lancer le serveur 
	log.Info("Démarrage du serveur sur le port 5002...")
	if err := app.Listen(":5002"); err != nil {
		log.Fatalf("Erreur lors du démarrage du serveur : %v", err)
	}

	
	log.Info("Serveur démarré avec succès")
}
