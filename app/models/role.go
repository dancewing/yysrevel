package models

import (
	"fmt"
	"github.com/revel/revel"
)

type Role struct {
	RoleID     int
	Name       string
	Descrption string
	IsDefault  bool
}

type UserRole struct {
	UserID int
	RoleID int
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
