/**
 * @author Delgraf
 * @copyright Copyright (c) 2026 Delgraf (https://www.delgraf.com)
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License (AFL 3.0)
 * @package Delgraf_ItalianValidation
 *
 * Registers the Italian rules as jQuery Validate methods (CSS-class based rules).
 * Safe to call multiple times.
 */
define([
    'jquery',
    'Delgraf_ItalianValidation/js/validation/rules',
    'jquery/validate'
], function ($, rules) {
    'use strict';

    /**
     * @param {Array} [codes] - rule codes to register; all rules when omitted
     */
    return function (codes) {
        codes = codes || Object.keys(rules);

        $.each(codes, function (index, code) {
            var rule = rules[code];

            if (!rule || $.validator.methods[code]) {
                return;
            }

            $.validator.addMethod(code, function (value, element) {
                return this.optional(element) || rule.validate(value);
            }, rule.message);
        });
    };
});
