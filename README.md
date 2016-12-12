Credit card payment system (CCP)

is a REST API system.  It will take in a JSON document containing number, expiration, cvv, etc.   CCP will validate and transform it to industry standard format and send it over to a dummy back end processing provider.  The response from provider contains approval code or error code, that will be part of the our REST response. The record is stored in some sort of document store that we have easy access to in the google ecosystem.  Nightly, one instance of our system will be triggered, to scan the document store and process all the approved records and build a batch document and send it over to another dummy back end system for settlement (meaning getting money).

