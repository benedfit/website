<?php
namespace Craft;

/**
 * Craft by Pixel & Tonic
 *
 * @package   Craft
 * @author    Pixel & Tonic, Inc.
 * @copyright Copyright (c) 2013, Pixel & Tonic, Inc.
 * @license   http://buildwithcraft.com/license Craft License Agreement
 * @link      http://buildwithcraft.com
 */

/**
 * Entry content model class
 */
class ContentModel extends BaseModel
{
	private $_requiredFields;
	private $_attributeConfigs;

	/**
	 * @access protected
	 * @return array
	 */
	protected function defineAttributes()
	{
		$attributes = array(
			'id'        => AttributeType::Number,
			'elementId' => AttributeType::Number,
			'locale'    => AttributeType::Locale,
		);

		if (Craft::isInstalled() && !craft()->isConsole())
		{
			$allFields = craft()->fields->getAllFields();

			foreach ($allFields as $field)
			{
				$fieldType = craft()->fields->populateFieldType($field);

				if ($fieldType)
				{
					$attributeConfig = $fieldType->defineContentAttribute();
				}

				// Default to Mixed
				if (!$fieldType || !$attributeConfig)
				{
					$attributeConfig = AttributeType::Mixed;
				}

				$attributeConfig = ModelHelper::normalizeAttributeConfig($attributeConfig);
				$attributeConfig['label'] = $field->name;

				if (isset($this->_requiredFields) && in_array($field->id, $this->_requiredFields))
				{
					$attributeConfig['required'] = true;
				}

				$attributes[$field->handle] = $attributeConfig;
			}
		}

		return $attributes;
	}

	/**
	 * Returns this model's normalized attribute configs.
	 *
	 * @return array
	 */
	public function getAttributeConfigs()
	{
		if (!isset($this->_attributeConfigs))
		{
			$this->_attributeConfigs = parent::getAttributeConfigs();
		}

		return $this->_attributeConfigs;
	}

	/**
	 * Sets the required fields.
	 *
	 * @param array $requiredFields
	 */
	public function setRequiredFields($requiredFields)
	{
		$this->_requiredFields = $requiredFields;

		if (isset($this->_attributeConfigs))
		{
			foreach (craft()->fields->getAllFields() as $field)
			{
				if (in_array($field->id, $this->_requiredFields) && isset($this->_attributeConfigs[$field->handle]))
				{
					$this->_attributeConfigs[$field->handle]['required'] = true;
				}
			}
		}
	}
}
