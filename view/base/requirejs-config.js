/**
 * @author Delgraf
 * @copyright Copyright (c) 2026 Delgraf (https://www.delgraf.com)
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License (AFL 3.0)
 * @package Delgraf_ItalianValidation
 */
var config = {
    config: {
        mixins: {
            // jQuery Validate based forms (registration, account edit, admin forms)
            'mage/validation': {
                'Delgraf_ItalianValidation/js/validation/mage-validation-mixin': true
            },
            // UI component forms (checkout, admin customer form)
            'Magento_Ui/js/lib/validation/validator': {
                'Delgraf_ItalianValidation/js/validation/ui-validator-mixin': true
            }
        }
    }
};
