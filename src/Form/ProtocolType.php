<?php

declare(strict_types=1);

namespace App\Form;

use App\Entity\Protocol;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\CallbackTransformer;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;

final class ProtocolType extends AbstractType
{
    /** @var EntityManagerInterface */
    private $entityManager;

    /**
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Protocol::class,
        ]);
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('parent', HiddenType::class, ['required' => false]);
        $builder->get('parent')->addModelTransformer(new CallbackTransformer(
            function (Protocol $protocol = null) {
                return $protocol ? $protocol->getId() : null;
            },
            function (string $protocol = null) {
                if ($protocol === null) {
                    return null;
                }
                return $this->entityManager->getRepository(Protocol::class)->find($protocol);
            }
        ));

        $builder->add(
            'sender',
            TextType::class,
            [
                'empty_data' => '',
                'required' => false,
                'attr' => [
                    'placeholder' => 'Sender',
                ],
            ]
        );
        $builder->add(
            'recipent',
            TextType::class,
            [
                'empty_data' => '',
                'required' => false,
                'attr' => [
                    'placeholder' => 'Empfänger',
                ],
            ]
        );
        $builder->add(
            'content',
            TextareaType::class,
            [
                'empty_data' => '',
                'constraints' => [
                    new NotBlank(['message' => 'Ein Funkspruch ist niemals leer!']),
                ],
            ]
        );
    }
}
