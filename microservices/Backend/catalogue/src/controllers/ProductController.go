package controllers

import (
	"catalogue/src/database"
	"catalogue/src/models"
	"github.com/gofiber/fiber/v2"
)

// Récupérer tous les produits
func GetProducts(c *fiber.Ctx) error {
	var products []models.Product
	database.DB.Find(&products)
	return c.JSON(products)
}

// Récupérer un produit par ID
func GetProduct(c *fiber.Ctx) error {
	id := c.Params("id")
	var product models.Product

	if err := database.DB.First(&product, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Produit non trouvé"})
	}

	return c.JSON(product)
}

// Ajouter un produit
func CreateProduct(c *fiber.Ctx) error {
	var product models.Product
	if err := c.BodyParser(&product); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Données invalides"})
	}

	database.DB.Create(&product)
	return c.Status(201).JSON(product)
}

// Modifier un produit
func UpdateProduct(c *fiber.Ctx) error {
	id := c.Params("id")
	var product models.Product

	if err := database.DB.First(&product, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Produit non trouvé"})
	}

	if err := c.BodyParser(&product); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Données invalides"})
	}

	database.DB.Save(&product)
	return c.JSON(product)
}

// Supprimer un produit
func DeleteProduct(c *fiber.Ctx) error {
	id := c.Params("id")
	var product models.Product

	if err := database.DB.First(&product, id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Produit non trouvé"})
	}

	database.DB.Delete(&product)
	return c.Status(204).Send(nil)
}
















