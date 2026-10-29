<?php
/**
 * @author Delgraf
 * @copyright Copyright (c) 2026 Delgraf (https://www.delgraf.com)
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License (AFL 3.0)
 * @package Delgraf_ItalianValidation
 */

declare(strict_types=1);

namespace Delgraf\ItalianValidation\Model;

use Delgraf\ItalianValidation\Api\ValidatorInterface;

/**
 * Collection of validators configured in etc/di.xml.
 */
class ValidatorPool
{
    /**
     * @var ValidatorInterface[]
     */
    private array $validators;

    /**
     * @param array<string, ValidatorInterface|null> $validators
     */
    public function __construct(array $validators = [])
    {
        // Items set to xsi:type="null" in di.xml are treated as disabled
        $validators = array_filter($validators, static fn ($validator): bool => $validator !== null);

        foreach ($validators as $name => $validator) {
            if (!$validator instanceof ValidatorInterface) {
                throw new \InvalidArgumentException(
                    sprintf('Validator "%s" must implement %s', $name, ValidatorInterface::class)
                );
            }
        }
        $this->validators = $validators;
    }

    /**
     * @return ValidatorInterface[]
     */
    public function getAll(): array
    {
        return $this->validators;
    }

    /**
     * @return string[]
     */
    public function getCodes(): array
    {
        return array_values(array_map(
            static fn (ValidatorInterface $validator): string => $validator->getCode(),
            $this->validators
        ));
    }
}
