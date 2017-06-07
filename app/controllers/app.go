package controllers

import (
	"github.com/dancewing/revel"
	"github.com/dancewing/yysrevel/app/models"
	"github.com/dancewing/yysrevel/app/routes"
	"golang.org/x/crypto/bcrypt"
)

type Application struct {
	//*revel.Controller change to GorpController
	GorpController
}

// func (c Application) Index() revel.Result {
// 	return c.Render()
// }

func (c Application) AddUser() revel.Result {
	if user := c.Connected(); user != nil {
		c.ViewArgs["user"] = user
	}
	return nil
}

func (c Application) getUser(username string) *models.User {
	users, err := c.Txn.Select(models.User{}, `select * from User_ where Username = ?`, username)
	if err != nil {
		panic(err)
	}
	if len(users) == 0 {
		return nil
	}
	return users[0].(*models.User)
}

//Index - Application Home page
func (c Application) Index() revel.Result {
	// if c.connected() != nil {
	// 	return c.Render()
	// }
	// c.Flash.Error("Please log in first")
	// return c.Redirect(routes.Application.Login())

	return c.Render()
}

func (c Application) Register() revel.Result {
	return c.Render()
}

func (c Application) SaveUser(user models.User, verifyPassword string) revel.Result {
	c.Validation.Required(verifyPassword)
	c.Validation.Required(verifyPassword == user.Password).
		Message("Password does not match")
	user.Validate(c.Validation)

	if c.Validation.HasErrors() {
		c.Validation.Keep()
		c.FlashParams()
		return c.Redirect(routes.Application.Register())
	}

	user.HashedPassword, _ = bcrypt.GenerateFromPassword(
		[]byte(user.Password), bcrypt.DefaultCost)
	err := c.Txn.Insert(&user)
	if err != nil {
		panic(err)
	}

	c.Session["user"] = user.Login
	c.Flash.Success("Welcome, " + user.LastName + "," + user.FirstName)
	return c.Redirect(routes.Application.Index())
}

func (c Application) LoginPost(username, password string, remember bool) revel.Result {
	user := c.getUser(username)
	if user != nil {
		err := bcrypt.CompareHashAndPassword(user.HashedPassword, []byte(password))
		if err == nil {
			c.Session["user"] = username
			if remember {
				c.Session.SetDefaultExpiration()
			} else {
				c.Session.SetNoExpiration()
			}
			c.Flash.Success("Welcome, " + username)
			return c.Redirect(routes.Application.Index())
		}
	}

	c.Flash.Out["username"] = username
	c.Flash.Error("Login failed")
	return c.Redirect(routes.Application.Index())
}

func (c Application) Login() revel.Result {
	return c.Render()
}

func (c Application) Logout() revel.Result {
	for k := range c.Session {
		delete(c.Session, k)
	}
	return c.RenderText("ok", nil)
}
