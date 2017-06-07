package models

import (
	"fmt"

	"github.com/dancewing/revel"
	"github.com/dancewing/revel/orm"
)

type Role struct {
	RoleID      int    `orm:"pk;auto"`
	Name        string `orm:";size(150)"`
	Description string `orm:";size(250)"`
	IsDefault   bool
	Users       []*User     `orm:"rel(m2m)"`
	Resources   []*Resource `orm:"reverse(many)"`
}

func (r *Role) String() string {
	return fmt.Sprintf("Role(%s)", r.Name)
}

func (role *Role) Validate(v *revel.Validation) {
	v.Check(role.Name,
		revel.Required{},
		revel.MaxSize{15},
		revel.MinSize{4},
		revel.Match{userRegex},
	)
}

func init() {
	orm.RegisterModel(new(Role))
}
