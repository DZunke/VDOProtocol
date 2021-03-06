<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Game;
use App\Entity\Protocol;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\EntityRepository;

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
