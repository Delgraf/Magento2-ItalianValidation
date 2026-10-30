# Italian Validation for Amasty Customer Attributes (Magento 2)

[![Latest Version on Packagist](https://img.shields.io/packagist/v/delgraf/module-italian-validation.svg)](https://packagist.org/packages/delgraf/module-italian-validation)
[![Total Downloads](https://img.shields.io/packagist/dt/delgraf/module-italian-validation.svg)](https://packagist.org/packages/delgraf/module-italian-validation)
[![PHP Version](https://img.shields.io/packagist/php-v/delgraf/module-italian-validation.svg)](https://packagist.org/packages/delgraf/module-italian-validation)
[![License](https://img.shields.io/packagist/l/delgraf/module-italian-validation.svg)](https://packagist.org/packages/delgraf/module-italian-validation)

Magento 2 module (`Delgraf_ItalianValidation`) that adds Italian input validations to
**Amasty Customer Attributes**: Codice Fiscale, Partita IVA and the e-invoicing recipient (SDI code / PEC).

It extends Amasty through a plugin and never touches Amasty files, so the validations survive Amasty upgrades.

## Features

| Rule code | Label in admin | Accepts |
|---|---|---|
| `validate-codicefiscale` | Codice Fiscale | 16-char personal tax code, check character verified, omocodia supported, case-insensitive |
| `validate-codicefiscalenumerico` | Codice Fiscale Numerico | 11-digit tax code of companies/organizations, check digit verified |
| `validate-partitaiva` | Partita IVA | 11-digit Italian VAT number, check digit verified |
| `validate-recapitofatturaelettronica` | Recapito Fattura Elettronica | 7-char SDI recipient code or PEC e-mail address |

- The rules appear in the **Input Validation** dropdown of every Amasty customer attribute.
- They run on jQuery Validate forms (registration, account edit) **and** on UI component forms (checkout, admin customer form).
- Empty values pass validation: set **Values Required** on the attribute to make a field mandatory.
- Error messages are translated into Italian (`i18n/it_IT.csv`).

## Requirements

- Magento Open Source / Adobe Commerce 2.4.x (`magento/framework` ^103.0)
- PHP 8.1+
- [Amasty Customer Attributes](https://amasty.com/customer-attributes-for-magento-2.html) 2.6+ (`amasty/module-customer-attributes`)

> **Note:** Amasty Customer Attributes is a commercial extension and is not available on Packagist.
> It must be installable from Amasty's own Composer repository (configured with your Amasty access keys)
> before you require this package; otherwise Composer cannot resolve the dependency.

## Installation

```bash
composer require delgraf/module-italian-validation:dev-master
bin/magento module:enable Delgraf_ItalianValidation
bin/magento setup:upgrade
bin/magento setup:di:compile
bin/magento setup:static-content:deploy -f it_IT en_US
bin/magento cache:flush
```

In developer mode `setup:di:compile` and `setup:static-content:deploy` are not required.

## Usage

1. Go to **Customers → Customer Attributes** (Amasty) and edit or create a *Text Field* attribute.
2. In **Input Validation** select one of the Italian rules.
3. Save and flush the cache.

If an attribute already uses one of the rule codes above (e.g. the rules were previously copied
into Amasty's `Model/Validation` folder), it keeps working without changes. In that case remove the
old copies from Amasty to avoid loading the same rule twice.

## Updating

```bash
composer update delgraf/module-italian-validation
bin/magento setup:upgrade
bin/magento cache:flush
```

## Uninstall

```bash
bin/magento module:disable Delgraf_ItalianValidation
composer remove delgraf/module-italian-validation
bin/magento setup:upgrade
bin/magento cache:flush
```

Attributes still set to one of these rules will stop validating: change their **Input Validation** first.

## Architecture

```
├── Api/ValidatorInterface.php                    # Validator contract (code, label, option)
├── Model/
│   ├── ValidatorPool.php                         # Validators registered in etc/di.xml
│   └── Validator/                                # One class per rule (code + label)
├── Plugin/Amasty/CustomerAttributes/
│   └── ValidationPlugin.php                      # Adds options to Amasty dropdown + JS loader
├── etc/di.xml                                    # Pool configuration and plugin declaration
├── i18n/                                         # it_IT / en_US translations
└── view/base/
    ├── requirejs-config.js                       # Mixins for mage/validation and Magento_Ui validator
    └── web/js/validation/
        ├── rules.js                              # Validation logic (single source of truth)
        ├── jquery-rules.js                       # jQuery Validate registration
        ├── mage-validation-mixin.js              # Registers rules on every mage/validation form
        └── ui-validator-mixin.js                 # Registers rules in Magento_Ui validator (checkout)
```

### Adding a new rule

1. Create `Model/Validator/MyRule.php` extending `AbstractValidator` and set `CODE` and `LABEL`.
2. Register it in `etc/di.xml` under `Delgraf\ItalianValidation\Model\ValidatorPool`.
3. Add an entry with the same code (`validate` + `message`) in `view/base/web/js/validation/rules.js`.

### Disabling a rule

In your own module's `etc/di.xml` (with `<sequence>` on `Delgraf_ItalianValidation`), set the item to `null`:

```xml
<type name="Delgraf\ItalianValidation\Model\ValidatorPool">
    <arguments>
        <argument name="validators" xsi:type="array">
            <item name="codice_fiscale_numerico" xsi:type="null"/>
        </argument>
    </arguments>
</type>
```

Item names: `codice_fiscale`, `codice_fiscale_numerico`, `partita_iva`, `recapito_fattura_elettronica`.

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## License

This module is dual-licensed, like Magento Open Source, under the
[Open Software License 3.0 (OSL-3.0)](LICENSE.txt) and the [Academic Free License 3.0 (AFL-3.0)](LICENSE_AFL.txt).
You may choose either license.

## Support

Issues and pull requests are welcome on GitHub.
Developed by [Delgraf](https://www.delgraf.com).
