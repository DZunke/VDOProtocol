<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\Game;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractController
{
    /**
     * @Route("/", name="dashboard")
     */
    public function index() : Response
    {
        $games = $this->getDoctrine()->getRepository(Game::class)->findBy([], ['createdAt' => 'desc']);

        return $this->render('dashboard/index.html.twig', ['games' => $games]);
    }
}
