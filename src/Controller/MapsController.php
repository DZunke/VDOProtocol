<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\Map;
use App\Form\MapType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
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
    public function index(): Response
    {
        $maps = $this->getDoctrine()->getRepository(Map::class)->findBy([], ['name' => 'asc']);

        return $this->render(
            'maps/index.html.twig',
            ['maps' => $maps]
        );
    }

    /**
     * @Route("/new", name="maps_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $form = $this->createForm(MapType::class);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($form->getData());
            $entityManager->flush();

            $this->saveMapToFile($form->getData());

            $this->addFlash(
                'success',
                'Die Standortkarte mit dem Namen "' . $form->getData()->getName() . '" wurde erfolgreich gespeichert.'
            );

            return $this->redirectToRoute('maps_index');
        }

        return $this->render('maps/new.html.twig', ['form' => $form->createView()]);
    }

    /**
     * @Route("/{id}", name="maps_view", methods={"GET","POST"})
     */
    public function edit(Request $request, Map $map): Response
    {
        $form = $this->createForm(MapType::class, $map);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->flush();
            $this->saveMapToFile($map);

            $this->addFlash(
                'success',
                'Die Standortkarte mit dem Namen "' . $form->getData()->getName() . '" wurde erfolgreich bearbeitet.'
            );

            return $this->redirectToRoute('maps_view', ['id' => $map->getId()]);
        }

        return $this->render(
            'maps/view.html.twig',
            [
                'map' => $map,
                'form' => $form->createView(),
            ]
        );
    }

    private function saveMapToFile(Map $map) : string
    {
        $output_file = __DIR__ . '/../../public/maps/' . $map->getId() . '.png';

        $file = fopen($output_file, "wb");
        $data = explode(',', $map->getMapImage());
        fwrite($file, base64_decode($data[1]));
        fclose($file);

        return $output_file;
    }
}
