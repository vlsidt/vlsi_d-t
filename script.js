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
}
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

// ✅ Show Question Papers (Now With Google Drive Upload for Admins)
function showQuestionPapers(year, subject, exam) {
    if (!isLoggedIn) return;

    document.getElementById('exam-title').textContent = `${year} - ${subject} - ${exam.toUpperCase()}`;
    document.getElementById('content-container').style.display = 'block';

    const papersContainer = document.getElementById('question-papers');
    papersContainer.innerHTML = '';

    // ✅ Load stored files from localStorage
    let storedFiles = JSON.parse(localStorage.getItem(`${year}-${subject}-${exam}`)) || [];

    storedFiles.forEach((fileURL) => {
        const link = document.createElement('a');
        link.href = fileURL;
        link.textContent = fileURL;
        link.target = '_blank';
        link.style.display = 'block';
        papersContainer.appendChild(link);
    });

    // ✅ If admin → Show Google Drive link upload option
    if (isAdmin) {
        const uploadInput = document.createElement('input');
        uploadInput.type = 'text';
        uploadInput.placeholder = 'Paste Google Drive link';
        papersContainer.appendChild(uploadInput);

        const uploadButton = document.createElement('button');
        uploadButton.textContent = 'Upload';
        uploadButton.onclick = function () { uploadFile(year, subject, exam, uploadInput.value); };
        papersContainer.appendChild(uploadButton);
    }
}

// ✅ Upload File Function (For Admin)
function uploadFile(year, subject, exam, fileURL) {
    if (!fileURL) return alert("Please enter a valid Google Drive link.");

    // ✅ Save in localStorage
    let storedFiles = JSON.parse(localStorage.getItem(`${year}-${subject}-${exam}`)) || [];
    storedFiles.push(fileURL);
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
