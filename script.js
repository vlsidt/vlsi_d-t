let isLoggedIn = false;

// Login Function
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('login-error');

    if (username === 'csmss' && password === 'vlsi') {
        isLoggedIn = true;
        errorDiv.textContent = "";
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('main-container').style.display = 'block';
    } else {
        errorDiv.textContent = "Invalid username or password.";
    }
}

// Show Subjects Function
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

// Show Exams Function
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

// Show Question Papers Function
// Show Question Papers Function (Updated)
function showQuestionPapers(year, subject, exam) {
    if (!isLoggedIn) return;

    document.getElementById('exam-title').textContent = `${year} - ${subject} - ${exam.toUpperCase()}`;
    document.getElementById('content-container').style.display = 'block';

    const papersContainer = document.getElementById('question-papers');
    papersContainer.innerHTML = '';

    const examData = questionPapers[year]?.[subject]?.[exam];

    if (!examData) {
        papersContainer.textContent = "No question papers available.";
        return;
    }

    if (Array.isArray(examData)) {
        // Handling normal links
        examData.forEach((paper) => {
            const link = document.createElement('a');

            if (paper === "UPCOMING") {
                link.textContent = "UPCOMING";
                link.style.color = "gray";
                link.href = "#";
            } else {
                link.href = paper;
                link.textContent = paper.split('/').pop();
                link.target = '_blank';
            }

            papersContainer.appendChild(link);
        });
    } else if (typeof examData === 'object') {
        // Handling nested objects like "Youtube links"
        for (const category in examData) {
            const categoryTitle = document.createElement('h3');
            categoryTitle.textContent = category;
            categoryTitle.style.color = "#ffcc00";
            papersContainer.appendChild(categoryTitle);

            examData[category].forEach((linkURL) => {
                const link = document.createElement('a');
                link.href = linkURL;
                link.textContent = linkURL;
                link.target = '_blank';
                link.style.display = 'block';
                papersContainer.appendChild(link);
            });
        }
    }
}


// Define question papers data
const questionPapers = { 
    "1st Year": {
        "Math": {
            "ct1": ["UPCOMING"],
            "ct2": ["UPCOMING"],
            "midsem": ["UPCOMING"],
            "endsem": ["UPCOMING"],
            "obt": ["UPCOMING"],
            "Notes": ["UPCOMING"]
        },
        "Physics": {
            "ct1": ["UPCOMING"],
            "ct2": ["UPCOMING"],
            "midsem": ["UPCOMING"],
            "endsem": ["UPCOMING"],
            "obt": ["UPCOMING"],
            "Notes": ["UPCOMING"]
        }
    },
    "2nd Year": {
        "NTSS": {
            "ct1": ["UPCOMING"],
            "ct2": ["UPCOMING"],
            "midsem": ["UPCOMING"],
            "endsem": ["UPCOMING"],
            "obt": ["UPCOMING"],
            "pyq": ["UPCOMING"],
            "Notes": ["UPCOMING"]
        },
        "DEMP": {
            "ct1": ["UPCOMING"],
            "ct2": ["UPCOMING"],
            "midsem": ["UPCOMING"],
            "endsem": ["UPCOMING"],
            "obt": ["UPCOMING"],
            "pyq": ["https://drive.google.com/drive/folders/13cuBkN9o70OpLj8eLio7MWM33dXyJ-K6"],
            "Notes": ["UPCOMING"],
            "Youtube links ":{
                "Gate Smashers":["https://youtu.be/4cjs2GrOf6Y?si=QXElIprTmXoZplNF","https://youtu.be/36LjWW-BSyU?si=kteNOe3QBVwdQn7V"]
            }
        },  
        "Mathematics 3": {
            "ct1": ["UPCOMING"],
            "ct2": ["UPCOMING"],
            "midsem": ["UPCOMING"],
            "endsem": ["UPCOMING"],
            "obt": ["UPCOMING"],
            "pyq": ["UPCOMING"],
            "Notes": ["UPCOMING"]
        },  
        "EDC": {
            "ct1": ["UPCOMING"],
            "ct2": ["UPCOMING"],
            "midsem": ["UPCOMING"],
            "endsem": ["UPCOMING"],
            "obt": ["UPCOMING"],
            "pyq": ["UPCOMING"],
            "Notes": ["UPCOMING"]
        },  
        "Python": {
            "ct1": ["UPCOMING"],
            "ct2": ["UPCOMING"],
            "midsem": ["UPCOMING"],
            "endsem": ["UPCOMING"],
            "obt": ["UPCOMING"],
            "pyq": ["UPCOMING"],
            "Notes": ["UPCOMING"]
        }
    }
};