/**
 * @author Delgraf
 * @copyright Copyright (c) 2026 Delgraf (https://www.delgraf.com)
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License (AFL 3.0)
 * @package Delgraf_ItalianValidation
 *
 * Registers the Italian rules in Magento_Ui validator (checkout, UI component forms).
 */
define([
    'jquery',
    'Delgraf_ItalianValidation/js/validation/rules'
], function ($, rules) {
    'use strict';

    /**
     * @param {*} value
     * @returns {Boolean}
     */
    function isEmpty(value) {
        return value === '' || value === null || value === undefined ||
            (typeof value === 'string' && $.trim(value) === '');
    }

    return function (validator) {
        $.each(rules, function (code, rule) {
            validator.addRule(code, function (value) {
                return isEmpty(value) || rule.validate(String(value));
            }, rule.message());
        });

        return validator;
    };
});
