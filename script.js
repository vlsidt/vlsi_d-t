alert("Welcome to the EDU portal!");
let isLoggedIn = false;
let isAdmin = false;

// ✅ Login Function
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorDiv = document.getElementById("login-error");

  if (username === "admin" && password === "teacher") {
    isLoggedIn = true;
    isAdmin = true;
  } else if (username === "user" && password === "student") {
    isLoggedIn = true;
    isAdmin = false;
  } else {
    errorDiv.textContent = "Invalid username or password.";
    return;
  }

  errorDiv.textContent = "";
  document.getElementById("login-container").style.display = "none";
  document.getElementById("main-container").style.display = "block";
  document.getElementById("upload-container").style.display = "none";
}

// ✅ Toggle Password Visibility
document.getElementById("togglePassword").addEventListener("click", function () {
  const passwordInput = document.getElementById("password");
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  this.textContent = passwordInput.type === "password" ? "👁️" : "❌";
});

// ✅ Show Subjects
function showSubjects(year) {
  if (!isLoggedIn) return;

  document.getElementById("year-title").textContent = year;
  document.getElementById("subjects-container").style.display = "block";
  document.getElementById("exams-container").style.display = "none";
  document.getElementById("content-container").style.display = "none";
  document.getElementById("upload-container").style.display = "none";

  const subjectsContainer = document.getElementById("subjects");
  subjectsContainer.innerHTML = "";

  if (questionPapers[year]) {
    Object.keys(questionPapers[year]).forEach((subject) => {
      const btn = document.createElement("button");
      btn.textContent = subject;
      btn.onclick = () => showExams(year, subject);
      subjectsContainer.appendChild(btn);
    });
  } else {
    subjectsContainer.innerHTML = "<p>No subjects available.</p>";
  }
}

// ✅ Show Exams
function showExams(year, subject) {
  if (!isLoggedIn) return;

  document.getElementById("subject-title").textContent = `${year} - ${subject}`;
  document.getElementById("exams-container").style.display = "block";
  document.getElementById("content-container").style.display = "none";
  document.getElementById("upload-container").style.display = "none";

  const examsContainer = document.getElementById("exams");
  examsContainer.innerHTML = "";

  if (questionPapers[year] && questionPapers[year][subject]) {
    Object.keys(questionPapers[year][subject]).forEach((exam) => {
      const btn = document.createElement("button");
      btn.textContent = exam.toUpperCase();
      btn.onclick = () => showQuestionPapers(year, subject, exam);
      examsContainer.appendChild(btn);
    });
  } else {
    examsContainer.innerHTML = "<p>No exams available.</p>";
  }
}

// ✅ Show Question Papers
function showQuestionPapers(year, subject, exam) {
  if (!isLoggedIn) return;

  document.getElementById("exam-title").textContent = `${year} - ${subject} - ${exam.toUpperCase()}`;
  document.getElementById("content-container").style.display = "block";

  const papersContainer = document.getElementById("question-papers");
  papersContainer.innerHTML = "";

  const key = `${year}-${subject}-${exam}`;
  const storedFiles = JSON.parse(localStorage.getItem(key)) || [];

  storedFiles.forEach(({ name, link }) => {
    const a = document.createElement("a");
    a.href = link;
    a.textContent = name;
    a.target = "_blank";
    a.style.display = "block";
    papersContainer.appendChild(a);
  });

  document.getElementById("upload-container").style.display = isAdmin ? "block" : "none";
}

// ✅ Upload File (Admin Only)
function uploadFile() {
  if (!isAdmin) return alert("You don't have permission to upload files!");

  const year = document.getElementById("year-title").textContent;
  const subject = document.getElementById("subject-title").textContent.split(" - ")[1];
  const exam = document.getElementById("exam-title").textContent.split(" - ")[2].toLowerCase();

  const fileName = document.getElementById("file-name").value.trim();
  const fileLink = document.getElementById("file-link").value.trim();

  if (!fileName || !fileLink) return alert("Please fill both file name and link.");

  const key = `${year}-${subject}-${exam}`;
  const storedFiles = JSON.parse(localStorage.getItem(key)) || [];
  storedFiles.push({ name: fileName, link: fileLink });
  localStorage.setItem(key, JSON.stringify(storedFiles));

  document.getElementById("file-name").value = "";
  document.getElementById("file-link").value = "";

  document.getElementById("upload-success").style.display = "block";
  setTimeout(() => {
    document.getElementById("upload-success").style.display = "none";
  }, 2000);

  showQuestionPapers(year, subject, exam); // Refresh content
}

// ✅ Sample Question Paper Structure
const questionPapers = {
  "1st Year": {
    Math: { ct1: [], ct2: [], midsem: [], endsem: [], obt: [], Notes: [] },
    Physics: { ct1: [], ct2: [], midsem: [], endsem: [], obt: [], Notes: [] }
  },
  "2nd Year": {
    NTSS: { ct1: [], ct2: [], midsem: [], endsem: [], obt: [], pyq: [], Notes: [] },
    DEMP: {
      ct1: [],
      ct2: [],
      midsem: [],
      endsem: [],
      obt: [],
      pyq: [],
      Notes: [],
      "Youtube links": {
        "Gate Smashers": [
          "https://youtu.be/4cjs2GrOf6Y",
          "https://youtu.be/36LjWW-BSyU"
        ]
      }
    }
  }
};
// Add moresubjects and years as needed