
const BASE_URL = 'https://dummyjson.com/posts';

// thẻ htmlel
const blogListContainer = document.getElementById('blog-list-container');
const searchInput = document.getElementById('search-input');
const btnNewest = document.getElementById('sort-newest');
const btnOldest = document.getElementById('sort-oldest');

// thẻ Modalel
const modal = document.getElementById('detail-modal');
const modalLoading = document.getElementById('modal-loading');
const modalContent = document.getElementById('modal-content');
const closeModalBtn = document.getElementById('close-modal-btn');

// thẻ Detail Fields
const mTitle = document.getElementById('modal-title');
const mBody = document.getElementById('modal-body');
const mTags = document.getElementById('modal-tags');
const mViews = document.getElementById('modal-views');
const mLikes = document.getElementById('modal-likes');
const mId = document.getElementById('modal-id');

// trạng thái biến
let fetchTimeout = null; 

// Dữ liệu chung
async function fetchPosts(url) {
    // Hiển thị loading ở danh sách
    blogListContainer.innerHTML = `<div class="text-center py-10"><div class="loader mx-auto"></div><p class="mt-2 text-gray-500">Đang tải...</p></div>`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        renderPosts(data.posts);
    } catch (error) {
        console.error("Lỗi:", error);
        blogListContainer.innerHTML = `<p class="text-center text-red-500">Đã xảy ra lỗi khi tải dữ liệu.</p>`;
    }
}

// hàm danh sách
function renderPosts(posts) {
    if (!posts || posts.length === 0) {
        blogListContainer.innerHTML = `<p class="text-center text-gray-500 text-xl mt-10">Không tìm thấy bài viết nào.</p>`;
        return;
    }

    const html = posts.map(post => {
        // nồi dung cắt ngắn
        const shortBody = post.body.length > 100 ? post.body.substring(0, 100) + '...' : post.body;
        
        return `
            <div class="bg-white p-6 rounded-lg shadow-md border hover:shadow-xl transition relative group cursor-pointer" 
                 onclick="openDetailModal(${post.id})">
                
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-xl font-bold text-gray-800 hover:text-blue-600 transition">${post.title}</h3>
                    
                </div>

                <p class="text-gray-600 mb-4">${shortBody}</p>

                <div class="flex justify-between items-center mt-4 border-t pt-3">
                    <div class="flex gap-2 text-sm text-gray-500">
                        
                    </div>
                    
                   
                    <div class="flex gap-2" onclick="event.stopPropagation()">
                        <button class="text-yellow-500 hover:text-yellow-600 px-2 py-1 border border-yellow-500 rounded text-sm transition hover:bg-yellow-50">
                            <i class="fa-solid fa-pen"></i> Sửa
                        </button>
                        <button class="text-red-500 hover:text-red-600 px-2 py-1 border border-red-500 rounded text-sm transition hover:bg-red-50">
                            <i class="fa-solid fa-trash"></i> Xóa
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    blogListContainer.innerHTML = html;
}

// chức năng tìm kiếm
searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value.trim();

    //  Chờ người dùng dừng gõ 500ms mới gọi API
    clearTimeout(fetchTimeout);
    fetchTimeout = setTimeout(() => {
        if (keyword) {
            // Gọi API Search của DummyJSON
            fetchPosts(`${BASE_URL}/search?q=${keyword}`);
        } else {
            // Nếu rỗng thì load lại danh sách gốc 
            fetchPosts(BASE_URL);
        }
    }, 500);
});

// chức năng sắp xếp


btnNewest.addEventListener('click', () => {
    updateSortUI('newest');
    // gọi API sort
    fetchPosts(`${BASE_URL}?sortBy=id&order=desc`);
});

btnOldest.addEventListener('click', () => {
    updateSortUI('oldest');
    // gọi API sort
    fetchPosts(`${BASE_URL}?sortBy=id&order=asc`);
});

function updateSortUI(type) {
    if (type === 'newest') {
        btnNewest.classList.add('border-blue-600', 'text-blue-600');
        btnNewest.classList.remove('border-gray-400', 'text-gray-600');
        
        btnOldest.classList.add('border-gray-400', 'text-gray-600');
        btnOldest.classList.remove('border-blue-600', 'text-blue-600');
    } else {
        btnOldest.classList.add('border-blue-600', 'text-blue-600');
        btnOldest.classList.remove('border-gray-400', 'text-gray-600');
        
        btnNewest.classList.add('border-gray-400', 'text-gray-600');
        btnNewest.classList.remove('border-blue-600', 'text-blue-600');
    }
}

// chức năng chi tiết

// Hàm mở Modal  từ onclick trong HTML 
window.openDetailModal = async function(id) {
    // hiển thị modal
    modal.classList.remove('hidden');
    
    //  Reset trạng thái: Hiện Loading, Ẩn nội dung cũ
    modalLoading.classList.remove('hidden');
    modalContent.classList.add('hidden');

    try {
        // gọi API lấy chi tiết bài viết
        const response = await fetch(`${BASE_URL}/${id}`);
        const post = await response.json();

        // đổ dữ liệu vào Modal
        mTitle.innerText = post.title;
        mBody.innerText = post.body; // Nội dung đầy đủ
        

        // 5. ẩn Loading, Hiện Nội dung
        modalLoading.classList.add('hidden');
        modalContent.classList.remove('hidden');

    } catch (error) {
        console.error("Lỗi lấy chi tiết:", error);
        alert("Không thể tải chi tiết bài viết!");
        modal.classList.add('hidden');
    }
}

// Đóng Modal
closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// Đóng khi click ra ngoài vùng modal
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});

// khởi chạy lần đầu
// Mặc định load danh sách mới nhất
fetchPosts(`${BASE_URL}?sortBy=id&order=desc`);