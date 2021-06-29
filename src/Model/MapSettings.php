<?php

declare(strict_types=1);

namespace App\Model;

use App\Model\MapSettings\Background;
use App\Model\MapSettings\Sector;

class MapSettings
{
    private Background $background;
    /** @var array<string,Sector> */
    private array $sectors = [];

    /**
     * @param array<string,mixed> $data
     */
    public static function fromArray(array $data): MapSettings
    {
        $settings             = new self();
        $settings->background = Background::fromArray($data['backgroundImage'] ?? []);

        $sectorsData = $data['objects'] ?? [];
        foreach ($sectorsData as $sectorData) {
            $sector                         = Sector::fromArray($sectorData);
            $settings->sectors[$sector->id] = $sector;
        }

        return $settings;
    }

    public function getBackground(): Background
    {
        return $this->background;
    }

    public function getSectors(): array
    {
        return $this->sectors;
    }
}
