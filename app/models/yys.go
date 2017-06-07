package models

import "github.com/dancewing/revel/orm"

type YysAccount struct {
	ID                   int `orm:"pk;auto"`
	Email, Name, Comment string
	Level                int
}

type YysCards struct {
	ID       int `orm:"pk;auto"`
	Card     string
	Level    string
	Quantity int
	Account  *YysAccount `orm:"rel(fk);column(yys_account_id)"`
}

type YysRole struct {
	ID       int `orm:"pk;auto"`
	RoleName string
}

type YysSupian struct {
	ID       int `orm:"pk;auto"`
	Quantity int
	Account  *YysAccount `orm:"rel(fk);column(yys_account_id)"`
	Role     *YysRole    `orm:"rel(fk)"`
}

func init() {
	orm.RegisterModel(new(YysAccount))
	orm.RegisterModel(new(YysCards))
	orm.RegisterModel(new(YysRole))
	orm.RegisterModel(new(YysSupian))
}
