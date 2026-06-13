/* js/student.js */
let currentStep = 1;
const totalSteps = 5;

document.addEventListener('DOMContentLoaded', () => {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    const form = document.getElementById('applicationForm');

    nextBtn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            if (currentStep < totalSteps) {
                currentStep++;
                updateWizard();
            }
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateWizard();
        }
    });

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (validateStep(currentStep)) {
            submitApplication();
        }
    });
});

function goToStep(step) {
    if (step < currentStep || validateStep(currentStep)) {
        currentStep = step;
        updateWizard();
    }
}

function updateWizard() {
    // Update active section
    document.querySelectorAll('.form-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(`section-${currentStep}`).classList.add('active');

    // Update stepper UI
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        if (index < currentStep - 1) {
            step.classList.add('completed');
            step.classList.remove('active');
            step.querySelector('.step-circle').innerHTML = '<i data-lucide="check" size="20"></i>';
        } else if (index === currentStep - 1) {
            step.classList.add('active');
            step.classList.remove('completed');
            step.querySelector('.step-circle').innerHTML = index + 1;
        } else {
            step.classList.remove('active', 'completed');
            step.querySelector('.step-circle').innerHTML = index + 1;
        }
    });
    lucide.createIcons();

    // Update buttons
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');

    prevBtn.style.display = currentStep > 1 ? 'inline-flex' : 'none';
    
    if (currentStep === totalSteps) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
        populateReview();
    } else {
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function validateStep(step) {
    const section = document.getElementById(`section-${step}`);
    const inputs = section.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value) {
            isValid = false;
            input.style.borderColor = 'var(--color-danger)';
            // Remove error styling on input
            input.addEventListener('input', function() {
                this.style.borderColor = '';
            }, { once: true });
        } else {
            input.style.borderColor = '';
        }
    });

    if (!isValid) {
        // Optional: show a toast or alert
        alert('Please fill all required fields before proceeding.');
    }

    return isValid;
}

function updateFileLabel(inputId) {
    const input = document.getElementById(inputId);
    const label = document.getElementById(`${inputId}-label`);
    if (input.files && input.files.length > 0) {
        label.textContent = input.files[0].name;
        label.style.color = 'var(--color-primary)';
    } else {
        label.textContent = 'Click to upload or drag and drop';
        label.style.color = '';
    }
}

function populateReview() {
  console.log("populateReview called");

    const form = document.getElementById('applicationForm');
    const formData = new FormData(form);

    console.log("Full Name:", formData.get('fullName'));
    console.log("Email:", formData.get('email'));

    // Helper to create review item
    const createReviewItem = (label, value) => `
        <div class="review-item">
            <div class="review-label">${label}</div>
            <div class="review-value">${value || '-'}</div>
        </div>
    `;

    // Personal Details
    document.getElementById('review-personal').innerHTML = `
        ${createReviewItem('Full Name', formData.get('fullName'))}
        ${createReviewItem('Email', formData.get('email'))}
        ${createReviewItem('Phone', formData.get('phone'))}
        ${createReviewItem('Gender', formData.get('gender'))}
        ${createReviewItem('Category', formData.get('category'))}
        ${createReviewItem('DOB', formData.get('dob'))}
    `;

    // Academic Details
    document.getElementById('review-academic').innerHTML = `
        ${createReviewItem('10th Board', formData.get('tenthBoard'))}
        ${createReviewItem('10th Percentage', formData.get('tenthPercentage') + '%')}
        ${createReviewItem('12th College', formData.get('interCollege'))}
        ${createReviewItem('12th Percentage', formData.get('interPercentage') + '%')}
    `;

    // Program & Docs
    const tenthFile = formData.get('tenthDoc');
    const interFile = formData.get('interDoc');
    document.getElementById('review-program').innerHTML = `
        ${createReviewItem('Selected Course', formData.get('course'))}
        ${createReviewItem('10th Memo', tenthFile ? tenthFile.name : 'Not Uploaded')}
        ${createReviewItem('12th Memo', interFile ? interFile.name : 'Not Uploaded')}
    `;
}
async function submitApplication() {

    console.log("SUBMIT CLICKED");

    const declaration =
        document.getElementById(
            "declaration"
        );

    if (!declaration.checked) {

        alert(
            "Please accept the declaration."
        );

        return;
    }

    const overlay =
        document.getElementById(
            "loadingOverlay"
        );

    overlay.classList.add("active");

    try {

        const form =
            document.getElementById(
                "applicationForm"
            );

        const formData =
            new FormData(form);

        const applicationData = {

            fullName:
                formData.get("fullName"),

            email:
                formData.get("email"),

            phone:
                formData.get("phone"),

            gender:
                formData.get("gender"),

            dateOfBirth:
                formData.get("dob"),

            address:
                formData.get("address"),

            category:
                formData.get("category"),

            parentName:
                formData.get("parentName"),

            parentPhone:
                formData.get("parentPhone"),

            course:
                formData.get("course"),

            tenthSchoolName:
                formData.get("tenthSchool"),

            tenthBoard:
                formData.get("tenthBoard"),

            tenthPassoutYear:
                formData.get("tenthYear"),

            tenthPercentage:
                formData.get("tenthPercentage"),

            tenthAttendance:
                formData.get("tenthAttendance"),

            interCollegeName:
                formData.get("interCollege"),

            interBoard:
                formData.get("interBoard"),

            interPassoutYear:
                formData.get("interYear"),

            interPercentage:
                formData.get("interPercentage"),

            interAttendance:
                formData.get("interAttendance")
        };

        const response =
            await fetch(
                "http://localhost:4003/api/applications",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body:
                        JSON.stringify(
                            applicationData
                        )
                }
            );

        const result =
            await response.json();

        console.log(
            "APPLICATION RESPONSE"
        );

        console.log(result);

        if (!result.success) {
            throw new Error(
                result.message
            );
        }

        const dbId = result.data.id;
        const appTrackingId = result.data.applicationId;

        await uploadDocuments(dbId);

        window.location.href = `student-success.html?id=${dbId}`;

    } catch (error) {

        console.error(error);

        alert(error.message);

    } finally {

        overlay.classList.remove(
            "active"
        );
    }
}
async function uploadDocuments(applicationId) {
    const tenthDoc =
    document.getElementById("tenthDoc").files[0];
    
    const interDoc =
    document.getElementById("interDoc").files[0];
    console.log("10th Doc:", tenthDoc);
    console.log("Inter Doc:", interDoc);
    
    if (tenthDoc) {
 console.log("Uploading TENTH_MEMO");
        const fd = new FormData();

        fd.append("applicationId", applicationId);
        fd.append("documentType", "TENTH_MEMO");
        fd.append("document", tenthDoc);

        const uploadResponse =
    await fetch(
        "http://localhost:4003/api/documents/upload",
        {
            method: "POST",
            body: fd
        }
    );

const uploadResult =
    await uploadResponse.json();

console.log(uploadResult);
    }

   if (interDoc) {

    console.log("Uploading INTER_MEMO");

    const fd = new FormData();

    fd.append("applicationId", applicationId);
    fd.append("documentType", "INTER_MEMO");
    fd.append("document", interDoc);

    const uploadResponse =
        await fetch(
            "http://localhost:4003/api/documents/upload",
            {
                method: "POST",
                body: fd
            }
        );

    const uploadResult =
        await uploadResponse.json();

    console.log(uploadResult);
}
}