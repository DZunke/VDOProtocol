<?php

declare(strict_types=1);

namespace App\Entity;

use DateTimeImmutable;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ProtocolRepository")
 */
class Protocol
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="NONE")
     * @ORM\Column(type="guid")
     *
     * @var string
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Game", inversedBy="protocol", fetch="EXTRA_LAZY")
     *
     * @var Game
     */
    private $game;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Protocol", inversedBy="children")
     * @ORM\JoinColumn(nullable=true)
     *
     * @var Protocol|null
     */
    private $parent;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Protocol", mappedBy="parent", orphanRemoval=true, cascade={"ALL"})
     *
     * @var Collection&Protocol[]
     */
    private $children;

    /**
     * @ORM\Column(type="text")
     *
     * @var string
     */
    private $content = '';

    /**
     * @ORM\Column(type="string")
     *
     * @var string
     */
    private $sender = '';

    /**
     * @ORM\Column(type="string")
     *
     * @var string
     */
    private $recipent = '';

    /**
     * @ORM\Column(type="datetime_immutable")
     *
     * @var DateTimeInterface
     */
    private $createdAt;

    public function __construct()
    {
        $this->id        = Uuid::uuid4()->toString();
        $this->children  = new ArrayCollection();
        $this->createdAt = new DateTimeImmutable();
    }

    public static function create(Game $game, string $content) : Protocol
    {
        $protocol          = new self();
        $protocol->game    = $game;
        $protocol->content = $content;

        return $protocol;
    }

    public function getId() : string
    {
        return $this->id;
    }

    public function getGame() : Game
    {
        return $this->game;
    }

    public function getParent() : ?Protocol
    {
        return $this->parent;
    }

    public function setParent(?Protocol $parent) : void
    {
        $this->parent = $parent;
    }

    /**
     * @return Collection&Protocol[]
     */
    public function getChildren() : Collection
    {
        return new ArrayCollection($this->children->toArray());
    }

    public function addChild(Protocol $protocol) : void
    {
        $protocol->parent = $this;
        $this->children->add($protocol);
    }

    public function getContent() : string
    {
        return $this->content;
    }

    public function setContent(string $content) : void
    {
        $this->content = $content;
    }

    public function getSender() : string
    {
        return $this->sender;
    }

    public function setSender(string $sender) : void
    {
        $this->sender = $sender;
    }

    public function getRecipent() : string
    {
        return $this->recipent;
    }

    public function setRecipent(string $recipent) : void
    {
        $this->recipent = $recipent;
    }

    public function getCreatedAt() : DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(DateTimeInterface $createdAt) : void
    {
        $this->createdAt = $createdAt;
    }
}
