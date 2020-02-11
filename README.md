[![CircleCI](https://circleci.com/gh/DZunke/VDOLog/tree/master.svg?style=svg)](https://circleci.com/gh/DZunke/VDOLog/tree/master)

# VDOLog


A simple Tool for protocol and such stuff ... Readme has to be written - it is currently more a notebook.

## Run Application for Development

```
composer install

# Upgrade Symfony
## Update composer.json symfony packages to new version
composer update "symfony/*" --with-all-dependencies

# Create Database
php bin/console doctrine:database:create
php bin/console doctrine:schema:create
php bin/console doctrine:schema:update --force

# Create Assets
yarn install
yarn run dev

# Run Symfony Webserver if symfony cli is installed
symfony serve --no-tls
```


## Troubleshoot

##### PHPDesktop: vcruntime140.dll is missing

Install MS C++ Redistribution https://www.microsoft.com/en-us/download/details.aspx?id=52685 
