package models

import (
	"time"

	"github.com/dancewing/revel/orm"
)

type SystemConfig struct {
	Version           int   `orm:"pk;auto"`
	InitialDate       int64 `orm:"column(initial_date)"`
	IntitalSystemUser bool  `orm:"column(intital_system_user)"`
}

func (u *SystemConfig) TableName() string {
	return "system_config"
}

// implement the PreInsert and PreUpdate hooks
func (ss *SystemConfig) PreInsert(s orm.SqlExecutor) error {
	ss.InitialDate = time.Now().UnixNano()
	return nil
}

func (ss *SystemConfig) PreUpdate(s orm.SqlExecutor) error {
	ss.InitialDate = time.Now().UnixNano()
	return nil
}

func init() {
	orm.RegisterModel(new(SystemConfig))
}
