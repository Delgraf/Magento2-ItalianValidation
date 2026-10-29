<?php
/**
 * @author Delgraf
 * @copyright Copyright (c) 2026 Delgraf (https://www.delgraf.com)
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License (AFL 3.0)
 * @package Delgraf_ItalianValidation
 */

declare(strict_types=1);

namespace Delgraf\ItalianValidation\Api;

/**
 * Contract for an input validation rule exposed to Amasty Customer Attributes.
 */
interface ValidatorInterface
{
    /**
     * CSS class / rule name saved as the attribute's frontend_class (e.g. "validate-partitaiva").
     */
    public function getCode(): string;

    /**
     * Label shown in the "Input Validation" dropdown in admin.
     */
    public function getLabel(): string;

    /**
     * Option in the format expected by Amasty: ['value' => ..., 'label' => ...].
     */
    public function toOption(): array;
}
