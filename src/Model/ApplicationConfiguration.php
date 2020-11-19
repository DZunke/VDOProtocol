<?php

declare(strict_types=1);

namespace App\Model;

use Assert\Assertion;

use function assert;
use function count;
use function end;
use function explode;
use function file_exists;
use function file_get_contents;
use function is_string;
use function json_decode;

class ApplicationConfiguration
{
    /** @var string */
    private $title;
    /** @var string */
    private $footerImage;
    /** @var string */
    private $footerImageTitle;
    /** @var string */
    private $favIcon;

    /**
     * @param string[] $phpdesktopConfigs
     */
    public function __construct(array $phpdesktopConfigs)
    {
        $existingConfigFile = null;
        foreach ($phpdesktopConfigs as $phpdesktopConfig) {
            if (file_exists($phpdesktopConfig)) {
                $existingConfigFile = $phpdesktopConfig;
                break;
            }
        }

        Assertion::string($existingConfigFile, 'Any of the config files have to exist');
        assert(is_string($existingConfigFile));

        $configFileContent = file_get_contents($existingConfigFile);
        assert(is_string($configFileContent));

        $this->loadPHPDesktopConfig(json_decode($configFileContent, true));
    }

    /**
     * @param array<string,array<string,string>> $array
     */
    private function loadPHPDesktopConfig(array $array): void
    {
        $this->title            = $array['main_window']['title'];
        $this->footerImage      = $array['main_window']['footer_image'];
        $this->footerImageTitle = $array['main_window']['footer_image_title'];

        $favIconParts = explode('/', $array['main_window']['icon']);
        if (count($favIconParts) === 0) {
            return;
        }

        $this->favIcon = end($favIconParts);
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getFooterImage(): string
    {
        return $this->footerImage;
    }

    public function getFavIcon(): string
    {
        return $this->favIcon;
    }

    public function getFooterImageTitle(): string
    {
        return $this->footerImageTitle;
    }
}
