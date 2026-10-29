<?php
/**
 * @author Delgraf
 * @copyright Copyright (c) 2026 Delgraf (https://www.delgraf.com)
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License (AFL 3.0)
 * @package Delgraf_ItalianValidation
 */

declare(strict_types=1);

namespace Delgraf\ItalianValidation\Plugin\Amasty\CustomerAttributes;

use Amasty\CustomerAttributes\Model\Validation;
use Delgraf\ItalianValidation\Model\ValidatorPool;
use Magento\Framework\Serialize\Serializer\Json;

/**
 * Adds the Italian validators to Amasty's admin dropdown and to the
 * JavaScript that Amasty prints next to customer attribute fields.
 */
class ValidationPlugin
{
    private const JQUERY_RULES_MODULE = 'Delgraf_ItalianValidation/js/validation/jquery-rules';

    public function __construct(
        private readonly ValidatorPool $validatorPool,
        private readonly Json $json
    ) {
    }

    /**
     * Append our options to the "Input Validation" dropdown (skipping codes already present).
     */
    public function afterGetAdditionalValidation(Validation $subject, array $result): array
    {
        $existing = array_column($result, 'value');

        foreach ($this->validatorPool->getAll() as $validator) {
            if (!in_array($validator->getCode(), $existing, true)) {
                $result[] = $validator->toOption();
            }
        }

        return $result;
    }

    /**
     * Append a RequireJS call that registers our rules in jQuery Validate.
     * Amasty wraps this string in a <script> tag.
     */
    public function afterGetJS(Validation $subject, string $result): string
    {
        $codes = $this->json->serialize($this->validatorPool->getCodes());

        return $result . sprintf(
            "\nrequire(['%s'], function (register) { register(%s); });\n",
            self::JQUERY_RULES_MODULE,
            $codes
        );
    }
}
