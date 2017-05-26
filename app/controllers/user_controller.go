package controllers

import (
	"fmt"

	"github.com/dancewing/revel"
	"github.com/dancewing/revel/orm"
	"github.com/dancewing/yysrevel/app/models"
)

type User struct {
	//*revel.Controller change to GorpController
	GorpController
}

func (c User) List() revel.Result {
	//users, err := c.Txn.Select(models.User{}, `select * from User_`)

	users, err := c.Txn.CreateCriteria(models.User{}).Add(orm.Restrictions.Like("Username", "demo")).List()

	if err != nil {
		panic(err)
	}

	fmt.Println(len(users))

	c.ViewArgs["users"] = users
	return c.Render()
}

func (c User) Edit() revel.Result {
	return c.Render()
}
