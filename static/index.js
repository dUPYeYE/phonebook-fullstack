async function deletePartner(id) {
  try {
    const result = await fetch(`/api/partners/${id}`, { method: 'DELETE' });
    if (result.status === 200) {
      document.getElementById(`${id}`).remove();
      await loadPartnersTable();
    } else {
      alert('Could not delete.');
    }
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

async function loadPartnersTable() {
  try {
    let result;
    const filter = document.getElementById('filter').value;
    if (filter.length === 0) {
      result = await fetch('/api/partners', { method: 'GET' });
    } else {
      result = await fetch(`/api/partners?filter=${filter}`, { method: 'GET' });
    }

    if (result.status === 200) {
      const data = await result.json();

      const table = document.getElementById('partnersTableBody');
      const rows = table.getElementsByTagName('tr');
      const rowCount = rows.length;

      for (let i = rowCount - 1; i >= 0; i -= 1) {
        table.deleteRow(i);
      }

      let currentRow = 0;
      data.forEach((item) => {
        const row = table.insertRow(currentRow);
        currentRow += 1;
        
        // partner data
        const fnameCell = row.insertCell(0);
        const fname = document.createElement('a');
        fname.innerText = item.first_name;
        fname.setAttribute('href', `/partners?id=${item.partner_id}`); 
        fnameCell.appendChild(fname);
        const lname = row.insertCell(1);
        lname.innerText = item.last_name;
        const phonenum = row.insertCell(2);
        phonenum.innerText = item.phone_number;

        // action buttons 
        const buttonsCell = row.insertCell(3);
        buttonsCell.style.textAlign = 'center';
        buttonsCell.style.maxWidth = '30px';
        const editButton = document.createElement('button');
          editButton.innerHTML = 'Edit';
          editButton.id = item.partner_id;
          editButton.setAttribute('onclick', `redir(\'/partners/edit/${item.partner_id}\')`);
          editButton.style.marginRight = '35px';
        const deleteButton = document.createElement('button');
          deleteButton.innerHTML = 'Delete';
          deleteButton.id = item.partner_id;
          deleteButton.setAttribute('onclick', `deletePartner(${item.partner_id})`);
        buttonsCell.appendChild(editButton);
        buttonsCell.appendChild(deleteButton);
      });
    }
  } catch (err) {
    console.log(err);
  }
}

async function loadDetailsTable() {
  console.log('hii');
  try {
    const partnerId = document.getElementById('detailsTable').getAttribute('data-partner-id');
    const result = await fetch(`/api/partners/${partnerId}`, { method: 'GET' });

    if (result.status === 200) {
      const data = await result.json();

      const table = document.getElementById('detailsTableBody');
      const rows = table.getElementsByTagName('tr');
      const rowCount = rows.length;

      for (let i = rowCount - 1; i >= 0; i -= 1) {
        table.deleteRow(i);
      }

      let currentRow = 0;
      data.forEach((item) => {
        const row = table.insertRow(currentRow);
        currentRow += 1;
        
        // partner data
        const id = row.insertCell(0);
        id.innerText = item.partner_id;
        const fname = row.insertCell(1);
        fname.innerText = item.first_name;
        const lname = row.insertCell(2);
        lname.innerText = item.last_name;
        const phonenum = row.insertCell(3);
        phonenum.innerText = item.phone_number;
      });
    }
  } catch (err) {
    console.log(err);
  }
}

function redir(url) {
  window.location.href = url;
}

async function postPartner(event) {
  event.preventDefault(); // Prevent default form submission

  const form = document.getElementById('newPartnerForm');
  const formData = new FormData(form);
  
  try {
    const response = await fetch('/api/partners', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      redir('/partners');
    } else {
      alert('Patch request failed');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

async function patchPartner(event) {
  event.preventDefault(); // Prevent default form submission

  const form = document.getElementById('editPartnerForm');
  const partnerId = form.getAttribute('data-partner-id');

  const formData = new FormData(form);
  
  try {
    const response = await fetch(`/api/partners/${partnerId}`, {
      method: 'PATCH',
      body: formData,
    });

    if (response.ok) {
      redir('/partners');
    } else {
      alert('Patch request failed');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

