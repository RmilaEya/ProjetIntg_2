package database

import (
    "fmt"
    "log"

    "gorm.io/driver/postgres"
    "gorm.io/gorm"
	"catalogue/src/models"
)

var DB *gorm.DB

// const DB_URL = "postgresql://neondb_owner:npg_jYIJ5GkpK3bR@ep-red-poetry-a8hthmgz-pooler.eastus2.azure.neon.tech/catalog?sslmode=require"
const DB_URL = "postgresql://neondb_owner:npg_jYIJ5GkpK3bR@ep-red-poetry-a8hthmgz-pooler.eastus2.azure.neon.tech/catalog?sslmode=require"

func InitDB() {
    var err error
    DB, err = gorm.Open(postgres.Open(DB_URL), &gorm.Config{})
    if err != nil {
        log.Fatal("Erreur de connexion à la base de données:", err)
    }

    fmt.Println("Connexion à la base de données réussie !")
}


func MigrateDB() {
    DB.AutoMigrate(&models.Product{}) 
    fmt.Println("Migration effectuée avec succès !")
}
