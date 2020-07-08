const express = require("express");
const mysql = require("mysql");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

const app = express();

let connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "gymasnever"
});

connection.connect(function(err) {
    if (!!err) {
        console.log(err);
    }
    else {
        console.log("CONNECTED!");
    }
});

// This request makes a request on the DB to get all exercises (and their variants) that match with the selected muscle, goal and level
app.get("/requestexercises/:muscle/:goal/:level", function(req, res) {
    const muscle = req.params.muscle;
    const goal = req.params.goal;
    const level = req.params.level;
    connection.query("SELECT E.ID, E.Name, R.Reps, T.Tempo, E.ID_SameExercise, M.muscle_name FROM ( SELECT COUNT(*), ID_Exercise, ID_Reps, ID_Tempo	FROM ( SELECT ID_Exercise, ID_Reps, ID_Tempo FROM goalexercise WHERE ID_Goal = " + goal + " UNION ALL SELECT ID_Exercise, ID_Reps, ID_Tempo FROM levelexercise	WHERE ID_Level = " + level + " ) AS Sub1 GROUP BY ID_Exercise, ID_Reps, ID_Tempo HAVING COUNT(*) > 1 ) AS Sub2 INNER JOIN Exercise AS E ON Sub2.ID_Exercise = E.ID INNER JOIN Reps AS R ON Sub2.ID_Reps = R.ID INNER JOIN Tempo AS T ON Sub2.ID_Tempo = T.ID INNER JOIN Muscle AS M ON M.ID = E.ID_Muscle WHERE E.ID_Muscle = " + muscle + "", function(err, rows, fields) {
        if (!!err) {
            console.log("Error in the query");
        }
        else {
            console.log(rows.length);
        }
        res.send(rows);
    });
});
// This request makes a request on the DB to get all exercises (and their variants) that match with the selected muscle, part, goal and level
app.get("/requestspecifiedexercises/:muscle/:part/:goal/:level", function(req, res) {
    const muscle = req.params.muscle;
    const part = req.params.part;
    const goal = req.params.goal;
    const level = req.params.level;
    connection.query("SELECT E.Name, R.Reps, T.Tempo FROM ( SELECT GE.ID_Exercise, GE.ID_Reps, GE.ID_Tempo FROM GoalExercise AS GE INNER JOIN LevelExercise AS LE ON GE.ID_Reps = LE.ID_Reps AND GE.ID_Tempo = LE.ID_Tempo INNER JOIN Goal AS G ON G.ID = GE.ID_Goal INNER JOIN Level AS L ON L.ID = LE.ID_Level WHERE G.Goal = '" + goal + "' AND L.Level = '" + level + "') AS D INNER JOIN Exercise AS E ON D.ID_Exercise = E.ID INNER JOIN Reps AS R ON D.ID_Reps = R.ID INNER JOIN Tempo AS T ON D.ID_Tempo = T.ID INNER JOIN Muscle AS M ON M.ID = E.ID_Muscle INNER JOIN Part AS P ON P.ID = E.ID_Part WHERE M.Name = '" + muscle + "' AND P.Name = '" + part + "'", function(err, rows, fields) {
        if (!!err) {
            console.log("Error in the query");
        }
        else {
            console.log(rows.length);
        }
        res.send(rows);
    });
});
// This request makes a request on the DB to get all exercises (and their variants) that match with the selected muscle, goal and level
app.get("/requestexercisesfortwomuscles/:muscle1/:muscle2/:goal/:level", function(req, res) {
    const muscle1 = req.params.muscle1;
    const muscle2 = req.params.muscle2;
    const goal = req.params.goal;
    const level = req.params.level;
    connection.query("SELECT E.ID, E.Name, R.Reps, T.Tempo, E.ID_SameExercise FROM ( SELECT COUNT(*), ID_Exercise, ID_Reps, ID_Tempo	FROM ( SELECT ID_Exercise, ID_Reps, ID_Tempo FROM goalexercise WHERE ID_Goal = " + goal + " UNION ALL SELECT ID_Exercise, ID_Reps, ID_Tempo FROM levelexercise	WHERE ID_Level = " + level + " ) AS Sub1 GROUP BY ID_Exercise, ID_Reps, ID_Tempo HAVING COUNT(*) > 1 ) AS Sub2 INNER JOIN Exercise AS E ON Sub2.ID_Exercise = E.ID INNER JOIN Reps AS R ON Sub2.ID_Reps = R.ID INNER JOIN Tempo AS T ON Sub2.ID_Tempo = T.ID WHERE E.ID_Muscle IN (" + muscle1 + "," + muscle2 + ")", function(err, rows, fields) {
        if (!!err) {
            console.log("Error in the query");
        }
        else {
            console.log(rows.length);
        }
        res.send(rows);
    });
});
// This request makes a request on the DB to get the order per duration
app.get("/requestorder/:duration/:muscle", function(req, res) {
    const duration = req.params.duration;
    const muscle = req.params.muscle;
    connection.query("SELECT ID_Exercise, OrderPlace FROM orderexercise WHERE ID_Duration = '" + duration + "' AND ID_Muscle = '" + muscle + "'", function(err, rows, fields) {
        if (!!err) {
            console.log("Error in the query");
        }
        else {
            console.log(rows.length);
        }
        res.send(rows);
    });
});
// This request makes a request on the DB to get all exercises
app.get("/requestallexercises", function(req, res) {
    connection.query("SELECT * FROM exercise", function(err, rows, fields) {
        if (!!err) {
            console.log("Error in the query");
        }
        else {
            console.log(rows.length);
        }
        res.send(rows);
    });
});

app.get("/accounts/:username/:password/:email", function(req, res) {
    const username = req.params.username,
          password = req.params.password,
          email = req.params.email;
    connection.query("SELECT username FROM accounts WHERE username='" + username + "' OR email='" + email + "' LIMIT 1", function(err, rows, fields) {
        if (!!err) {
            console.log("Error in the query");
        }
        else {
            if (rows.length > 0) {
                console.log("Username or email already in use");
                res.send("Username or email already in use");
            }
            else {
                connection.query("INSERT INTO accounts VALUES (NULL, '" + username + "', '" + password + "', '" + email + "')", function(err, rows, fields) {
                    if (!!err) {
                        console.log("Error in the query");
                    }
                    else {
                        const emailToSend = "<h1>Thanks for creating an account</h1>";
                            let transporter = nodemailer.createTransport({
                                host: "smtp.gmail.com",
                                port: 465,
                                secure: true,
                                auth: {
                                    user: 'ltidaspro@gmail.com',
                                    pass: '***'
                                },
                                tls: {
                                    rejectUnauthorized: false
                                }
                            });

                            let mailOptions = {
                                from: '"Gym As Never Admin" <test@gmail.com>',
                                to: email,
                                subject: 'Account creation for GAN App',
                                html: emailToSend
                            }

                            transporter.sendMail(mailOptions, (err, info) => {
                                if (err) {
                                    return console.log(err);
                                }
                                console.log(info);
                                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                            });

                        console.log("INSERT DONE");
                        res.send("INSERT DONE & EMAIL DONE");
                    }
                });
            }
        }

    });
});

app.listen(3000, () => console.log("Server started..."));
