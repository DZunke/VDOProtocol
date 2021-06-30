<?php

declare(strict_types=1);

namespace App\Twig;

use App\Model\ApplicationConfiguration;
use Twig\Extension\AbstractExtension;
use Twig\Extension\GlobalsInterface;

final class ApplicationConfigurationExtension extends AbstractExtension implements GlobalsInterface
{
    private ApplicationConfiguration $applicationConfiguration;

    public function __construct(ApplicationConfiguration $applicationConfiguration)
    {
        $this->applicationConfiguration = $applicationConfiguration;
    }

    /** @inheritDoc */
    public function getGlobals(): array
    {
        return ['app_config' => $this->applicationConfiguration];
    }
}
