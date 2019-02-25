<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Game;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\EntityRepository;

class ProtocolRepository extends EntityRepository
{
    public function findForListing(Game $game): Collection
    {
        return new ArrayCollection(
            $this->findBy(
                [
                    'parent' => null,
                    'game' => $game
                ],
                [
                    'createdAt' => 'desc'
                ]
            )
        );
    }
}
