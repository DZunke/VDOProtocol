<?php

declare(strict_types=1);

namespace App\Model\MapSettings;

class Sector
{
    public string $id   = '';
    public string $name = '';
    public string $fill = '';

    /**
     * @param array<string,mixed> $data
     */
    public static function fromArray(array $data): Sector
    {
        $sector       = new self();
        $sector->id   = $data['sector_id'] ?? '';
        $sector->name = $data['sector_name'] ?? '';
        $sector->fill = $data['fill'] ?? '';

        return $sector;
    }
}
