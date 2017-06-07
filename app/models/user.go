package models

import (
	"fmt"
	"regexp"

	"github.com/dancewing/revel"
	"github.com/dancewing/revel/orm"
)

type User struct {
	UserID         int      `orm:"pk;auto" json:"userId"`
	Login          string   `json:"login"`
	FirstName      string   `orm:";size(50)" json:"firstName"`
	LastName       string   `orm:";size(50)" json:"lastName"`
	Email          string   `orm:";size(50)" json:"email"`
	LangKey        string   `orm:";size(50)" json:"langKey"`
	Password       string   `orm:"-" json:"-"`
	HashedPassword []byte   `json:"-"`
	Activated      bool     `json:"activated"`
	Roles          []*Role  `orm:"reverse(many)" json:"-"`
	Authorities    []string `orm:"-" json:"authorities"`
}

func (u *User) TableName() string {
	return "user_"
}

func (u *User) String() string {
	return fmt.Sprintf("User(%s)", u.Login)
}

var userRegex = regexp.MustCompile("^\\w*$")

func (user *User) Validate(v *revel.Validation) {
	v.Check(user.Login,
		revel.Required{},
		revel.MaxSize{15},
		revel.MinSize{4},
		revel.Match{userRegex},
	)

	ValidatePassword(v, user.Password).
		Key("user.Password")

	// v.Check(user.Name,
	// 	revel.Required{},
	// 	revel.MaxSize{100},
	// )
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
