[![Github Workflow](https://github.com/DZunke/VDOLog/workflows/CI/badge.svg)](https://github.com/DZunke/VDOLog/actions?query=workflow%3ACI)

# VDOLog****

A simple Tool for protocol and such stuff ... Readme has to be written - it is currently more a notebook.

## Download

Latest stable version implemented as desktop runnable application via PHPDesktop could be found here:

  https://github.com/DZunke/VDOLog/releases/tag/1.0
  
Additionally every commit to master branch will be auto built, so one could get the "Nightly Builds" as build artifacts here:

  https://github.com/DZunke/VDOLog/actions?query=workflow%3ABuild



## Run application for development purposes

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

## Manually build PHPDesktop with current version of php

  * Download PHPDesktop from [Source](https://github.com/cztomczak/phpdesktop)
  * Download PHP x86 Non-Thread-Safe from [Source](https://windows.php.net/downloads/releases/php-7.4.9-nts-Win32-vc15-x86.zip)
  * Copy PHP from Download to PHPDesktop `php`-Directory but use PHPDesktop [php.ini](https://github.com/cztomczak/phpdesktop/blob/master/src/php/php.ini) File
  * Overwrite `settings.json` in PHPDesktop directory with `config/phpdesktop/settings.json`
  * Build VDOLog Assets with `yarn build`
  * Build clean database on fresh setup, for upgrade setup copy old `var/data` directory to fresh setup
  * Copy `config`, `public`, `src`, `templates`, `var`, `vendor`, `.env`, `composer.json` to `www` directory of PHPDesktop
  * Rewrite `.env` to `APP_ENV=prod`
  * Start `phpdesktop-chrome.exe` to check setup - should run as expected
