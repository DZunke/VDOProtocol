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

build: check-cs