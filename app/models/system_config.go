package models

import (
	"github.com/dancewing/go-orm"
	"time"
)

type SystemConfig struct {
	Version           int
	InitialDate       int64
	IntitalSystemUser bool
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
