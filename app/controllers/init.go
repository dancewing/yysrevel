package controllers

import (
	"github.com/dancewing/revel"
	"github.com/dancewing/yysrevel/app/services"
)

func init() {
	revel.OnAppStart(services.InitDB)
	revel.InterceptMethod((*GorpController).Begin, revel.BEFORE)
	//	revel.InterceptMethod(Application.AddUser, revel.BEFORE)
	//	revel.InterceptMethod(Hotels.checkUser, revel.BEFORE)
	revel.InterceptMethod((*GorpController).Commit, revel.AFTER)
	revel.InterceptMethod((*GorpController).Rollback, revel.FINALLY)
}
