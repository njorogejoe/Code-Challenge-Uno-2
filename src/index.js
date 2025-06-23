document.addEventListener('DOMContentLoaded', () => {
    const guestForm = document.getElementById('guest-form');
    const guestNameInput = document.getElementById('guest-name');
    const guestList = document.getElementById('guest-list');
    let guests = [];

    guestForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission

        const guestName = guestNameInput.value.trim();
        if (guestName === '') return;

        if (guests.length >= 10) {
            alert('Guest list is full! You can only add up to 10 guests.');
            return;
        }

        const guest = {
            name: guestName,
            attending: false,
            timeAdded: new Date().toLocaleString()
        };

        guests.push(guest);
        updateGuestList();
        guestNameInput.value = ''; // Clear input field
    });

    function updateGuestList() {
        guestList.innerHTML = ''; // Clear the list before updating
        guests.forEach((guest, index) => {
            const li = document.createElement('li');
            li.textContent = `${guest.name} - ${guest.attending ? 'Attending' : 'Not Attending'} (Added: ${guest.timeAdded})`;
            
            const toggleButton = document.createElement('button');
            toggleButton.textContent = guest.attending ? 'Mark as Not Attending' : 'Mark as Attending';
            toggleButton.addEventListener('click', () => {
                guest.attending = !guest.attending;
                updateGuestList();
            });

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                guests.splice(index, 1);
                updateGuestList();
            });

            li.appendChild(toggleButton);
            li.appendChild(removeButton);
            guestList.appendChild(li);
        });
    }
});
