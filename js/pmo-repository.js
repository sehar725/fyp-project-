document.addEventListener("DOMContentLoaded", function () {
    // 1. Initial Data Setup (Mock Documents)
    let repositoryData = [
        {
            id: 1,
            fileName: "Final Thesis Report.pdf",
            projectTitle: "AI-Powered Smart Attendance",
            batchYear: "2025-2026",
            category: "Final Thesis (PDF)",
            fileSize: "12.4 MB",
            uploadDate: "15 Aug 2026",
            iconClass: "fa-solid fa-file-pdf text-danger"
        },
        {
            id: 2,
            fileName: "SourceCode_Group1.zip",
            projectTitle: "AI-Powered Smart Attendance",
            batchYear: "2025-2026",
            category: "Source Code (ZIP)",
            fileSize: "48.2 MB",
            uploadDate: "15 Aug 2026",
            iconClass: "fa-solid fa-file-zipper text-warning"
        },
        {
            id: 3,
            fileName: "E-Learning Thesis.pdf",
            projectTitle: "E-Learning Platform",
            batchYear: "2025-2026",
            category: "Final Thesis (PDF)",
            fileSize: "8.9 MB",
            uploadDate: "10 Aug 2026",
            iconClass: "fa-solid fa-file-pdf text-danger"
        },
        {
            id: 4,
            fileName: "Midterm_Presentation.pptx",
            projectTitle: "Smart Energy System",
            batchYear: "2024-2025",
            category: "Presentation Deck",
            fileSize: "18.1 MB",
            uploadDate: "20 Jan 2025",
            iconClass: "fa-solid fa-file-powerpoint text-danger"
        }
    ];

    // DOM Elements Reference
    const modal = document.getElementById("uploadModal");
    const openBtn = document.getElementById("openUploadModalBtn");
    const closeBtn = document.getElementById("closeUploadModalBtn");
    const form = document.getElementById("uploadForm");
    const tbody = document.querySelector(".data-table tbody");

    const filterSelects = document.querySelectorAll(".filter-select");
    const searchInput = document.querySelector(".filter-input");

    // Helper to get FontAwesome Icon according to file extension
    function getFileIconClass(fileName) {
        const ext = fileName.split('.').pop().toLowerCase();
        if (ext === 'pdf') return 'fa-solid fa-file-pdf text-danger';
        if (ext === 'zip' || ext === 'rar' || ext === '7z') return 'fa-solid fa-file-zipper text-warning';
        if (ext === 'ppt' || ext === 'pptx') return 'fa-solid fa-file-powerpoint text-danger';
        if (ext === 'doc' || ext === 'docx') return 'fa-solid fa-file-word text-primary';
        return 'fa-solid fa-file text-secondary';
    }

    // Render Table Rows
    function renderTable(data) {
        if (!tbody) return;
        tbody.innerHTML = "";

        if (data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 20px; color: #888;">No documents found.</td></tr>`;
            return;
        }

        data.forEach(item => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><i class="${item.iconClass} file-icon"></i> ${item.fileName}</td>
                <td>${item.projectTitle}</td>
                <td>${item.batchYear}</td>
                <td>${item.fileSize}</td>
                <td>${item.uploadDate}</td>
                <td>
                    <button class="action-btn-download" data-id="${item.id}">
                        <i class="fa-solid fa-download"></i> Download
                    </button>
                    <button class="action-btn-delete" data-id="${item.id}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        attachActionEvents();
    }

    // Attach Download & Delete Action Event Handlers
    function attachActionEvents() {
        // Delete Action
        document.querySelectorAll(".action-btn-delete").forEach(btn => {
            btn.onclick = function () {
                const id = parseInt(this.getAttribute("data-id"));
                if (confirm("Are you sure you want to delete this document archive?")) {
                    repositoryData = repositoryData.filter(doc => doc.id !== id);
                    applyFilters();
                }
            };
        });

        // Download Action Trigger
        document.querySelectorAll(".action-btn-download").forEach(btn => {
            btn.onclick = function () {
                const id = parseInt(this.getAttribute("data-id"));
                const doc = repositoryData.find(d => d.id === id);
                if (doc) {
                    alert(`Downloading "${doc.fileName}"...`);
                }
            };
        });
    }

    // Filter and Search Logic
    function applyFilters() {
        let filtered = [...repositoryData];

        const batchFilter = filterSelects[0] ? filterSelects[0].value : "";
        const typeFilter = filterSelects[1] ? filterSelects[1].value : "";
        const keyword = searchInput ? searchInput.value.toLowerCase().trim() : "";

        // Batch Filter
        if (batchFilter && !batchFilter.includes("All")) {
            filtered = filtered.filter(item => item.batchYear === batchFilter);
        }

        // Type Filter
        if (typeFilter && !typeFilter.includes("All")) {
            filtered = filtered.filter(item => {
                if (typeFilter.includes("Thesis")) return item.fileName.endsWith(".pdf") || item.category.includes("Thesis");
                if (typeFilter.includes("Code")) return item.fileName.endsWith(".zip") || item.category.includes("Source Code");
                if (typeFilter.includes("Presentation")) return item.fileName.endsWith(".pptx") || item.category.includes("Presentation");
                return true;
            });
        }

        // Search Keyword Filter
        if (keyword) {
            filtered = filtered.filter(item =>
                item.fileName.toLowerCase().includes(keyword) ||
                item.projectTitle.toLowerCase().includes(keyword)
            );
        }

        renderTable(filtered);
    }

    // Event Listeners for Filtering
    if (filterSelects.length > 0) {
        filterSelects.forEach(select => select.addEventListener("change", applyFilters));
    }
    if (searchInput) {
        searchInput.addEventListener("input", applyFilters);
    }

    // Modal Control Logic
    if (openBtn && modal) {
        openBtn.addEventListener("click", () => modal.classList.add("active"));
    }

    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => modal.classList.remove("active"));
    }

    // Upload Form Submit Event
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            // Inputs extraction from modal
            const projectTitleInput = form.querySelector('input[type="text"]');
            const batchSelect = form.querySelectorAll('select')[0];
            const categorySelect = form.querySelectorAll('select')[1];
            const fileInput = form.querySelector('input[type="file"]');

            if (fileInput && fileInput.files.length > 0) {
                const uploadedFile = fileInput.files[0];
                const fileSizeMB = (uploadedFile.size / (1024 * 1024)).toFixed(1) + " MB";

                const today = new Date();
                const formattedDate = today.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                });

                const newDocument = {
                    id: Date.now(),
                    fileName: uploadedFile.name,
                    projectTitle: projectTitleInput ? projectTitleInput.value : "N/A",
                    batchYear: batchSelect ? batchSelect.value : "2025-2026",
                    category: categorySelect ? categorySelect.value : "Document",
                    fileSize: fileSizeMB,
                    uploadDate: formattedDate,
                    iconClass: getFileIconClass(uploadedFile.name)
                };

                // Add to array and re-render
                repositoryData.unshift(newDocument);
                applyFilters();

                alert("Document Archive Uploaded Successfully!");
                form.reset();
                if (modal) modal.classList.remove("active");
            }
        });
    }

    // Initial Table Render
    renderTable(repositoryData);
});