import { FhirResourceType } from '$lib/generated/FhirResourceType';

export enum FhirFieldType {
	/**
	 * A stream of bytes
	 *
	 * JS-Type: `string`
	 *
	 * Regex: none
	 */
	BASE_64_BINARY = 'base64Binary',
	/**
	 * Value of "true" or "false"
	 *
	 * JS-Type: `boolean`
	 *
	 * Regex: `^true|false$`
	 */
	BOOLEAN = 'boolean',
	/**
	 * A URI that is a reference to a canonical URL on a FHIR resource
	 *
	 * JS-Type: `string`
	 *
	 * Regex: `^\S*$`
	 */
	CANONICAL = 'canonical',
	/**
	 * A string which has at least one character and no leading or trailing whitespace and where there is no whitespace other than single spaces in the contents
	 *
	 * JS-Type: `string`
	 *
	 * Regex: `^[^\s]+( [^\s]+)*$`
	 */
	CODE = 'code',
	/**
	 * A date or partial date (e.g. just year or year + month). There is no UTC offset.
	 * The format is a union of the schema types gYear, gYearMonth and date.
	 * Dates SHALL be valid dates.
	 *
	 * JS-Type: `string`
	 *
	 * Regex: `^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?$`
	 */
	DATE = 'date',
	/**
	 * A date, date-time or partial date (e.g. just year or year + month).  If hours and minutes are specified, a UTC offset SHALL be populated. The format is a union of the schema types gYear, gYearMonth, date and dateTime. Seconds must be provided due to schema type constraints but may be zero-filled and may be ignored.
	 * Dates SHALL be valid dates.
	 *
	 * JS-Type: `string`
	 *
	 * Regex: `^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]{1,9})?)?)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)))?$`
	 */
	DATE_TIME = 'dateTime',
	/**
	 * A rational number with implicit precision
	 *
	 * JS-Type: `number`
	 *
	 * Regex: `^-?(0|[1-9][0-9]*)(\.[0-9]+)?([eE][+-]?[0-9]+)?$`
	 */
	DECIMAL = 'decimal',
	/**
	 * Any combination of letters, numerals, "-" and ".", with a length limit of 64 characters.  (This might be an integer, an unprefixed OID, UUID or any other identifier pattern that meets these constraints.)  Ids are case-insensitive.
	 *
	 * JS-Type: `string`
	 *
	 * Regex: `^[A-Za-z0-9\-\.]{1,64}$`
	 */
	ID = 'id',
	/**
	 * An instant in time - known at least to the second
	 *
	 * JS-Type: `string`
	 *
	 * Regex: `^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]{1,9})?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))$`
	 */
	INSTANT = 'instant',
	/**
	 * A whole number
	 *
	 * JS-Type: `string`
	 *
	 * Regex: ``
	 */
	INTEGER = 'integer',
	/**
	 * A very large whole number
	 *
	 * JS-Type: `string`
	 *
	 * Regex: ``
	 */
	INTEGER_64 = 'integer64',
	/**
	 * A string that may contain Github Flavored Markdown syntax for optional processing by a markdown presentation engine
	 *
	 * JS-Type: `string`
	 *
	 * Regex: ``
	 */
	MARKDOWN = 'markdown',
	/**
	 * An OID represented as a URI
	 *
	 * JS-Type: `string`
	 *
	 * Regex: ``
	 */
	OID = 'oid',
	/**
	 * An integer with a value that is positive (e.g. >0)
	 *
	 * JS-Type: `string`
	 *
	 * Regex: ``
	 */
	POSITIVE_INT = 'positiveInt',
	/**
	 * A sequence of Unicode characters
	 *
	 * JS-Type: `string`
	 *
	 * Regex: `^[ \r\n\t\S]+$`
	 */
	STRING = 'string',
	/**
	 * A time during the day, with no date specified
	 *
	 * JS-Type: `string`
	 *
	 * Regex: ``
	 */
	TIME = 'time',
	/**
	 * An integer with a value that is not negative (e.g. >= 0)
	 *
	 * JS-Type: `string`
	 *
	 * Regex: ``
	 */
	UNSIGNED_INT = "unsignedInt",
	/**
	 * String of characters used to identify a name or a resource
	 *
	 * JS-Type: `string`
	 *
	 * Regex: ``
	 */
	URI = "uri",
	/**
	 * A URI that is a literal reference
	 *
	 * JS-Type: `string`
	 *
	 * Regex: ``
	 */
	URL = "url",
}

export interface FhirResourceField {
	/**
	 * Json path for this field
	 */
	path: string;
	/**
	 * Resource type name
	 */
	name: string;
	type:;
	/**
	 * Description for this field
	 */
	description?: string;
}

export interface FhirResourceMetadata {
	name: FhirResourceType;
	description?: string;
	fields: ResourceField[];
}

export type FhirResourceMetadataMap = Partial<Record<FhirResourceType, ResourceMetadata>>;
