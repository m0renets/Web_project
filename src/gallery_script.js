const albumsFilePath = './albums.json';

async function loadAlbums() {
    console.log("Loading albums.json from:", albumsFilePath);
    const response = await fetch(albumsFilePath);
    if (!response.ok) throw new Error("Failed to load albums.json");
    const data = await response.json();
    return data.albums;
}

function getUniqueTags(albums) {
    const tags = new Set();
    albums.forEach(album => {
        album.photos.forEach(photo => {
            photo.tags.forEach(tag => tags.add(tag));
        });
    });
    return Array.from(tags);
}

function populateFilterOptions(tags) {
    const filterSelect = document.getElementById('filter');
    filterSelect.innerHTML = '<option value="">Всі</option>';
    tags.forEach(tag => {
        const option = document.createElement('option');
        option.value = tag;
        option.textContent = tag;
        filterSelect.appendChild(option);
    });
}

function renderGallery(albums, filterTag = '') {
    const galleryContainer = document.getElementById('gallery');
    galleryContainer.innerHTML = '';

    if (!Array.isArray(albums)) {
        console.error("Albums is not an array:", albums);
        return;
    }

    let hasPhotos = false;

    albums.forEach(album => {
        album.photos.forEach(photo => {
            if (filterTag && !photo.tags.includes(filterTag)) return;

            hasPhotos = true;

            const img = document.createElement('img');
            img.src = `public/gallery/${photo.url}`;
            img.alt = photo.tags.join(', ');
            img.title = photo.tags.join(', ');

            const photoContainer = document.createElement('div');
            photoContainer.appendChild(img);
            galleryContainer.appendChild(photoContainer);
        });
    });

    if (!hasPhotos) {
        galleryContainer.innerHTML = '<p>No photos found for the selected filter.</p>';
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Page loaded. Initializing gallery...");
    try {
        const albums = await loadAlbums();
        console.log("Loaded albums:", albums);

        const uniqueTags = getUniqueTags(albums);
        console.log("Unique tags:", uniqueTags);
        populateFilterOptions(uniqueTags);

        renderGallery(albums);
    } catch (error) {
        console.error("Error initializing gallery:", error);
    }
});

// Автоматичне застосування фільтра при зміні значення у випадаючому списку
document.getElementById('filter').addEventListener('change', async () => {
    const filterTag = document.getElementById('filter').value.trim();
    console.log("Filter applied:", filterTag);
    try {
        const albums = await loadAlbums();
        renderGallery(albums, filterTag);
    } catch (error) {
        console.error("Error applying filter:", error);
    }
});
