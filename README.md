Student information system

How to run:

Clone repository `git clone https://github.com/angelikavolaric/Student-information-system.git`

Navigate to directory angularApp

Run two terminals.

In first terminal run: `npm install` and then `ng serve`

In second terminal run: `npx json-server src/assets/data/db.json`

Open `http://localhost:4200` to view it in the browser.
______


This student information system has:

It has possible pages:
 - /overview (this is an overview of all students currently in database)
 - /add      (on this page you can add new student in database)
 - /edit/:studentId     (on this page you can edit student what courses student is enrolled into)
 - /delete/:studentId   (this is where you can delete student from database)

_____

Task description:
Implement a simple student information system, where the user can:
   - add a new student (basic student information and courses that student will be part of),
   - edit the student (courses only),
   - delete a student.
 You will also have to implement a page with an overview of all students (a table where each row displays student information). Table should have pagination with 20 students per page.

Attached to this email is a screenshot of a different table. Try to approach its appearance, to test your HTML and CSS skills. Ignore features that are not included in task description (like timezone dropdown, expandable rows, "super admin" tag, left sidebar...)

 Requirements:
 - Routing (/overview page should be lazily loaded)

 Required technologies:
 - Latest Angular
 - PrimeNg (component library)
