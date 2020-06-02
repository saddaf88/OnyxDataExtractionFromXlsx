DROP TABLE IF EXISTS `student`;

CREATE TABLE `student`
(
  `student_id` int
(11) NOT NULL AUTO_INCREMENT,
  `matrikel_nr` int
(11) NOT NULL,
  `name` varchar
(45) NOT NULL,
  `surname` varchar
(45) NOT NULL,
  `email` varchar
(255) NOT NULL,
  `institution` varchar
(45) NOT NULL,
  `study_program` varchar
(255) NOT NULL,
  `organisational_unit` varchar
(255) NOT NULL,
  `matrikel_year` year
(4) NOT NULL,
  PRIMARY KEY
(`student_id`),
  UNIQUE KEY `email_UNIQUE`
(`email`),
  UNIQUE KEY `matrikel_nr_UNIQUE`
(`matrikel_nr`)
) ENGINE=InnoDB AUTO_INCREMENT=8555 DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS `testScores`;

CREATE TABLE `testScores`
(
  `serial` int
(11) NOT NULL AUTO_INCREMENT,
  `matrikel_nr` varchar
(45) NOT NULL,
  `testName` varchar
(45) NOT NULL,
  `testID` varchar
(45) NOT NULL,
  `length` int
(11) DEFAULT NULL,
  `trial` int
(11) DEFAULT NULL,
  `maxPoint` int
(11) DEFAULT NULL,
  `taskNumber` int
(11) DEFAULT NULL,
  `date` varchar
(45) DEFAULT NULL,
  `point` int
(11) DEFAULT NULL,
  PRIMARY KEY
(`serial`)
) ENGINE=InnoDB AUTO_INCREMENT=456 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

