.PHONY: *

OPTS=

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

serve-web:
	symfony serve --no-tls

check-cs: ## check coding standards
	vendor/bin/phpcs -n

fix-cs: ## auto-fix coding standards
	vendor/bin/phpcbf -n

db-create: ## creates a fresh database
	php bin/console doctrine:database:drop --force -q
	php bin/console doctrine:database:create -q
	php bin/console doctrine:schema:create -q

feature-tests: ## executing behat tests
	APP_ENV=test php bin/console doctrine:database:drop --force -q
	APP_ENV=test php bin/console doctrine:database:create -q
	APP_ENV=test php bin/console doctrine:schema:create -q
	APP_ENV=test vendor/bin/behat -f progress

build: check-cs