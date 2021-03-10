-- Users table seeds here (Example)
INSERT INTO users (name, email) VALUES ('Jack', 'jack@mail.com');
INSERT INTO users (name, email) VALUES ('Kira', 'kira@aol.com');
INSERT INTO users (name, email) VALUES ('John', 'john@something.com');
INSERT INTO users (name, email) VALUES ('Brett', 'brett@outlook.com');
INSERT INTO users (name, email) VALUES ('Susan', 'S@a.com');
INSERT INTO users (name, email) VALUES ('Jessica', 'jess@google.com');






INSERT INTO polls (user_id, title, description, admin_url, voting_url, numops) VALUES (1, 'colors poll', 'poll about colors', 'hello', 'jajaja', 7);
INSERT INTO polls (user_id, title, description, admin_url, voting_url, numops) VALUES (3, 'animals poll', 'poll about animals', 'jellosadsasd', 'hajaja', 4);
INSERT INTO polls (user_id, title, description, admin_url, voting_url, numops) VALUES (2, 'presidents poll', 'poll about pres', 'sellds', 'dajaja', 7);



INSERT INTO options (poll_id, choice) VALUES (1, 'blue');
INSERT INTO options (poll_id, choice) VALUES (1, 'red');
INSERT INTO options (poll_id, choice) VALUES (1, 'green');
INSERT INTO options (poll_id, choice) VALUES (1,' pink');
INSERT INTO options (poll_id, choice) VALUES (1, 'purple');
INSERT INTO options (poll_id, choice) VALUES (1, 'orange');
INSERT INTO options (poll_id, choice) VALUES (1, 'red');

INSERT INTO options (poll_id, choice) VALUES (2, 'dog');
INSERT INTO options (poll_id, choice) VALUES (2, 'cat');
INSERT INTO options (poll_id, choice) VALUES (2, 'mouse');
INSERT INTO options (poll_id, choice) VALUES (2, 'bear');

INSERT INTO options (poll_id, choice) VALUES (3, 'Clinton');
INSERT INTO options (poll_id, choice) VALUES (3, 'Obama');
INSERT INTO options (poll_id, choice) VALUES (3, 'Trump');
INSERT INTO options (poll_id, choice) VALUES (3, 'Lincoln');
INSERT INTO options (poll_id, choice) VALUES (3, 'Roosevelt');
INSERT INTO options (poll_id, choice) VALUES (3, 'JFK');
INSERT INTO options (poll_id, choice) VALUES (3, 'Bush Jr');


INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 1, 7, null);
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 2, 5, null);
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 3, 3, null);
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 4, 1, null);
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 5, 6, null);
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 6, 4, null);
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 7, 2, null);

INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 1, 1, 'jacob');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 2, 2, 'jacob');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 3, 3, 'jacob');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 4, 4, 'jacob');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 5, 5, 'jacob');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 6, 6, 'jacob');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 7, 7, 'jacob');

INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 1, 6, 'randy');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 2, 7, 'randy');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 3, 1, 'randy');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 4, 2, 'randy');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 5, 3, 'randy');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 6, 4, 'randy');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 7, 5, 'randy');

INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 1, 3, 'stephanie');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 2, 4, 'stephanie');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 3, 5, 'stephanie');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 4, 6, 'stephanie');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 5, 7, 'stephanie');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 6, 1, 'stephanie');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (1, 7, 2, 'stephanie');

/****************************************************************************************/
/****************************************************************************************/

INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (2, 1, 4, null);
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (2, 2, 2, null);
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (2, 3, 1, null);
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (2, 4, 3, null);
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (2, 5, 5, null);

INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (2, 1, 3, 'John');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (2, 2, 4, 'John');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (2, 3, 1, 'John');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (2, 4, 3, 'John');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (2, 5, 5, 'John');

INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (2, 1, 4, 'Cathy');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (2, 2, 2, 'Cathy');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (2, 3, 5, 'Cathy');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (2, 4, 1, 'Cathy');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (2, 5, 3, 'Cathy');

INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (2, 1, 1, 'Jacob');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (2, 2, 2, 'Jacob');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (2, 3, 2, 'Jacob');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (2, 4, 4, 'Jacob');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (2, 5, 5, 'Jacob');

/****************************************************************************************/
/****************************************************************************************/

INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (3, 1, 7, 'amy');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (3, 2, 5, 'amy');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (3, 3, 3, 'amy');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (3, 4, 2, 'amy');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (3, 5, 6, 'amy');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (3, 6, 4, 'amy');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (3, 7, 1, 'amy');

INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (3, 1, 1, 'carl');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (3, 2, 2, 'carl');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (3, 3, 3, 'carl');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (3, 4, 4, 'carl');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (3, 5, 5, 'carl');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (3, 6, 6, 'carl');
INSERT INTO votes (poll_id, option_id, priority, guest_name) VALUES (3, 7, 7, 'carl');

INSERT INTO votes (poll_id, option_id, priority) VALUES (3, 1, 7);
INSERT INTO votes (poll_id, option_id, priority) VALUES (3, 2, 6);
INSERT INTO votes (poll_id, option_id, priority) VALUES (3, 3, 5);
INSERT INTO votes (poll_id, option_id, priority) VALUES (3, 4, 4);
INSERT INTO votes (poll_id, option_id, priority) VALUES (3, 5, 3);
INSERT INTO votes (poll_id, option_id, priority) VALUES (3, 6, 2);
INSERT INTO votes (poll_id, option_id, priority) VALUES (3, 7, 1);


INSERT INTO votes (poll_id, option_id, priority) VALUES (3, 1, 3);
INSERT INTO votes (poll_id, option_id, priority) VALUES (3, 2, 2);
INSERT INTO votes (poll_id, option_id, priority) VALUES (3, 3, 1);
INSERT INTO votes (poll_id, option_id, priority) VALUES (3, 4, 4);
INSERT INTO votes (poll_id, option_id, priority) VALUES (3, 5, 5);
INSERT INTO votes (poll_id, option_id, priority) VALUES (3, 6, 6);
INSERT INTO votes (poll_id, option_id, priority) VALUES (3, 7, 7);



INSERT INTO votes (poll_id, option_id, priority) VALUES (3, 1, 7);
INSERT INTO votes (poll_id, option_id, priority) VALUES (3, 2, 6);
INSERT INTO votes (poll_id, option_id, priority) VALUES (3, 3, 5);
INSERT INTO votes (poll_id, option_id, priority) VALUES (3, 4, 4);
INSERT INTO votes (poll_id, option_id, priority) VALUES (3, 5, 3);
INSERT INTO votes (poll_id, option_id, priority) VALUES (3, 6, 2);
INSERT INTO votes (poll_id, option_id, priority) VALUES (3, 7, 1);
