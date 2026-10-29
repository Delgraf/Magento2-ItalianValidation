<?php
/**
 * @author Delgraf
 * @copyright Copyright (c) 2026 Delgraf (https://www.delgraf.com)
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License (AFL 3.0)
 * @package Delgraf_ItalianValidation
 */

declare(strict_types=1);

namespace Delgraf\ItalianValidation\Model\Validator;

use Delgraf\ItalianValidation\Api\ValidatorInterface;

/**
 * Base validator: subclasses only declare their code and label.
 * The actual client-side check lives in view/base/web/js/validation/rules.js,
 * keyed by the same code.
 */
abstract class AbstractValidator implements ValidatorInterface
{
    protected const CODE = '';
    protected const LABEL = '';

    public function getCode(): string
    {
        return static::CODE;
    }

    public function getLabel(): string
    {
        return (string)__(static::LABEL);
    }

    public function toOption(): array
    {
        return [
            'value' => $this->getCode(),
            'label' => $this->getLabel(),
        ];
    }
}
