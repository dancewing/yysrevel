package controllers

import (
	"github.com/dancewing/yysrevel/app/models"
	"github.com/revel/revel"
)

type User struct {
	//*revel.Controller change to GorpController
	GorpController
}

func (c User) List() revel.Result {
	users, err := c.Txn.Select(models.User{}, `select * from User_`)
	if err != nil {
		panic(err)
	}
	if len(users) == 0 {
		return nil
	}
	c.ViewArgs["users"] = users
	return c.Render()
}

func (c User) Edit() revel.Result {
	return c.Render()
}
