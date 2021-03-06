<!-- HOMEPAGE -->

GET - / : takes us to homepage

<!-- CREATE: -->

GET - /poll : on the homepage, there will be a 'create new poll' button. this takes us to a page where we are showed a form to create a poll
POST - /poll : creates a new poll by submitting a form, and they receive a poll_id

<!-- the poll creator gets 2 links at this point, one link for sharing with potential voters, and the other link to access their created poll,
and edit it at any time. -->

<!-- VOTE -->

GET - /vote/:poll_id takes voter to the specified poll so they can submit vote (voting_url)
POST - /vote : submits user votes

<!-- RESULTS -->

GET - /results/:poll_id : displays the results of the poll; poll id specified

<!-- EDIT & DELETE -->

GET - /poll/:poll_id takes creator to a page where they can choose to edit or delete a poll (admin_url)
POST - /poll/:poll_id/delete allows creator to delete a poll

---

(stretch)GET - /polls/:user_email takes user to a page with all polls associated with that email address
(stretch)GET - /poll/:user_email/results shows a poll creator the results of all the polls they have created.

---
