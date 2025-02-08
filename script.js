const questionPapers =
 {
    "1st Year":
     {
        "ct1": ["UPCOMING"],
        "ct2": ["UPCOMING"],
        "midsem": ["UPCOMING"],
        "endsem": ["UPCOMING"],
        "obt": ["UPCOMING"],
        "Notes":["UPCOMING"]
    },
    "2nd Year": 
    {
        "ct1": ["UPCOMING"],
        "ct2": ["UPCOMING"],
        "midsem": ["UPCOMING"],
        "endsem": ["UPCOMING"],
        "obt": ["UPCOMING"],
        "pyq":["DEMP=","https://drive.google.com/file/d/1dAlQPawTiqp48LVhzswcxlS3jgFnziSd/view?usp=drivesdk","https://drive.google.com/drive/folders/13cuBkN9o70OpLj8eLio7MWM33dXyJ-K6"],
        "Notes":["NTSS=","https://drive.google.com/file/d/1_uZn2AVMSDejWXm_XuCX079Ho3vDznyy/view?usp=drivesdk","https://drive.google.com/file/d/1_uSbi3-8cTlCn3YIv2LhwfKiZiDC7AeJ/view?usp=drivesdk","https://drive.google.com/file/d/1_tlXG95d2tE9yeOMWLa9GDoGOVMEEVMo/view?usp=drivesdk","https://drive.google.com/file/d/1_mvQABEdTSbDqBmI3KOhsgqG5Bre8IFs/view?usp=drivesdk"]

    },
    "3rd Year": 
    {
        "ct1": ["UPCOMING"],
        "ct2": ["UPCOMING"],
        "midsem": ["UPCOMING"],
        "endsem": ["UPCOMING"],
        "obt": ["UPCOMING"],
        "Notes":["UPCOMING"],
    },
    "Final Year":
    {
        "ct1": ["UPCOMING"],
        "ct2": ["UPCOMING"],
        "midsem": ["UPCOMING"],
        "endsem": ["UPCOMING"],
        "obt": ["UPCOMING"],
        "Notes":["UPCOMING"],
    },
};

let isLoggedIn = false;

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('login-error');

    if (username === 'csmss' && password === 'csmss') {
        isLoggedIn = true;
        errorDiv.textContent = "";
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('main-container').style.display = 'block';
    } else {
        errorDiv.textContent = "Invalid username or password.";
    }
}

function showOptions(year) {
    if (!isLoggedIn) return;

    document.getElementById('year-title').textContent = year;
    document.getElementById('options-container').style.display = 'block';
    document.getElementById('content-container').style.display = 'none';

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    if (questionPapers[year]) {
        for (const exam in questionPapers[year]) {
            const button = document.createElement('button');
            button.textContent = exam.toUpperCase();
            button.onclick = () => showQuestionPapers(year, exam);
            optionsContainer.appendChild(button);
        }
    } else {
        optionsContainer.innerHTML = "No data available.";
    }
}

function showQuestionPapers(year, exam) {
    if (!isLoggedIn) return;

    document.getElementById('exam-title').textContent = `${year} - ${exam.toUpperCase()}`;
    document.getElementById('content-container').style.display = 'block';

    const papersContainer = document.getElementById('question-papers');
    papersContainer.innerHTML = '';

    if (questionPapers[year] && questionPapers[year][exam]) {
        questionPapers[year][exam].forEach(paper => {
            const link = document.createElement('a');
            link.href = paper;
            link.textContent = paper.split('/').pop();
            link.target = '_blank';
            papersContainer.appendChild(link);
        });
    } else {
        papersContainer.textContent = "No question papers available.";
    }
}
