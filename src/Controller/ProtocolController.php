<?php

namespace App\Controller;

use App\Entity\Game;
use App\Entity\Protocol;
use App\Form\ProtocolType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/game/{game}/protocol")
 */
class ProtocolController extends AbstractController
{
    /**
     * @Route("/", name="protocol_index")
     * @ParamConverter("game", class="App\Entity\Game", options={"id" = "game"})
     */
    public function index(Request $request, Game $game)
    {
        $form = $this->createForm(ProtocolType::class, Protocol::create($game, ''));
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->persist($form->getData());
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('protocol_index', ['game' => $game->getId()]);
        }

        return $this->render('protocol/index.html.twig', [
            'game' => $game,
            'protocol_list' => $this->getDoctrine()->getRepository(Protocol::class)->findForListing($game),
            'form' => $form->createView()
        ]);
    }
}
