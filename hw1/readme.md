//Dai Huynh
//CSCI 3800
//Assignment 1


Alt-Svc →quic=":443"; ma=2592000; v="35,34"

Meaning: Custom header

Cache-Control →private, max-age=0, must-revalidate, no-transform

Meaning: Tells all caching mechanisms from server to client whether they may cache this object. It is measured in seconds

Content-Length →35434

Meaning: The length of the response body in octets (8-bit bytes)

Content-Type →application/json; charset=UTF-8

Meaning: The mime type of this content

Date →Sun, 05 Feb 2017 02:30:04 GMT

Meaning: The date and time that the message was sent

ETag →"vFp1TYDMppbWxVi0Wgw_upD83cI/3vvSKxJ416WsfBtvlfXFIgwIkwU"

Meaning: An identifier for a specific version of a resourse

Expires →Sun, 05 Feb 2017 02:30:04 GMT

Meaning: Gives the date/time after which the response is considered stale

Server →GSE

Meaning: A name for the server

Vary →Origin

Meaning: Tells downstream proxies how to match future request headers to decide whether the cached response can be used rather than requesting a fresh one from the origin server

Vary →X-Origin

Meaning: Tells downstream proxies how to match future request headers to decide whether the cached response can be used rather than requesting a fresh one from the origin server 

X-Content-Type-Options →nosniff

Meaning: The only defined value, "nosniff", prevents Internet Explorer from MIME-sniffing a response away from the declared content-type

X-Frame-Options →SAMEORIGIN

Meaning: Clickjacking protection: "deny" - no rendering within a frame, "sameorigin" - no rendering if origin mismatch

X-XSS-Protection →1; mode=block

Meaning: Cross-site scripting (XSS filter)
