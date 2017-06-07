package controllers

import (
	"github.com/dancewing/revel"
)

type Profile struct {
	//*revel.Controller change to GorpController
	GorpController
}

func (c Profile) Get() revel.Result {
	//users, err := c.Txn.Select(models.User{}, `select * from User_`)

	//users, err := c.Txn.CreateCriteria(models.User{}).Add(orm.Restrictions.Like("Username", "demo")).List()

	result := make(map[string]interface{})

	activeProfiles := make([]string, 0)

	activeProfiles = append(activeProfiles, revel.RunMode)

	result["activeProfiles"] = activeProfiles
	//result["ribbonEnv"] =

	return c.RenderJSON(result)
}
