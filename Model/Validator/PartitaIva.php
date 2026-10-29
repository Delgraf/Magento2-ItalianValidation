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

/**
 * Italian VAT number (11 digits, check digit).
 */
class PartitaIva extends AbstractValidator
{
    protected const CODE = 'validate-partitaiva';
    protected const LABEL = 'Partita IVA';
}
