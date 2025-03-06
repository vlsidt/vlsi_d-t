let isLoggedIn = false;
let isAdmin = false;

// ✅ Login Function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('login-error');

    if (username === 'admin' && password === 'teacher') {
        isLoggedIn = true;
        isAdmin = true; // Admin mode
    } else if (username === 'user' && password === 'student') {
        isLoggedIn = true;
        isAdmin = false; // Student mode
    } else {
        errorDiv.textContent = "Invalid username or password.";
        return;
    }

    errorDiv.textContent = "";
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('main-container').style.display = 'block';

    // ✅ Hide Upload Section at Login
    document.getElementById("upload-container").style.display = "none"; 
}

// ✅ Toggle Password Visibility
document.getElementById("togglePassword").addEventListener("click", function () {
    let passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        this.textContent = "❌"; // Change to close icon
    } else {
        passwordInput.type = "password";
        this.textContent = "👁️"; // Change back to eye icon
    }
});

// ✅ Show Subjects Function
function showSubjects(year) {
    if (!isLoggedIn) return;

    document.getElementById('year-title').textContent = year;
    document.getElementById('subjects-container').style.display = 'block';
    document.getElementById('exams-container').style.display = 'none';
    document.getElementById('content-container').style.display = 'none';
    
    // ✅ Hide Upload Section (Until Exam is Selected)
    document.getElementById("upload-container").style.display = "none"; 

    const subjectsContainer = document.getElementById('subjects');
    subjectsContainer.innerHTML = '';

    if (questionPapers[year]) {
        for (const subject in questionPapers[year]) {
            const button = document.createElement('button');
            button.textContent = subject;
            button.onclick = function() { showExams(year, subject); };
            subjectsContainer.appendChild(button);
        }
    } else {
        subjectsContainer.innerHTML = "<p>No subjects available.</p>";
    }
}

// ✅ Show Exams Function
function showExams(year, subject) {
    if (!isLoggedIn) return;

    document.getElementById('subject-title').textContent = `${year} - ${subject}`;
    document.getElementById('exams-container').style.display = 'block';
    document.getElementById('content-container').style.display = 'none';
    
    // ✅ Hide Upload Section (Until Exam is Selected)
    document.getElementById("upload-container").style.display = "none"; 

    const examsContainer = document.getElementById('exams');
    examsContainer.innerHTML = '';

    if (questionPapers[year] && questionPapers[year][subject]) {
        for (const exam in questionPapers[year][subject]) {
            const button = document.createElement('button');
            button.textContent = exam.toUpperCase();
            button.onclick = function() { showQuestionPapers(year, subject, exam); };
            examsContainer.appendChild(button);
        }
    } else {
        examsContainer.innerHTML = "<p>No exams available.</p>";
    }
}

// ✅ Show Question Papers (Fixing Upload Display)
function showQuestionPapers(year, subject, exam) {
    if (!isLoggedIn) return;

    document.getElementById('exam-title').textContent = `${year} - ${subject} - ${exam.toUpperCase()}`;
    document.getElementById('content-container').style.display = 'block';

    const papersContainer = document.getElementById('question-papers');
    papersContainer.innerHTML = '';

    // ✅ Load stored files from localStorage
    let storedFiles = JSON.parse(localStorage.getItem(`${year}-${subject}-${exam}`)) || [];

    storedFiles.forEach((file) => {
        const link = document.createElement('a');
        link.href = file.link;
        link.textContent = file.name;
        link.target = '_blank';
        link.style.display = 'block';
        papersContainer.appendChild(link);
    });

    // ✅ Show Upload Section ONLY if Admin and an Exam is Selected
    const uploadContainer = document.getElementById('upload-container');
    if (isAdmin) {
        uploadContainer.style.display = 'block';
    } else {
        uploadContainer.style.display = 'none';
    }
}

// ✅ Upload File Function (For Admin)
function uploadFile() {
    if (!isAdmin) return alert("You don't have permission to upload files!");

    const year = document.getElementById('year-title').textContent;
    const subject = document.getElementById('subject-title').textContent.split(" - ")[1];
    const exam = document.getElementById('exam-title').textContent.split(" - ")[2].toLowerCase();
    
    const fileName = document.getElementById('file-name').value;
    const fileLink = document.getElementById('file-link').value;

    if (!fileName || !fileLink) return alert("Please enter both file name and Google Drive link.");

    // ✅ Save in localStorage
    let storedFiles = JSON.parse(localStorage.getItem(`${year}-${subject}-${exam}`)) || [];
    storedFiles.push({ name: fileName, link: fileLink });
    localStorage.setItem(`${year}-${subject}-${exam}`, JSON.stringify(storedFiles));

    alert("File uploaded successfully!");
    showQuestionPapers(year, subject, exam); // Refresh list
}

// ✅ Define Question Papers Data
const questionPapers = { 
    "1st Year": {
        "Math": {
            "ct1": [],
            "ct2": [],
            "midsem": [],
            "endsem": [],
            "obt": [],
            "Notes": []
        },
        "Physics": {
            "ct1": [],
            "ct2": [],
            "midsem": [],
            "endsem": [],
            "obt": [],
            "Notes": []
        }
    },
    "2nd Year": {
        "NTSS": {
            "ct1": [],
            "ct2": [],
            "midsem": [],
            "endsem": [],
            "obt": [],
            "pyq": [],
            "Notes": []
        },
        "DEMP": {
            "ct1": [],
            "ct2": [],
            "midsem": [],
            "endsem": [],
            "obt": [],
            "pyq": [],
            "Notes": [],
            "Youtube links ": {
                "Gate Smashers": ["https://youtu.be/4cjs2GrOf6Y", "https://youtu.be/36LjWW-BSyU"]
            }
        }
    }
};
