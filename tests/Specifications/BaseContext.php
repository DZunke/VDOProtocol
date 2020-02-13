<?php

declare(strict_types=1);

namespace App\Tests\Specifications;

use Behat\Behat\Context\Context;
use Behat\Testwork\Hook\Scope\HookScope;

abstract class BaseContext implements Context
{
    protected function getContext(HookScope $scope, string $contextClass) : Context
    {
        $environment = $scope->getEnvironment();

        return $environment->getContext($contextClass);
    }
}
