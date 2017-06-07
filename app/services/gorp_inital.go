package services

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"

	"github.com/dancewing/revel/orm"
	_ "github.com/go-sql-driver/mysql" // inital mysql driver

	r "github.com/dancewing/revel"
	"github.com/dancewing/revel/modules/db/app"

	"github.com/dancewing/yysrevel/app/models"
)

func InitDB() {

	db.Init()

	fmt.Println("initial function for db")

	Dbm := &orm.DbMap{Db: db.Db, Dialect: orm.MySQLDialect{"InnoDB", "UTF8"}}

	orm.Database().Set(Dbm)

	orm.BootStrap()

	//Dbm.RegisterModel(new(models.User))

	// Dbm.RegisterModel(new(models.Role))

	// Dbm.RegisterModel(new(models.Post))

	// Dbm.RegisterModel(new(models.UserRole))

	// Dbm.RegisterModel(new(models.Resource))

	// Dbm.RegisterModel(new(models.RoleResource))

	// Dbm.RegisterModel(new(models.SystemConfig))

	// Dbm.RegisterModel(new(models.YysAccount))

	// Dbm.RegisterModel(new(models.YysCards))

	// Dbm.RegisterModel(new(models.YysRole))

	// Dbm.RegisterModel(new(models.YysSupian))

	// t = Dbm.AddTableWithName(models.Role{}, "role_").SetKeys(true, "RoleID")
	// setColumnSizes(t, map[string]int{
	// 	"Name":       50,
	// 	"Descrption": 500,
	// })
	//
	// t = Dbm.AddTableWithName(models.UserRole{}, "user_role").SetKeys(false, "UserID", "RoleID")
	//
	// t = Dbm.AddTableWithName(models.Resource{}, "resource_").SetKeys(true, "ResourceID")
	// setColumnSizes(t, map[string]int{
	// 	"ControllerAction": 250,
	// })
	//
	// t = Dbm.AddTableWithName(models.RoleResource{}, "role_resource").SetKeys(false, "RoleID", "ResourceID")
	//
	// //system config
	// t = Dbm.AddTableWithName(models.SystemConfig{}, "system_config").SetKeys(true, "Version")
	//
	// //yys tables;
	// t = Dbm.AddTableWithName(models.YysAccount{}, "yys_account").SetKeys(true, "ID")
	//
	// t = Dbm.AddTableWithName(models.YysCards{}, "yys_cards").SetKeys(true, "ID")
	// t.ColMap("AccountID").Rename("yys_account_id")
	//
	// t = Dbm.AddTableWithName(models.YysRole{}, "yys_role").SetKeys(true, "ID")
	// t.ColMap("RoleName").Rename("role_name")
	//
	// t = Dbm.AddTableWithName(models.YysSupian{}, "yys_suipian").SetKeys(true, "ID")
	// t.ColMap("AccountID").Rename("yys_account_id")
	// t.ColMap("RoleID").Rename("role_id")

	Dbm.TraceOn("[orm]", r.INFO)

	Dbm.CreateTablesIfNotExists()

	configs, err := Dbm.Select(models.SystemConfig{}, `select * from system_config`)
	if err != nil {
		panic(err)
	} else {
		var initaledData bool
		var config *models.SystemConfig
		if len(configs) > 0 {
			config = configs[0].(*models.SystemConfig)
			initaledData = config.IntitalSystemUser
			//initaledData = false
		} else {
			initaledData = false
		}
		if !initaledData {
			bcryptPassword, _ := bcrypt.GenerateFromPassword([]byte("demo"), bcrypt.DefaultCost)
			//demoUser := &models.User{0, "Demo User", "demo", "demo", bcryptPassword, nil, nil}

			demoUser := &models.User{Login: "demo", HashedPassword: bcryptPassword, FirstName: "demo", LastName: "demo", Activated: true}

			if err := Dbm.Insert(demoUser); err != nil {
				panic(err)
			}

			role1 := &models.Role{Name: "ROLE_USER", IsDefault: true}
			role2 := &models.Role{Name: "ROLE_ADMIN", IsDefault: true}

			if err := Dbm.Insert(role1, role2); err != nil {
				panic(err)
			}

			fmt.Println("demo user id ", demoUser.UserID)
			fmt.Println("Role id: ", role1.RoleID, role2.RoleID)

			demoUser.Roles = []*models.Role{role1, role2}

			if err := Dbm.SaveM2M(demoUser, "Roles"); err != nil {
				panic(err)
			}

			if config == nil {
				config = new(models.SystemConfig)
				config.IntitalSystemUser = true
				if err := Dbm.Insert(config); err != nil {
					panic(err)
				}
			} else {
				config.IntitalSystemUser = true
				if _, err := Dbm.Update(config); err != nil {
					panic(err)
				}
			}

		}
	}

}
