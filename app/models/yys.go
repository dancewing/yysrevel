package models

type YysAccount struct {
	ID                   int
	Email, Name, Comment string
	Level                int
}

type YysCards struct {
	ID        int
	Card      string
	Level     string
	Quantity  int
	AccountID int
}

type YysRole struct {
	ID       int
	RoleName string
}

type YysSupian struct {
	ID        int
	Quantity  int
	AccountID int
	RoleID    int
}
