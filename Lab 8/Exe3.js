class Course {
    constructor(courseName, instructor) {
        this.courseName = courseName;
        this.instructor = instructor;
    }

    displayDetails() {
        console.log(`Course: ${this.courseName}, Instructor: ${this.instructor}`);
    }

    enroll(availableSeats) {
        return new Promise((resolve, reject) => {
            if (availableSeats > 0) {
                resolve("Enrollment Successful");
            } else {
                reject("Course Full");
            }
        });
    }
}

const myCourse = new Course("Web Technologies", "Dr. GopiKrishnan");

myCourse.displayDetails();

myCourse.enroll(5)
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.log(error);
    });