package controllers

import (
	"fmt"

	"github.com/dancewing/revel"
	"github.com/dancewing/yysrevel/app/models"
)

type Account struct {
	//*revel.Controller change to GorpController
	GorpController
}

func (c Account) List() revel.Result {
	//users, err := c.Txn.Select(models.User{}, `select * from User_`)

	//users, err := c.Txn.CreateCriteria(models.User{}).Add(orm.Restrictions.Like("Username", "demo")).List()
	users, err := c.Txn.CreateCriteria(models.User{}).List()
	if err != nil {
		panic(err)
	}

	fmt.Println(len(users))

	c.ViewArgs["users"] = users
	return c.Render()
}

func (c Account) Edit() revel.Result {
	return c.Render()
}

func (c Account) Current() revel.Result {

	user := c.Connected()

	if user != nil {
		err := c.Txn.QueryM2M(user, "Roles")

		if user.Roles != nil {
			user.Authorities = make([]string, len(user.Roles), len(user.Roles))
			for i := range user.Roles {
				user.Authorities[i] = user.Roles[i].Name
			}
		}

		if err != nil {
			panic(err)
		}

		return c.RenderJSON(user)
	}

	return c.RenderError(nil)

}

func (c Account) Logout() revel.Result {
	for k := range c.Session {
		delete(c.Session, k)
	}
	return c.RenderText("ok", nil)
}
