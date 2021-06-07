<?php

declare(strict_types=1);

namespace App\Entity;

use App\Model\MapSettings;
use Assert\Assertion;
use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

use function json_decode;

/**
 * @ORM\Entity()
 *
 * @UniqueEntity("name")
 */
final class Map
{
    /**
     * @ORM\Id()
     * @ORM\Column(type="guid")
     * @ORM\GeneratedValue(strategy="NONE")
     */
    private string $id;

    /** @ORM\Column(type="string") */
    private string $name = '';

    /** @ORM\Column(type="text") */
    private string $map = '{}';

    /** @ORM\Column(type="text") */
    private string $mapImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';

    /** @ORM\Column(type="datetime_immutable")" */
    private DateTimeImmutable $mapImageUpdated;

    /** @ORM\Column(type="datetime_immutable") */
    private DateTimeImmutable $createdAt;

    public function __construct()
    {
        $this->id              = Uuid::uuid4()->toString();
        $this->createdAt       = new DateTimeImmutable();
        $this->mapImageUpdated = new DateTimeImmutable();
    }

    public static function create(string $name): Map
    {
        $map = new self();
        $map->setName($name);

        return $map;
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        Assertion::notEmpty($name, 'A map must be named');

        $this->name = $name;
    }

    public function getMap(): string
    {
        return $this->map;
    }

    public function setMap(string $map): void
    {
        Assertion::isJsonString($map, 'The map must be a valid json configuration');

        $this->map = $map;
    }

    public function getMapImage(): string
    {
        return $this->mapImage;
    }

    public function setMapImage(string $mapImage): void
    {
        $this->mapImage        = $mapImage;
        $this->mapImageUpdated = new DateTimeImmutable();
    }

    public function getCreatedAt(): DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function getMapImageUpdated(): DateTimeImmutable
    {
        return $this->mapImageUpdated;
    }

    public function getSettings(): MapSettings
    {
        $settings = json_decode($this->map, true);

        return MapSettings::fromArray($settings);
    }
}
