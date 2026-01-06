What is Authentication
- authentication checks you are the person who say you are
- real life analogy
- you go to ATM mechine
- you enter password
- if password correct you can use your money 
- if wrong you can't use

In app like (websites/ mobile)
you enter email + password
you use google 
you use otp

so this is authentication it check you identity if you are the person 
who say you are you can use it other wise not allowed

Why we use Authentication
- To protect user data 
1. if we don't use authentication any one can see each other
2. message passwords and other info 
3. we don't want user data will lecked
4. example if you don't use authentication anyone can read your instagram DM'

What is Authentication
- authentication is the process where it checks wheather you are the person you claime to be
its like a ATM mechice where it checks your password if password is correct you can use your 
mechine if not you can't for protection of your money other people can't use it

in apps (websites/mobile apps)
we authenticate using email + password
and also google , OTP

Why we use Authentication
1. To protect user data
- without authentication anyone could see user data each other info 
example : if user is not authenticated anyone can see instagram DM's

its like your data is your money you don't want other pepoles use it so to protect your money you add password if
anyother person tired to unlock it using wrong identity and passwrod does not open


What problem exists
- http is state less which means on every response it who the user is which means after every response
new user

What is Sesssion
whenever user login server creates a session and store it to the server memory its a user
login info and when the session create server send cookie (pieace of data browser automatically send on every request)
 to browser and then server check cookie if cookie exists then the user stay logged in
 "Ahh this is Alice"

Why we use session  + cookies
session helps the user stay logged in and cookies server store the cookie in browser it actually store sessionId
which help to know who the user is can then later we can check in database this id belong to this user
so later we send the only that user info


What problem exists
- the http is state less which means every request - respose cycle server forget 
- who the user is for every new request sever thinks this is a new user

What is Session 
- when the user logged in server create session and store it to (memory/database/redies)
- session contain the info about user logged in 

- at the time of loggin server send the cookies to browser which help to remember the user
- cookies contian the sessionId which is send to server on every request

- server match the cookie with the session userId he created earlies
- then he know "Ahh this is Alice"

which help the user stay logged in

why user session + cookies
- session store in server which contain user id
- cookies store in browser which contain session id
which we use it to know user and give only his data 

Through this we are going to create session but before 
creating session we set config which means we set some 
rules its like before playing game this are rules you have to follow
1. app.use(session({
- this is a middleware that create session for logged in users and set rules
2. secret: 'keyboard cat',
- this means if someone tired to change cookies i will know
- and thie will make the cookie invalide
3. resave: false,
- its means if page reload this does not make session again 
that why we set it to false to save memory and performace
4. saveUninitialized: false,
- its mean that if someone come to our site we don't make session
for random visitors and bots thats why we do it to false
5. cookie: { secure: false }
- cookies will be create for http this is good for localhost development

if we make it true cookie: { secure: true }
- now the cookies and make for https and prevent miit security

1. app.use(session({
- this is a express session middleware that control session handling
- it insures how the session are created store and sent to browser

2. secret: 'keyboard cat',
- when the session is create we sign this to session ID of cookie
- this help if someone change the cookie then it become invalide 
- this secret is like in our session we write a special code if someone try to change it
- we know about it and it become invalide

3. resave: false,
- its mean we don't create session unitle it not modifyied
- this prevent memoray and performance

4. saveUninitialized: false,
- we don't create session for random visitors on our site
- it create session for only logged in users

5. cookie: { secure: false }
- this will send cookies to http which is for local development

- cookie: { secure: true }
- this will send cookies to https which is for production development



CREATE TABLE users (
 id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY
 username VARCHAR(100)


 req.session.userId = user.id;
 so this line simply means after login when user make 
 a request we know who the user is making request and
 which and their data to show