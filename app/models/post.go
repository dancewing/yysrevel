package models

import "github.com/dancewing/revel/orm"

type Post struct {
	Id    int    `orm:"pk;auto"`
	Title string `orm:"size(100)"`
	User  *User  `orm:"rel(fk)"`
}

func init() {
	orm.RegisterModel(new(Post))
}
