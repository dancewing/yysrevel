package models

import (
	"fmt"
)

//Resource manage the resources from controller
type Resource struct {
	ResourceID       int
	ControllerAction string
}

//RoleResource , many-to-many relations
type RoleResource struct {
	ResourceID int
	RoleID     int
}

func (r *Resource) String() string {
	return fmt.Sprintf("Resource(%s)", r.ControllerAction)
}
