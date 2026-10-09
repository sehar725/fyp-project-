document.addEventListener('DOMContentLoaded', () => {
  // PMO Limit Dynamic Fetching (Default: 3)
  const maxGroupLimit = parseInt(localStorage.getItem('pmo_max_group_limit')) || 3;
  document.querySelectorAll('.max-limit-text').forEach(el => el.textContent = maxGroupLimit);

  // Form Elements
  const memberForm = document.getElementById('memberForm');
  const regNo = document.getElementById('regNo');
  const fullName = document.getElementById('fullName');
  const program = document.getElementById('program');
  const contact = document.getElementById('contact');
  const email = document.getElementById('email');
  const role = document.getElementById('role');
  const editIndex = document.getElementById('editIndex');
  
  // Display Elements
  const memberTableBody = document.getElementById('memberTableBody');
  const currentCount = document.getElementById('currentCount');
  const slotPlaceholder = document.getElementById('slotPlaceholder');
  const btnSubmit = document.getElementById('btnSubmit');
  const btnClear = document.getElementById('btnClear');
  const btnSaveGroup = document.getElementById('btnSaveGroup');

  // Supervisor Element
  const supervisorSelect = document.getElementById('supervisorSelect');

  // PMO supervisors list (LocalStorage ya Default data)
  const pmoSupervisors = JSON.parse(localStorage.getItem('pmo_supervisors_list')) || [
    { id: 1, name: 'Mr. Ashar Javed', department: 'CS/SE', maxGroups: 4, currentGroups: 4 }, // Seats Full
    { id: 2, name: 'Ms. Rabia Butt', department: 'CS/SE', maxGroups: 4, currentGroups: 2 },   // Seats Available
    { id: 3, name: 'Ms Saman', department: 'CS/SE', maxGroups: 3, currentGroups: 1 }, // Seats Available
    { id: 4, name: 'Ms Momina', department: 'CS/SE', maxGroups: 2, currentGroups: 1 } // Seats Available
  ];

  // Function: Supervisor Dropdown Populator
  function populateSupervisors() {
    if (!supervisorSelect) return;
    
    supervisorSelect.innerHTML = `<option value="" disabled selected>-- Select Preferred Supervisor --</option>`;

    pmoSupervisors.forEach(sup => {
      const isFull = sup.currentGroups >= sup.maxGroups;
      const option = document.createElement('option');
      option.value = sup.id;
      option.textContent = `${sup.name} (${sup.currentGroups}/${sup.maxGroups} Groups Filled) ${isFull ? '- SEATS FULL' : ''}`;
      
      if (isFull) {
        option.disabled = true; // Disable selecting full supervisor
        option.style.color = '#dc3545';
      }
      
      supervisorSelect.appendChild(option);
    });
  }

  // Supervisor Selection Status Indicator
  if (supervisorSelect) {
    supervisorSelect.addEventListener('change', (e) => {
      const selectedId = parseInt(e.target.value);
      const selectedSup = pmoSupervisors.find(s => s.id === selectedId);
      const statusText = document.getElementById('supervisorStatusText');

      if (selectedSup && statusText) {
        if (selectedSup.currentGroups >= selectedSup.maxGroups) {
          statusText.className = 'text-danger fw-semibold d-block mt-1';
          statusText.textContent = '❌ Selected Supervisor seats are full. Please choose another supervisor.';
        } else {
          const remaining = selectedSup.maxGroups - selectedSup.currentGroups;
          statusText.className = 'text-success fw-semibold d-block mt-1';
          statusText.textContent = `✓ Seats Available (${remaining} slots remaining)`;
        }
      }
    });
  }

  // Load from LocalStorage
  let members = JSON.parse(localStorage.getItem('fyp_group_members')) || [
    { regNo: '21-Arid-084', fullName: 'Sehar Babar', program: 'BSSE 7th Morning', contact: '+92 300 0000000', email: 'sehar@gmail.com', role: 'Leader' }
  ];

  // Render Function
  function renderMembers() {
    memberTableBody.innerHTML = '';
    members.forEach((m, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>
          <div class="fw-bold text-dark">${m.fullName}</div>
          <div class="text-muted" style="font-size: 11px;">${m.regNo} (${m.program}) | ${m.contact} | ${m.email}</div>
        </td>
        <td>
          <span class="badge ${m.role === 'Leader' ? 'bg-primary' : 'bg-secondary'}">${m.role}</span>
        </td>
        <td class="text-end">
          <button class="btn btn-sm btn-outline-primary py-0 px-2 me-1" onclick="editMember(${index})">Edit</button>
          <button class="btn btn-sm btn-outline-danger py-0 px-2" onclick="deleteMember(${index})">Delete</button>
        </td>
      `;
      memberTableBody.appendChild(tr);
    });

    currentCount.textContent = members.length;
    slotPlaceholder.style.display = (members.length >= maxGroupLimit) ? 'none' : 'block';
    localStorage.setItem('fyp_group_members', JSON.stringify(members));
  }

  // Submit Handler
  memberForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const idx = parseInt(editIndex.value);

    const memberData = {
      regNo: regNo.value,
      fullName: fullName.value,
      program: program.value,
      contact: contact.value,
      email: email.value,
      role: role.value
    };

    if (idx === -1) {
      if (members.length >= maxGroupLimit) {
        alert(`Group limit reached! PMO allows maximum ${maxGroupLimit} members.`);
        return;
      }
      members.push(memberData);
    } else {
      members[idx] = memberData;
      editIndex.value = -1;
      btnSubmit.textContent = '+ Add Member';
    }

    memberForm.reset();
    renderMembers();
  });

  // Edit Action
  window.editMember = (index) => {
    const m = members[index];
    regNo.value = m.regNo;
    fullName.value = m.fullName;
    program.value = m.program;
    contact.value = m.contact;
    if (email) email.value = m.email || '';
    role.value = m.role;
    editIndex.value = index;
    btnSubmit.textContent = 'Update Member';
  };

  // Delete Action
  window.deleteMember = (index) => {
    if (confirm('Are you sure you want to remove this member?')) {
      members.splice(index, 1);
      renderMembers();
    }
  };

  // Clear Form Button
  btnClear.addEventListener('click', () => {
    memberForm.reset();
    editIndex.value = -1;
    btnSubmit.textContent = '+ Add Member';
  });

  // Save Button Action (Updated with Supervisor verification)
  btnSaveGroup.addEventListener('click', () => {
    if (members.length === 0) {
      alert('Please add at least 1 group member before saving.');
      return;
    }

    const selectedSupId = supervisorSelect ? supervisorSelect.value : null;
    let selectedSup = null;

    if (supervisorSelect) {
      if (!selectedSupId) {
        alert('Please select a Preferred Supervisor before proceeding!');
        return;
      }

      selectedSup = pmoSupervisors.find(s => s.id === parseInt(selectedSupId));
      if (selectedSup && selectedSup.currentGroups >= selectedSup.maxGroups) {
        alert('Selected Supervisor seats are full! Please choose another supervisor.');
        return;
      }
    }

    // PMO aur Supervisor Portal ke liye combined payload save karna
    const groupPayload = {
      members: members,
      supervisorId: selectedSupId,
      supervisorName: selectedSup ? selectedSup.name : 'Not Selected',
      status: 'Pending PMO & Supervisor Approval',
      submittedAt: new Date().toISOString()
    };

    localStorage.setItem('fyp_group_members', JSON.stringify(members));
    localStorage.setItem('submitted_fyp_group', JSON.stringify(groupPayload));

    alert(`Group details saved successfully! Request submitted to PMO and ${selectedSup ? selectedSup.name : 'Supervisor'}.`);
  });

  // Initial Run
  populateSupervisors();
  renderMembers();
});
document.addEventListener('DOMContentLoaded', function () {

    // Popover Controls & Toggle Logic
    const notifBtn = document.getElementById('notifDropdownBtn');
    const notifMenu = document.getElementById('notifMenu');
    const profileBtn = document.getElementById('profileDropdownBtn');
    const profileMenu = document.getElementById('profileMenu');

    if (notifBtn && notifMenu) {
        notifBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (profileMenu) profileMenu.classList.remove('show');
            notifMenu.classList.toggle('show');
        });
    }

    if (profileBtn && profileMenu) {
        profileBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (notifMenu) notifMenu.classList.remove('show');
            profileMenu.classList.toggle('show');
        });
    }

    // Outside Click to Hide Menus
    document.addEventListener('click', function (e) {
        if (notifMenu && !notifMenu.contains(e.target) && !notifBtn.contains(e.target)) {
            notifMenu.classList.remove('show');
        }
        if (profileMenu && !profileMenu.contains(e.target) && !profileBtn.contains(e.target)) {
            profileMenu.classList.remove('show');
        }
    });

    // Clear Notification Badge
    const markReadBtn = document.getElementById('markReadBtn');
    if (markReadBtn) {
        markReadBtn.addEventListener('click', function () {
            const badge = document.getElementById('notifBadge');
            if (badge) badge.style.display = 'none';
        });
    }

    // Dynamic Elements Reference
    const btnToggleEdit = document.getElementById('btnToggleEdit');
    const btnLogout = document.getElementById('btnLogout');

    const editName = document.getElementById('editName');
    const editEmail = document.getElementById('editEmail');
    const editRollNo = document.getElementById('editRollNo');
    const editRole = document.getElementById('editRole');
    const editProgram = document.getElementById('editProgram');
    const editBatch = document.getElementById('editBatch');

    const topbarUserName = document.getElementById('topbarUserName');
    const topbarUserRole = document.getElementById('topbarUserRole');
    const topbarAvatarBadge = document.getElementById('topbarAvatarBadge');

    const profileViewName = document.getElementById('profileViewName');
    const profileViewSubtitle = document.getElementById('profileViewSubtitle');
    const popAvatarBadge = document.getElementById('popAvatarBadge');

    // Initials Generator Function
    function getInitials(name) {
        if (!name) return 'U';
        const parts = name.trim().split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return parts[0].slice(0, 2).toUpperCase();
    }

    // Sync UI Function
    function updateProfileUI(profileData) {
        const initials = getInitials(profileData.name);

        if (editName) editName.value = profileData.name;
        if (editEmail) editEmail.value = profileData.email;
        if (editRollNo) editRollNo.value = profileData.rollNo;
        if (editRole) editRole.value = profileData.role;
        if (editProgram) editProgram.value = profileData.program;
        if (editBatch) editBatch.value = profileData.batch;

        if (topbarUserName) topbarUserName.innerText = profileData.name;
        if (topbarUserRole) topbarUserRole.innerText = profileData.role;
        if (topbarAvatarBadge) topbarAvatarBadge.innerText = initials;

        if (profileViewName) profileViewName.innerText = profileData.name;
        if (profileViewSubtitle) profileViewSubtitle.innerText = `${profileData.role} | ${profileData.rollNo}`;
        if (popAvatarBadge) popAvatarBadge.innerText = initials;
    }

    // Load Saved Data
    const savedData = JSON.parse(localStorage.getItem('userProfile')) || {
        name: 'Sehar Babar',
        email: 'sehar@gmail.com',
        rollNo: 'SE-01',
        role: 'Student',
        program: 'BS Software Engineering',
        batch: '2026'
    };

    updateProfileUI(savedData);

    // Edit/Save Profile Functionality
    if (btnToggleEdit) {
        btnToggleEdit.addEventListener('click', function () {
            const inputs = [editName, editEmail, editRollNo, editRole, editProgram, editBatch];
            const isEditing = !editName.hasAttribute('readonly');

            if (!isEditing) {
                inputs.forEach(input => input && input.removeAttribute('readonly'));
                editName.focus();
                btnToggleEdit.innerText = 'Save Profile';
                btnToggleEdit.classList.replace('btn-outline-primary', 'btn-success');
            } else {
                const updatedProfile = {
                    name: editName.value.trim() || 'User',
                    email: editEmail.value.trim(),
                    rollNo: editRollNo.value.trim() || 'N/A',
                    role: editRole.value.trim() || 'Student',
                    program: editProgram ? editProgram.value.trim() : '',
                    batch: editBatch ? editBatch.value.trim() : ''
                };

                inputs.forEach(input => input && input.setAttribute('readonly', 'true'));

                localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
                updateProfileUI(updatedProfile);

                btnToggleEdit.innerText = 'Edit Profile';
                btnToggleEdit.classList.replace('btn-success', 'btn-outline-primary');
            }
        });
    }

    // Logout Functionality
    if (btnLogout) {
        btnLogout.addEventListener('click', function () {
            if (confirm('Are you sure you want to logout?')) {
                sessionStorage.clear();
                window.location.href = 'login.html';
            }
        });
    }
});