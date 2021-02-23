# VDOLog

[![forthebadge](https://forthebadge.com/images/badges/powered-by-coffee.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)

[![Github Workflow](https://github.com/DZunke/VDOLog/workflows/CI/badge.svg)](https://github.com/DZunke/VDOLog/actions?query=workflow%3ACI)

Eine Software zur Begleitung von Veranstaltungen. Es ist möglich Veranstaltungen
anzulegen und für diese ein Funkprotokoll zu schreiben. Dieses Funkprotokoll 
ist einfach nach Excel zu exportieren oder fortlaufend über die Software zu 
verwalten. Dabei kommt eine automatische Integration von [PHPDesktop](https://github.com/cztomczak/phpdesktop)
um die Software einfach auf einem Windowssystem in der Funkleitstelle der
Veranstaltung zum Laufen zu bringen. 

Die Software wird aktuell im Funkleitstand des besten Bundesligisten Hertha BSC 
<span style="color:#0058a3">❤</span> verwendet und ist daher auch auf die dortige 
Verwendung zugeschnitten. 

Über eine Konfiguration ist es jedoch möglich Logo und Titel auszutauschen und so 
die Software auf entsprechende andere Veranstalter anzupassen.

![image](https://user-images.githubusercontent.com/1244235/108864533-92c74380-75f2-11eb-8c4a-31602e31e50b.png)

## Verwendung als Windowsapplikation

Für die Verwendung der Windowsversion ist ein Download des entsprechenden 
PHPDesktop Assets auf der Seite des letzten Releases nötig. 
Dieses findet man auf [Übersichtsseite der Releases](https://github.com/DZunke/VDOLog/releases/latest).

Nachdem man die anhängende PHPDesktop.zip-Datei heruntergeladen hat muss man diese 
entspacken und mit einem Doppelklick auf die ausführbare Datei `phpdesktop-chrome.php` startet
das Funkprotokoll. 

Eine Einrichtung eines Webservers oder einer Datenbank sind dann nicht nötig. Diese Verwendung
wird für den normalen Gebrauch empfohlen. 

## Verwendung als Serverversion

Für die Verwendung als Serverversion kann man die benötigte Version von den letzten Releases, 
welche man auf der [Übersichtsseite der Releases](https://github.com/DZunke/VDOLog/releases/latest) findet, 
herunterladen. Der gesamte Sourcecode muss auf einem Server mit wenigstens PHP 8 installiert werden. 

Eine Hilfe wie man einen Webserver für eine Symfony-Applikation einrichtet findet sich in der 
[Dokumentation von Symfony](https://symfony.com/doc/current/setup/web_server_configuration.html). 

Um das Projekt über den Sourcecode zu installieren sind folgende Schritte nötig:

```shell script
# Installation aller PHP Abhängigkeiten
composer install --optimize-autoloader --no-dev --prefer-dist --no-plugins --no-scripts --no-progress

# Einrichtung einer initialen Datenbank
php bin/console doctrine:database:create
php bin/console doctrine:schema:create
php bin/console doctrine:schema:update --force

# Installation aller Frontend Abhängigkeiten
yarn install
yarn run prod
```

## Verwendung des aktuellen Entwicklungsstandes

Für experimentelle Zwecke ist es möglich den letzten Entwicklungsstand nicht nur als Sourcecodeversion, 
sondern auch als Windowsversion zu verwenden. Die letzte mögliche Windowsversion findet sich unter den
[aktuellen Builds](https://github.com/DZunke/VDOLog/actions/workflows/build.yml?query=workflow%3ABuild). 
Hier hängt die Datei `VDOLog-PHPDesktop` an jeder Änderung des Entwicklungszweiges an. 

## Anpassung der Konfiguration für Titel und Logo

Die Datei `settings.json` findet sich im Stammverzeichnis der Windowsversion. Für die Verwendung mit einem Webserver
liegt die Datei unter dem Pfad `config/phpdesktop/settings.json`. 

Relevant für die Anpassung an den eigenen Veranstalter sind folgende Einstellungen:

```json
{
  "main_window": {
    "title": "Hertha BSC Protokoll VDO-Edition", 
    "footer_image": "/images/hertha_96x96.png",
    "footer_image_title": "Hertha BSC Logo",
    "icon": "www/public/favicon.ico"
  }
}
```
