package services

import (
	"fmt"
	"sync"
)

var (
	scs  *systemConfigService
	once sync.Once
)

type systemConfigService struct {
	items map[string]string
	mu    sync.RWMutex
}

func (r *systemConfigService) Set(key, data string) {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.items[key] = data
}

func (r *systemConfigService) Get(key string) (string, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	item, ok := r.items[key]
	if !ok {
		return "", fmt.Errorf("The '%s' is not presented", key)
	}
	return item, nil
}

func SystemConfigService() *systemConfigService {
	once.Do(func() {
		scs = &systemConfigService{
			items: make(map[string]string),
		}
	})

	return scs
}
