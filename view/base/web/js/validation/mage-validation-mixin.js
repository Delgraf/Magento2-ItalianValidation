/**
 * @author Delgraf
 * @copyright Copyright (c) 2026 Delgraf (https://www.delgraf.com)
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License (AFL 3.0)
 * @package Delgraf_ItalianValidation
 */
define([
    'Delgraf_ItalianValidation/js/validation/jquery-rules'
], function (registerJqueryRules) {
    'use strict';

    return function (validationWidget) {
        registerJqueryRules();

        return validationWidget;
    };
});
