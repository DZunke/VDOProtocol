<?php

declare(strict_types=1);

namespace App\Entity;

use Assert\Assertion;
use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

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

    /** @ORM\Column(type="text", nullable=true) */
    private string $mapImage;

    /** @ORM\Column(type="datetime_immutable") */
    private DateTimeImmutable $createdAt;

    public function __construct()
    {
        $this->id        = Uuid::uuid4()->toString();
        $this->createdAt = new DateTimeImmutable();
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

    public function getMapImage()
    {
        return $this->mapImage;
    }

    public function setMapImage(string $mapImage): void
    {
        $this->mapImage = $mapImage;
    }

    public function getCreatedAt(): DateTimeImmutable
    {
        return $this->createdAt;
    }
}
