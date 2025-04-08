package routes

import (
	"catalogue/src/controllers"
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	// Définir les routes pour le service catalogue
	app.Get("/products/:id", controllers.GetProduct) // Route pour obtenir un produit par ID
	app.Get("/products", controllers.GetProducts)    // Route pour obtenir tous les produits
	app.Post("/products", controllers.CreateProduct) // Route pour ajouter un produit
	app.Put("/products/:id", controllers.UpdateProduct) // Route pour mettre à jour un produit
	app.Delete("/products/:id", controllers.DeleteProduct) // Route pour supprimer un produit
}
