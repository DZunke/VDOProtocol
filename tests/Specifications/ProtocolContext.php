<?php

namespace App\Tests\Specifications;

use Behat\Behat\Context\Context;
use Behat\Behat\Hook\Scope\BeforeScenarioScope;
use Behat\MinkExtension\Context\MinkContext;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\VarDumper\VarDumper;

final class ProtocolContext extends BaseContext implements Context
{
    /** @var EntityManagerInterface */
    private $em;
    /** @var RouterInterface */
    private $router;
    /** @var MinkContext */
    private $minkContext;
    /** @var GameContext */
    private $gameContext;

    public function __construct(EntityManagerInterface $em, RouterInterface $router)
    {
        $this->em     = $em;
        $this->router = $router;
    }

    /**
     * @BeforeScenario
     */
    public function gatherContexts(BeforeScenarioScope $scope) : void
    {
        $minkContext = $this->getContext($scope, MinkContext::class);
        assert($minkContext instanceof MinkContext);

        $this->minkContext = $minkContext;

        $gameContext = $this->getContext($scope, GameContext::class);
        assert($gameContext instanceof MinkContext);

        $this->gameContext = $gameContext;
    }

    /**
     * @Given I am on the protocol page of game named :gameName
     */
    public function iAmOnTheProtocolPageOfGameNamed(string $gameName) : void
    {
        $game = $this->gameContext->getGame($gameName);

        $this->minkContext->visit($this->router->generate('protocol_index', ['game' => $game->getId()]));
    }

    /**
     * @Then I should see protocol parent entry from :sender to :recipent with content :content
     */
    public function iShouldSeeProtocolParentEntryFromToWithContent(string $sender, string $recipent, string $content) : void
    {
        $protocolEntries = $this->minkContext->getSession()->getPage()->findAll('css', '.protocol-entry');
        foreach ($protocolEntries as $protocolEntry) {
            $protocolSender   = $protocolEntry->find('css', '.protocol-sender')->getText();
            $protocolRecipent = $protocolEntry->find('css', '.protocol-recipent')->getText();
            $protocolContent  = $protocolEntry->find('css', '.protocol-content')->getText();

            if ($protocolSender === $sender && $protocolRecipent === $recipent && $protocolContent === $content) {
                return;
            }
        }

        throw new Exception(
            'Missing protocol message from "' . $sender . '" to "' . $recipent . '" with content "' . $content . '"'
        );
    }

}