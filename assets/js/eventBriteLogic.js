//Eventbrite API Key: QABLZYHZM2VKOHLOEC22

// Client secret: K3Y5D2CXSGA25AW2NSO2EA25SWYEQU5TVH7IFG5SYQ6NFGFPIS
// Your personal OAuth token : QABLZYHZM2VKOHLOEC22
// Anonymous access OAuth token: KNQRANENAVBV4DYO3ORN

//User Authentication
https://www.eventbriteapi.com/v3/users/me/?token=QABLZYHZM2VKOHLOEC22

//Base URL
//https://www.eventbriteapi.com/v3

//Using Eventbrite API to find an event
curl -X GET   https://www.eventbriteapi.com/v3/users/me/events/   -H 'Authorization: Bearer QABLZYHZM2VKOHLOEC22' 

// Client-side flow
// To authenticate a user from a client-side (JavaScript) application, simply redirect your users to the following url:
https://www.eventbrite.com/oauth/auth

// Using Header authentication (whatever that is)

curl -X GET   https://www.eventbriteapi.com/v3/categories/   -H 'Authorization: Bearer QABLZYHZM2VKOHLOEC22'

//authentication using a query string
https://www.eventbriteapi.com/v3/users/me/?token=QABLZYHZM2VKOHLOEC22