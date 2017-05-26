package models

import (
	"fmt"
	"regexp"

	"github.com/dancewing/revel"
	"github.com/dancewing/revel/orm"
)

type User struct {
	UserID         int `orm:"pk;auto"`
	Name           string
	Username       string `orm:";size(50)"`
	Password       string `orm:"-"`
	HashedPassword []byte
	Roles          []*Role `orm:"reverse(many)"`
	Posts          []*Post `orm:"reverse(many)"`
}

func (u *User) TableName() string {
	return "user_"
}

func (u *User) String() string {
	return fmt.Sprintf("User(%s)", u.Username)
}

var userRegex = regexp.MustCompile("^\\w*$")

func (user *User) Validate(v *revel.Validation) {
	v.Check(user.Username,
		revel.Required{},
		revel.MaxSize{15},
		revel.MinSize{4},
		revel.Match{userRegex},
	)

	ValidatePassword(v, user.Password).
		Key("user.Password")

	v.Check(user.Name,
		revel.Required{},
		revel.MaxSize{100},
	)
}

func ValidatePassword(v *revel.Validation, password string) *revel.ValidationResult {
	return v.Check(password,
		revel.Required{},
		revel.MaxSize{15},
		revel.MinSize{5},
	)
}

func init() {
	orm.RegisterModel(new(User))
}
