package controllers

import (
	"database/sql"

	"golang.org/x/crypto/bcrypt"

	"github.com/go-gorp/gorp"
	_ "github.com/go-sql-driver/mysql" // inital mysql driver

	"github.com/revel/modules/db/app"
	r "github.com/revel/revel"

	"github.com/dancewing/yysrevel/app/models"
)

var (
	Dbm *gorp.DbMap
)

func InitDB() {

	db.Init()
	Dbm = &gorp.DbMap{Db: db.Db, Dialect: gorp.MySQLDialect{"InnoDB", "UTF8"}}

	setColumnSizes := func(t *gorp.TableMap, colSizes map[string]int) {
		for col, size := range colSizes {
			t.ColMap(col).MaxSize = size
		}
	}

	t := Dbm.AddTableWithName(models.User{}, "user_").SetKeys(true, "UserID")
	t.ColMap("Password").Transient = true
	setColumnSizes(t, map[string]int{
		"Username": 20,
		"Name":     100,
	})

	t = Dbm.AddTableWithName(models.Role{}, "role_").SetKeys(true, "RoleID")
	setColumnSizes(t, map[string]int{
		"Name":       50,
		"Descrption": 500,
	})

	t = Dbm.AddTableWithName(models.UserRole{}, "user_role").SetKeys(false, "UserID", "RoleID")

	t = Dbm.AddTableWithName(models.Resource{}, "resource_").SetKeys(true, "ResourceID")
	setColumnSizes(t, map[string]int{
		"ControllerAction": 250,
	})

	t = Dbm.AddTableWithName(models.RoleResource{}, "role_resource").SetKeys(false, "RoleID", "ResourceID")

	Dbm.TraceOn("[gorp]", r.INFO)
	Dbm.CreateTablesIfNotExists()

	bcryptPassword, _ := bcrypt.GenerateFromPassword([]byte("demo"), bcrypt.DefaultCost)
	demoUser := &models.User{0, "Demo User", "demo", "demo", bcryptPassword}
	if err := Dbm.Insert(demoUser); err != nil {
		panic(err)
	}
}

type GorpController struct {
	*r.Controller
	Txn *gorp.Transaction
}

func (c *GorpController) IsSigned() (string, bool) {
	username := ""
	signed := false
	if c.ViewArgs["user"] != nil {
		username = c.ViewArgs["user"].(*models.User).Username
		signed = true
	}
	if usernameinSession, ok := c.Session["user"]; ok {
		username = usernameinSession
		signed = true
	}
	return username, signed
}

func (c *GorpController) Begin() r.Result {
	txn, err := Dbm.Begin()
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
