# VDOLog &middot; Funkprotokollierung

![HerthaBSC](https://img.shields.io/badge/-Hertha%20BSC-white?labelColor=white&style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAEZ0FNQQAAsY8L/GEFAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAUpQTFRFAAAAAAARAA0rABg4ABpDABxFAB9BAChTAChWAChfACxnAC9oAC9sADZwADdxAEaOAEqYAE+WAFGhAFmvAFquAFypAFyqAFywAF2rAF6uAF64AF+uAF+vAF+yAGCxAGCyAGGzAGG2AGS7BQAAECg9Ij5XKlV5KykpLURXLlJxMX29QUBAQofBQ0ZIQ5HUTF1rT1RYT2BvUE1LUJPNU3GKVlBMVpfPV1ZWWJjPWVhYWZfNW5vRYWZqYmNjYp/TZFxWZWNiZaHUaWZkaWhnaqLSaqbZa2pqbW1ucW5seXh4ebPke3VwfHRvfnl2f317gnp0grHahH12ibTZi6zIj46Nkpmgk4N1k5GRoqy1qKamqaGbq83rraystMrdt9Xvwr26z8jD19PQ2NjY5OPj6N/Y6Ojo6vn/8uDS+O/p+fn5+vr6+/Pt//7+////Ux8lKgAAAAFiS0dEbbsGAK0AAAChSURBVAgdBcHTYgMAEACwm23btm12nY3ORv7/dUnw+/YFIFYjvzAvs3ekKzsr/UnoKGttbK6prGlqqR8SDjrb6hpqq6rrmtszhPOV0uKCkoryopzcNOF1fPT683bp8uLsvu8xmOre6p9fuDsePP3YDdbH9tYeNmenJ5aHT4JUz07ycHIxebS/kQgSV/w9g/dgew6AwMDMD0AgdfMCEPAN4B+x7Dq698RinQAAAABJRU5ErkJggg==)
[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/DZunke/VDOLog/CI/master?style=for-the-badge)](https://github.com/DZunke/VDOLog/actions?query=workflow%3ACI)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/DZunke/VDOLog?style=for-the-badge)](https://github.com/DZunke/VDOLog/releases/latest)
![forthebadge](https://img.shields.io/github/license/DZunke/VDOLog?style=for-the-badge)
![forthebadge](https://img.shields.io/badge/Unterst%C3%BCtzt%20durch-Kaffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee)

Eine Software zur Begleitung der Funkleitstelle von Veranstaltungen. 

![image](https://user-images.githubusercontent.com/1244235/108880147-48e65980-7602-11eb-9cc4-4608cfbe3103.png)

**Diese README ist für die Entwicklungsversion v2.x - Die README für die Version v1.x findet sich [hier](https://github.com/DZunke/VDOLog/tree/v1.x)**

## Funktionalitäten

* Erstellung von Veranstaltungen
* Führung eines Funkprotokolls (Sender / Empfänger) zu jeder Veranstaltung
* Export des Funkprotokolls in eine Excel-Datei
* Bereitstellung über [PHPDesktop](https://github.com/cztomczak/phpdesktop) als lokale Desktopapplikation

## Entwicklung / Roadmap

Die Software wird aktuell im Funkleitstand des Fussball-Bundesligisten Hertha BSC verwendet und ist
daher auch auf die dortigen Bedüfnisse zugeschnitten. Aktuell sieht die Idee der Software die folgenden
zusätzlichen Funktionalitäten vor.

* Übersichtskarten von Veranstaltungsorten mit der Möglichkeit Sektoren einzuzeichnen
* Übersicht von vorhandenen Ordnergruppen und ihrem Standort
* Einfaches verschieben von Ordnergruppen mit automatischer Protkollierung
* Übersetzung der Software in andere Sprachen

## Verwendung als Docker-Environment

Die Applikation unterstützt die Arbeit in einer Docker-Container-Umgebung. Diese Umgebung erfordert
keinerlei PHP-Abhängigkeiten auf einem Host-System, so dass unabhängig vom Host die Applikation
ausgeführt werden kann. 

Dafür ist das Programm [Docker](https://www.docker.com/) ebenso wie [Docker Compose](https://docs.docker.com/compose/) 
auf dem Host-System nötig. Die Applikation kann dann folgendermaßen ausgeführt und über die Adresse `http://localhost:8080` ausgeführt
werden.

## Verwendung als Desktopapplikation (Windows)

Für die Verwendung der Desktopversion ist ein Download des fertigen PHPDesktop-Paketes nötig. Die letzte
stabile Version findet sich auf der [Übersichtsseite der Releases](https://github.com/DZunke/VDOLog/releases/latest)
und kann als Anhang der Version im ZIP-Format gefunden werden.

Nachdem die anhängende PHPDesktop.zip-Datei heruntergeladen und entpackt wurde findet sich im
Zielverzeichnis die ausführbare Datei `phpdesktop-chrome.php`, welche die Applikation startet
und in einem Chrome bereitstellt. Es ist nicht nötig zuvor Chrome zu installieren, der Browser
wird mitgeliefert.

Eine Installation, die Einrichtung einer Datenbank oder eines Webservers sind für die Verwendung
nicht nötig. Durch den Einsatz einer SQLite-Datenbank, welche sich im Verzeichnis `var/data` 
findet, bestehen neben einem aktuellen Windows keine weiteren Abhängigkeiten.

## Verwendung als Serverversion

Für die Verwendung als Serverversion kann man die benötigte Version von den letzten Releases, 
welche man auf der [Übersichtsseite der Releases](https://github.com/DZunke/VDOLog/releases/latest) findet, 
herunterladen. Der gesamte Sourcecode muss auf einem Server mit wenigstens PHP 8 installiert werden. 

Eine Hilfe wie man einen Webserver für eine Symfony-Applikation einrichtet findet sich in der 
[Dokumentation von Symfony](https://symfony.com/doc/current/setup/web_server_configuration.html). 

Um das Projekt über den Sourcecode zu installieren sind folgende Schritte nötig:

```bash
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

## Danksagung und Lizenz

**VDOLog** © 2019+, Denis Zunke. Veröffentlicht mit der [MIT Lizenz](https://mit-license.org/).

> GitHub [@dzunke](https://github.com/DZunke) &nbsp;&middot;&nbsp;
> Twitter [@DZunke](https://twitter.com/DZunke)

> [Hertha BSC](https://www.herthabsc.de/de/) &nbsp;&middot;&nbsp;
> [PHPDesktop](https://github.com/cztomczak/phpdesktop) &nbsp;&middot;&nbsp;
> [tabler.io](https://tabler.io/)
