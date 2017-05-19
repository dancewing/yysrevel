package controllers

import (
	"database/sql"
	"github.com/dancewing/go-orm"
	"github.com/dancewing/yysrevel/app/services"
	r "github.com/revel/revel"
)

type GorpController struct {
	*r.Controller
	Txn *orm.Transaction
}

func (c *GorpController) Begin() r.Result {
	txn, err := services.Dbm.Begin()
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
