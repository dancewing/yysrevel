package controllers

import (
	"database/sql"

	r "github.com/dancewing/revel"
	"github.com/dancewing/revel/orm"
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
