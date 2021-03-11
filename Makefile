.PHONY: *
.DEFAULT_GOAL := help

PHP ?= php
OPTS=

help:
	@printf "\n\033[33mAvailable Targets:\033[0m\n\n"
	@grep -E '^[-a-zA-Z0-9_\.\/]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[32m%-15s\033[0m %s\n", $$1, $$2}'

phpdesktop: ## build phpdesktop release
	rm -rf build
	wget https://github.com/cztomczak/phpdesktop/releases/download/chrome-v57.0-rc/phpdesktop-chrome-57.0-rc-php-7.1.3.zip
	unzip phpdesktop-chrome-57.0-rc-php-7.1.3.zip
	mv phpdesktop-chrome-57.0-rc-php-7.1.3 build
	rm phpdesktop-chrome-57.0-rc-php-7.1.3.zip
	cd build/www; rm -rf *
	cd build; rm -rf php/*
	cd build/php; wget https://windows.php.net/downloads/releases/latest/php-8.0-nts-Win32-vs16-x86-latest.zip
	cd build/php; unzip php-8.0-nts-Win32-vs16-x86-latest.zip
	cd build/php; rm php-8.0-nts-Win32-vs16-x86-latest.zip

	git archive HEAD | (cd build/www; tar x)
	cd build/www; mv config/phpdesktop/php.ini ../php
	cd build/www; mv config/phpdesktop/settings.json ../
	cd build/www; mv .env.prod .env
	cd build/www; APP_ENV=prod composer install --optimize-autoloader --no-dev --prefer-dist --no-plugins --no-scripts --no-progress
	cd build/www; APP_ENV=prod ${PHP} bin/console cache:clear -q
	cd build/www; APP_ENV=prod ${PHP} bin/console assets:install public -q
	cd build/www; APP_ENV=prod ${PHP} bin/console doctrine:database:create -q
	cd build/www; APP_ENV=prod ${PHP} bin/console doctrine:schema:create -q
	cd build/www; yarn install
	cd build/www; yarn run build
	cd build/www; rm -rf assets node_modules

serve-web: ## start dev webserver
	symfony local:server:start --no-tls

check-cs: ## check coding standards
	${PHP} vendor/bin/phpcs -n

fix-cs: ## auto-fix coding standards
	${PHP} vendor/bin/phpcbf -n

db-create: ## creates a fresh database
	${PHP} bin/console doctrine:database:drop --force -q
	${PHP} bin/console doctrine:database:create -q
	${PHP} bin/console doctrine:schema:create -q

feature-tests: ## executing behat tests
	APP_ENV=test ${PHP} bin/console doctrine:database:drop --force -q
	APP_ENV=test ${PHP} bin/console doctrine:database:create -q
	APP_ENV=test ${PHP} bin/console doctrine:schema:create -q
	APP_ENV=test ${PHP} vendor/bin/behat -f progress

static-analysis: ## runs static analysis
	 ${PHP} vendor/bin/phpstan analyse -c phpstan.neon

phpunit: ## run phpunit
	 ${PHP} vendor/bin/phpunit

lint-php: ## linting php files
	 if find src -name "*.php" -exec ${PHP} -l {} \; | grep -v "No syntax errors detected"; then exit 1; fi
	 if find tests -name "*.php" -exec ${PHP} -l {} \; | grep -v "No syntax errors detected"; then exit 1; fi

build: lint-php check-cs static-analysis phpunit feature-tests
