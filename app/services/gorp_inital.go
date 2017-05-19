package services

import (
	"golang.org/x/crypto/bcrypt"

	"github.com/dancewing/go-orm"
	_ "github.com/go-sql-driver/mysql" // inital mysql driver

	"github.com/revel/modules/db/app"
	r "github.com/revel/revel"

	"github.com/dancewing/yysrevel/app/models"
)

var (
	Dbm *orm.DbMap
)

func InitDB() {

	db.Init()
	Dbm = &orm.DbMap{Db: db.Db, Dialect: orm.MySQLDialect{"InnoDB", "UTF8"}}

	setColumnSizes := func(t *orm.TableMap, colSizes map[string]int) {
		for col, size := range colSizes {
			t.ColMap(col).MaxSize = size
		}
	}

	t := Dbm.AddTableWithName(models.User{}, "user_").SetKeys(true, "UserID")
	t.ColMap("Password").Transient = true
	setColumnSizes(t, map[string]int{
		"Username": 20,
		"Name":     100,
	})

	t = Dbm.AddTableWithName(models.Role{}, "role_").SetKeys(true, "RoleID")
	setColumnSizes(t, map[string]int{
		"Name":       50,
		"Descrption": 500,
	})

	t = Dbm.AddTableWithName(models.UserRole{}, "user_role").SetKeys(false, "UserID", "RoleID")

	t = Dbm.AddTableWithName(models.Resource{}, "resource_").SetKeys(true, "ResourceID")
	setColumnSizes(t, map[string]int{
		"ControllerAction": 250,
	})

	t = Dbm.AddTableWithName(models.RoleResource{}, "role_resource").SetKeys(false, "RoleID", "ResourceID")

	//system config
	t = Dbm.AddTableWithName(models.SystemConfig{}, "system_config").SetKeys(true, "Version")

	//yys tables;
	t = Dbm.AddTableWithName(models.YysAccount{}, "yys_account").SetKeys(true, "ID")

	t = Dbm.AddTableWithName(models.YysCards{}, "yys_cards").SetKeys(true, "ID")
	t.ColMap("AccountID").Rename("yys_account_id")

	t = Dbm.AddTableWithName(models.YysRole{}, "yys_role").SetKeys(true, "ID")
	t.ColMap("RoleName").Rename("role_name")

	t = Dbm.AddTableWithName(models.YysSupian{}, "yys_suipian").SetKeys(true, "ID")
	t.ColMap("AccountID").Rename("yys_account_id")
	t.ColMap("RoleID").Rename("role_id")

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
		} else {
			initaledData = false
		}
		if !initaledData {
			bcryptPassword, _ := bcrypt.GenerateFromPassword([]byte("demo"), bcrypt.DefaultCost)
			demoUser := &models.User{0, "Demo User", "demo", "demo", bcryptPassword}
			if err := Dbm.Insert(demoUser); err != nil {
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
