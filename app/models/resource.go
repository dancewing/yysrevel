package models

import (
	"fmt"

	"github.com/dancewing/revel/orm"
)

//Resource manage the resources from controller
type Resource struct {
	ResourceID       int     `orm:"pk;auto"`
	ControllerAction string  `orm:";size(250)"`
	Roles            []*Role `orm:"rel(m2m)"`
}

func (r *Resource) String() string {
	return fmt.Sprintf("Resource(%s)", r.ControllerAction)
}

func init() {
	orm.RegisterModel(new(Resource))
}
