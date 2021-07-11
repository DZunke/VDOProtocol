<?php

declare(strict_types=1);

namespace VDOLog\Web\Repository;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\EntityRepository;
use VDOLog\Web\Entity\Game;
use VDOLog\Web\Entity\Protocol;

/**
 * @extends EntityRepository<Protocol>
 */
class ProtocolRepository extends EntityRepository
{
    /**
     * @return Collection<int,Protocol>
     */
    public function findForListing(Game $game): Collection
    {
        return new ArrayCollection(
            $this->findBy(
                [
                    'parent' => null,
                    'game' => $game,
                ],
                ['createdAt' => 'desc']
            )
        );
    }
}