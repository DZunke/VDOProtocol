<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/maps")
 */
final class MapsController extends AbstractController
{
    /**
     * @Route("/", name="maps_index")
     */
    public function index() : Response
    {
        return $this->render('maps/index.html.twig');
    }
}
