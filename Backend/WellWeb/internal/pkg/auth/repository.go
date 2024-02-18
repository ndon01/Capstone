package auth

import (
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
		Database: "auth",
	})

	repository.db = db

	/*
		res, err := db.Exec("INSERT INTO users (username) VALUES ('test')")
		if err != nil {
			log.Fatal(err)
		}
		log.Println(res.RowsAffected())
	*/

	return repository
}

func (r *repository) Close() {
	r.db.Close()
}

func (r *repository) DoesUsernameExist(username string) (bool, error) {
	var exists bool
	_, err := r.db.Query(pg.Scan(&exists), `
		SELECT EXISTS (
			SELECT 1 FROM users WHERE LOWER(username) = LOWER(?)
		) AS "exists"
	`, username)
	if err != nil {
		return false, err
	}
	return exists, nil

}
