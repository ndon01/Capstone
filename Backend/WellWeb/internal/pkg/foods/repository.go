package foods

import (
	"fmt"

	"github.com/go-pg/pg/v10"
)

type repository struct {
	db *pg.DB
}

func newRepository() *repository {
	var repository = new(repository)

	db := pg.Connect(&pg.Options{
		Addr:     "localhost:5000",
		User:     "postgres",
		Password: "postgres",
		Database: "food",
	})

	repository.db = db

	return repository
}

func (r *repository) Close() {
	r.db.Close()
}

func (r *repository) CreateFood(name string) (string, error) {

	tx, err := r.db.Begin()
	if err != nil {
		fmt.Println("Error Starting Transaction: ", err)
		return "", err
	}

	// Rollback the transaction in case of failure
	defer func() {
		if err != nil {
			tx.Rollback()
		}
	}()

	// Insert the food
	var foodId string
	_, err = tx.Query(pg.Scan(&foodId), "INSERT INTO foods (name) VALUES (?) RETURNING id", name)
	if err != nil {
		fmt.Println("Error Creating DB Food: ", err)
		return "", err
	}

	// Commit the transaction
	err = tx.Commit()
	if err != nil {
		fmt.Println("Error Committing Transaction: ", err)
		return "", err
	}

	return foodId, nil
}

func (r *repository) CreateBrand(name string) (string, error) {

	tx, err := r.db.Begin()
	if err != nil {
		fmt.Println("Error Starting Transaction: ", err)
		return "", err
	}

	// Rollback the transaction in case of failure
	defer func() {
		if err != nil {
			tx.Rollback()
		}
	}()

	// Insert the brand
	var brandId string
	_, err = tx.Query(pg.Scan(&brandId), "INSERT INTO brands (name) VALUES (?) RETURNING id", name)
	if err != nil {
		fmt.Println("Error Creating DB Brand: ", err)
		return "", err
	}

	// Commit the transaction
	err = tx.Commit()
	if err != nil {
		fmt.Println("Error Committing Transaction: ", err)
		return "", err
	}

	return brandId, nil
}
