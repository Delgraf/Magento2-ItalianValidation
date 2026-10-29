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
 * E-invoicing recipient: 7-char SDI code or PEC e-mail address.
 */
class RecapitoFatturaElettronica extends AbstractValidator
{
    protected const CODE = 'validate-recapitofatturaelettronica';
    protected const LABEL = 'Recapito Fattura Elettronica';
}
