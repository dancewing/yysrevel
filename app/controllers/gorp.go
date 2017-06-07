package controllers

import (
	"database/sql"

	r "github.com/dancewing/revel"
	"github.com/dancewing/revel/orm"
	"github.com/dancewing/yysrevel/app/models"
)

type GorpController struct {
	*r.Controller
	Txn *orm.Transaction
}

func (c *GorpController) Begin() r.Result {
	txn, err := orm.Database().Get().Begin()
	if err != nil {
		panic(err)
	}
	c.Txn = txn
	return nil
}

func (c *GorpController) Commit() r.Result {
	if c.Txn == nil {
		return nil
	}
	if err := c.Txn.Commit(); err != nil && err != sql.ErrTxDone {
		panic(err)
	}
	c.Txn = nil
	return nil
}

func (c *GorpController) Rollback() r.Result {
	if c.Txn == nil {
		return nil
	}
	if err := c.Txn.Rollback(); err != nil && err != sql.ErrTxDone {
		panic(err)
	}
	c.Txn = nil
	return nil
}

func (c *GorpController) Connected() *models.User {
	if c.ViewArgs["user"] != nil {
		return c.ViewArgs["user"].(*models.User)
	}
	if username, ok := c.Session["user"]; ok {
		return c.getUser(username)
	}
	return nil
}

func (c *GorpController) getUser(username string) *models.User {
	users, err := c.Txn.Select(models.User{}, `select * from User_ where login = ?`, username)
	if err != nil {
		panic(err)
	}
	if len(users) == 0 {
		return nil
	}
	return users[0].(*models.User)
}
