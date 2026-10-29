/**
 * @author Delgraf
 * @copyright Copyright (c) 2026 Delgraf (https://www.delgraf.com)
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License (AFL 3.0)
 * @package Delgraf_ItalianValidation
 *
 * Single source of truth for the Italian validation rules.
 * Each rule: { validate: function (value): boolean, message: function (): string }.
 * Empty values are NOT handled here: callers treat them as valid (use "required-entry" to make a field mandatory).
 */
define([
    'jquery',
    'mage/translate'
], function ($) {
    'use strict';

    /**
     * Check digit used by both Partita IVA and numeric Codice Fiscale (11 digits).
     *
     * @param {String} value
     * @returns {Boolean}
     */
    function isValidElevenDigitCode(value) {
        var sum = 0,
            digit,
            i;

        if (!/^[0-9]{11}$/.test(value)) {
            return false;
        }

        for (i = 0; i <= 9; i += 2) {
            sum += parseInt(value.charAt(i), 10);
        }

        for (i = 1; i <= 9; i += 2) {
            digit = 2 * parseInt(value.charAt(i), 10);
            sum += digit > 9 ? digit - 9 : digit;
        }

        return (10 - sum % 10) % 10 === parseInt(value.charAt(10), 10);
    }

    /**
     * Alphanumeric Codice Fiscale (16 chars), omocodia supported.
     *
     * @param {String} value
     * @returns {Boolean}
     */
    function isValidCodiceFiscale(value) {
        var oddMap = [1, 0, 5, 7, 9, 13, 15, 17, 19, 21, 1, 0, 5, 7, 9, 13, 15, 17,
                19, 21, 2, 4, 18, 20, 11, 3, 6, 8, 12, 14, 16, 10, 22, 25, 24, 23],
            cf = $.trim(value).toUpperCase(),
            sum = 0,
            code,
            i;

        if (!/^[A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST][0-9LMNPQRSTUV]{2}[A-Z][0-9LMNPQRSTUV]{3}[A-Z]$/.test(cf)) {
            return false;
        }

        for (i = 0; i < 15; i++) {
            code = cf.charCodeAt(i);
            // Digits 0-9 -> 0-9, letters A-Z -> 10-35
            code = code < 65 ? code - 48 : code - 55;

            if (i % 2 === 0) {
                sum += oddMap[code];
            } else {
                sum += code < 10 ? code : code - 10;
            }
        }

        return String.fromCharCode(65 + sum % 26) === cf.charAt(15);
    }

    /**
     * SDI recipient code (7 alphanumeric chars) or PEC e-mail address.
     *
     * @param {String} value
     * @returns {Boolean}
     */
    function isValidRecapitoFatturaElettronica(value) {
        var sdiCode = /^[a-zA-Z0-9]{7}$/,
            // Same e-mail pattern used by Magento's "validate-email" rule
            email = /^([a-z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]|[ -퟿豈-﷏ﷰ-￯])+(\.([a-z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]|[ -퟿豈-﷏ﷰ-￯])+)*@([a-z0-9-]|[ -퟿豈-﷏ﷰ-￯])+(\.([a-z0-9-]|[ -퟿豈-﷏ﷰ-￯])+)*\.(([a-z]|[ -퟿豈-﷏ﷰ-￯]){2,})$/i; //eslint-disable-line max-len

        value = $.trim(value);

        return sdiCode.test(value) || email.test(value);
    }

    return {
        'validate-codicefiscale': {
            validate: isValidCodiceFiscale,
            message: function () {
                return $.mage.__('Please enter a valid tax code (e.g. NTRFNC78E28I625L).');
            }
        },
        'validate-codicefiscalenumerico': {
            validate: function (value) {
                return isValidElevenDigitCode($.trim(value));
            },
            message: function () {
                return $.mage.__('Please enter a valid numeric tax code (e.g. 02418800963).');
            }
        },
        'validate-partitaiva': {
            validate: function (value) {
                return isValidElevenDigitCode($.trim(value));
            },
            message: function () {
                return $.mage.__('Please enter a valid VAT number (e.g. 02418800963).');
            }
        },
        'validate-recapitofatturaelettronica': {
            validate: isValidRecapitoFatturaElettronica,
            message: function () {
                return $.mage.__('Please enter a valid recipient code or PEC address (e.g. M5UXCR1 or mariorossi@pec.it).');
            }
        }
    };
});
