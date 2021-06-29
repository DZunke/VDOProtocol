<?php

declare(strict_types=1);

namespace App\Model\MapSettings;

class Background
{
    public float $width  = 0;
    public float $height = 0;
    public string $src   = '';

    /**
     * @param array<string,mixed> $data
     */
    public static function fromArray(array $data): Background
    {
        $background         = new self();
        $background->height = $data['height'] ?? 0.0;
        $background->width  = $data['width'] ?? 0.0;
        $background->src    = $data['src'] ?? '';

        return $background;
    }
}
