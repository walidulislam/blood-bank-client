# Blood Donation Application 🩸

A complete *MERN Stack* blood donation platform that connects donors with people in urgent need of blood. Users can register as donors, create blood requests, donate, and help save lives.

*Live Website*: [https://blood-bank-wesite.netlify.app/]
*Client GitHub*: [https://github.com/walidulislam/blood-bank-client.git]
*Server GitHub*: [https://github.com/walidulislam/blood-bank-server.git]

---

### Admin Credentials (For Evaluation)
- *Email*: admin@gmail.com  
- *Password*: Admin@123

---

### Key Features

- Full User Authentication (Register/Login with Email & Password)
- Role-based Dashboard (Donor, Volunteer, Admin)
- Create, Edit, Delete Blood Donation Requests
- Public Blood Requests Page (Only Pending)
- Private Request Details + "Donate Now" Modal
- Status Change: pending → inprogress on donation
- My Donation Requests with Pagination & Status Filter
- Fully Responsive (Mobile + Desktop)
- Stripe Payment Integration for Funding
- Admin Panel: Block/Unblock Users, Change Roles
- Secure API with Firebase Token Verification
- Beautiful UI with DaisyUI + Tailwind CSS

---

### Technologies Used

*Frontend*  
- React.js, React Router  
- Tailwind CSS + DaisyUI  
- Axios, React Hot Toast  
- Lottie React (Loading Animation)  
- Firebase Authentication  

*Backend*  
- Node.js, Express.js  
- MongoDB + Mongoose  
- Firebase Admin SDK  
- Stripe Payment Gateway  
- Vercel Deployment  

*Packages Used*  
```json
"dependencies": {
  "axios", "react-hot-toast", "react-router-dom",
  "firebase", "stripe", "lottie-react",
  "sweetalert2", "react-icons", "daisyui"
}
