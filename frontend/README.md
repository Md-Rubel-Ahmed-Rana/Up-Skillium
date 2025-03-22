# Up Skillium : LMS Project

### Overview

**Up Skillium** is a comprehensive web-based learning platform designed to provide a seamless and student-friendly environment for enhancing **digital skills**. It offers a structured learning journey where students can easily register, enroll in courses, make secure payments, and gain access to interactive lessons. With engaging quizzes, module-based assignments, and skill tests, learners can track their progress and apply their knowledge effectively. Upon successful course completion, students receive a certification, validating their expertise. Up Skillium ensures a well-organized and immersive educational experience, making skill development accessible and rewarding.

## Quick Access

- [Key Features](#key-features)
- [Tech Stack](#tech-stack-and-third-party-libraries)
- [Backend Techs](#backend-techs)
- [Frontend Techs](#frontend-techs)
- [Deployment & Cloud](#deployment-and-cloud)
- [Contribution](#contribution)
- [Usages](#getting-started)
- [License](#license)

### Live link

- [Frontend](https://upskillium.vercel.app)
- [Backend](https://api-upskillium.onrender.com)

### Source code

- [Frontend](https://github.com/Md-Rubel-Ahmed-Rana/Up-Skillium/tree/frontend)
- [Backend](https://github.com/Md-Rubel-Ahmed-Rana/Up-Skillium/tree/backend)

### Clone repository

Frontend:

```bash
git clone -b frontend https://github.com/Md-Rubel-Ahmed-Rana/Up-Skillium.git
```

Backend:

```bash
 git clone -b backend https://github.com/Md-Rubel-Ahmed-Rana/Up-Skillium.git
```

## Key Features

1.  **Course Management:** Create, update, and organize courses with various **Modules** and **Lessons** including **Assignments** and **Quizzes**
2.  **User Authentication:** Secure login system for students, instructors, and administrators.
3.  **Role-Based Access Control (RBAC)**: Provide different permissions for users based on their roles like student, instructor and admin.
4.  **Responsive Design:** Accessible on various devices. Right now for **Desktop** and **Mobile** devices.
5.  **Multimedia Support:** Incorporate videos, audio files, and interactive content into courses.
6.  **Assignment Submission:** Allow students to submit assignments online for instructor/admin reviews and mark them.
7.  **Quiz and Assessment:** Provide quizzes to evaluate student progress.
8.  **Certificate Generation:** Issue certificates upon course completion progress. Certificates will be 4 levels including four different badges as PDF format.
9.  **Payment Integration:** **Stripe and Paypal** payment support for course and subscription for online transactions.
10. **Generate Invoice:** After enrolling to a course, an invoice of **PDF Recipient** will be sent to student email for enrollment confirmation.
11. **Search Functionality:** Allow users to search for courses and lessons easily.
12. **Integration with Third-Party Tool:** Connect with other platforms and services to enhance functionality like **Google API**, **Firebase**, and **SMTP**.
13. **User Feedback:** Allow users to leave their valuable **feedback to courses and instructors**.
14. **Notification System:** Keep users informed about updates and important alerts via email.
15. **Analytics and Report:** Generate reports to users engagement and student progress.

## Tech Stack and Third-Party Libraries

### Frontend Techs:

- **TypeScript**: To make type-safety and error-free application.
- **React**: JavaScript library for building user interfaces.
- **NextJs**: React framework for building server-side rendered web applications.
- **Ant Design**: Most popular React UI component library.
- **Tailwindcss**: Utility-first CSS framework for building custom designs.
- **Reduxjs**: RTK Quey, State management library for managing application state.
- **Framer Motion**: To make powerful animation
- **GSAP**: To take super animation power of graphical interface
- **React Beautiful dnd**: To Drag & Drop the necessary elements
- **React Hook Form**: form validation, to validate perfectly and control of forms
- **React-quill**: Rich Text Editor, Rich text editor component for creating formatted text content.
- **React-icons**: Icon library, all kind of icons needed for a web application are available in one place.
- **React-player** Video Player, show lessons and course introductory video perfectly with extra features.
- **Sweetalert2**: Alert Message, to show most important alert messages.
- **React-hot-toast**: Toaster, to show normal and common success-errors messages.
- **React-vertical-timeline-component**: To show content nicely as vertical lines on cards.
- **AOS**: Animation library, to take control of scroll animation easily.

### Backend Techs:

- **TypeScript**: To make type-safety and error-free application.
- **Expressjs**: Expressjs is a Nodejs web application framework provides robust features to build backend application.
- **MongoDB**: Most Popular NoSQL database
- **Mongoose**: MongoBD database adopter to take super power of query including aggregation, transaction etc.
- **Stripe**: Payment processing platform for online transactions.
- **Paypal**: Payment processing platform for online transactions.
- **JSON Web Token (JWT)**: Custom token based authentication and authorization
- **Google APIs**: Google API use to create google meet link to take live classes/sessions.
- **Firebase Admin**: Storage Service, firebase used to upload media type content like images, audios, videos, zip and other necessary files.
- **Multer**: Receive files from frontend
- **Nodemailer**: Mail Service, Combined with SMTP to send necessary emails.
- **Pdf-lib**: PDF Manipulator, To create PDF for students certificates, payment invoices and other important pdf documents.
- **Zod**: Data validator, server side request data validations including body, headers, params and others.

## Deployment and Cloud

For seamless deployment and scalability, the project utilizes a combination of cloud services

- **Database:** The application uses a **MongoDB Atlas cluster**, powerful and modern database solution, ensuring high availability, security, and scalability.
- **Storage:** **Firebase Admin SDK** in integrated for handling secure file storage, allowing efficient management of user-generated content like **Profile Pictures**, **Course content** including cover **image**, **thumbnails**, **introductory videos**, and finally **video lessons**.
- **Containerization:** Both frontend and backend are **Dockerized**, enabling consistent environments across different deployments and making the applications more portable, scalable, and version controlling.
- **Frontend Deployment:** The frontend is hosted on **Vercel** which provides automatic deployments from the **frontend** branch with it's built-in **CI/CD pipeline**, ensuring smooth updates and zero-downtime deployment.
- **Backend Deployment:** The backend is deployed on **Render** which supports continuous deployment from **backend**branch. Render automatically builds and deploys changes, keeping the backend up to date without manual intervention

## Getting Started

To get started with the **Up Skillium** LMS project locally, follow those steps:

#### frontend:

1. clone the repository: `git clone -b frontend https://github.com/Md-Rubel-Ahmed-Rana/Up-Skillium.git`
2. Install dependencies: `npm install` or `yarn install`
3. Set up environment variables in `.env.local` file based on the provided template.
4. Run the development server: `npm run dev` or `yarn dev`

#### backend:

1. clone the repository: `git clone -b backend https://github.com/Md-Rubel-Ahmed-Rana/Up-Skillium.git`
2. Install dependencies: `npm install` or `yarn install`
3. Set up environment variables in `.env` file based on the provided template.
4. Run the development server: `npm run dev` or `yarn dev`

### Or Run with Docker:

1. Ensure **Docker Desktop** is installed and running on your machine.
2. clone the repository: (Frontend) `git clone -b frontend https://github.com/Md-Rubel-Ahmed-Rana/Up-Skillium.git`
   or (Backend) `git clone -b frontend https://github.com/Md-Rubel-Ahmed-Rana/Up-Skillium.git`
3. Set up environment variables in `.env` or `.env.local` file based on the provided template.
4. **Build Docker Image:** **command:** `docker-compose build` or `npm run docker:build` or `yarn docker:build`
5. **Start Container/Server**: **command:** `docker-compose up -d` or `npm run docker:start` or `yarn docker:start`
6. **Access the application**:
   - The frontend will be available at `http://localhost:3000`
   - The backend API will be available at `http://localhost:5010`
7. **Stop the containers:** **command:** `docker-compose down` or `npm run docker:stop` or `yarn docker:stop`

## Contribution

Contributions to the **Up Skillium** LMS project are advanced welcome. Whether you're fixing a bug, implementing a new features, improving document, or you have an awesome idea for this project, your contributions help me to enhance the project acceptability to others.

## License

This project has not been licensed yet.
