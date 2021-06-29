<?php

declare(strict_types=1);

namespace App\Form;

use App\Entity\Map;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\CallbackTransformer;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank;

final class MapType extends AbstractType
{
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults(['data_class' => Map::class]);
    }

    /** @inheritDoc */
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder->add(
            'name',
            TextType::class,
            [
                'empty_data' => '',
                'constraints' => [
                    new NotBlank(),
                ],
            ]
        );

        $builder->add(
            'map',
            HiddenType::class,
            ['empty_data' => '{}']
        );

        $builder->add(
            'map_image',
            HiddenType::class,
            ['empty_data' => '']
        );

        $builder->get('map_image')->addModelTransformer(
            new CallbackTransformer(
                static function (): string {
                    return '';
                },
                static function ($tagsAsString): string {
                    return $tagsAsString;
                }
            )
        );
    }
}
