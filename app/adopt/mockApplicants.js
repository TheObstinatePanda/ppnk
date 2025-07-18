const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'app', 'adopt', 'mockApplicants.json');

function getApplicants() {
    if (!fs.existsSync(filepath)) return [];
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

function addApplicant(applicant) {
    const applicants = getApplicants();
    applicants.push(applicant);
    fs.writeFileSync(filePath, JSON.stringify(applicants, null, 2));
}

module.exports = { getApplicants, addApplicant };